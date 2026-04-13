import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Lead from '@/models/Lead';
import { generateAIResponse, checkBookingIntent, generateChatSummary, normalizeDate, HistoryMessage } from '@/lib/ai';

const VERIFY_TOKEN = 'clickrm123';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Check if it's a WhatsApp status update or message
    if (body.object === 'whatsapp_business_account') {
      for (const entry of body.entry) {
        for (const change of entry.changes) {
          if (change.value && change.value.messages && change.value.messages[0]) {
            const message = change.value.messages[0];
            const senderPhone = message.from;
            const text = message.text?.body;

            if (text && senderPhone) {
              await processWhatsAppMessage(senderPhone, text);
            }
          }
        }
      }
    }
    
    return new NextResponse('OK', { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    // Always return 200 to acknowledge Meta webhook
    return new NextResponse('OK', { status: 200 });
  }
}

async function sendWhatsAppMessage(to: string, body: string) {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.PHONE_NUMBER_ID;

  if (!token || !phoneNumberId) {
    console.error('Missing WhatsApp env variables');
    return;
  }

  const url = `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to: to,
      text: { body: body },
    }),
  });

  if (!response.ok) {
    const data = await response.json();
    console.error('Failed to send WhatsApp message:', data);
  }
}

async function processWhatsAppMessage(senderPhone: string, text: string) {
  try {
    await connectDB();
    
    // Fallback find by phone or create new
    let lead = await Lead.findOne({ whatsappId: senderPhone });
    
    if (!lead) {
      lead = new Lead({
        name: "WhatsApp Lead", // The name submitted in form could be merged if we matched by form phone
        phone: senderPhone,
        source: "WhatsApp Bot",
        status: "New",
        whatsappId: senderPhone,
        whatsappHistory: [],
        bookingStatus: "idle",
      });
    }

    if (!lead.bookingStatus) lead.bookingStatus = "idle";

    const userEntry: HistoryMessage = {
      role: 'user',
      content: text,
      timestamp: new Date()
    };
    
    lead.whatsappHistory.push(userEntry);

    const isFirstMessage = lead.whatsappHistory.length === 1;
    if (isFirstMessage) {
      const welcomeMessage = `Hey there 👋 Welcome to ClickRM! I'm your sales assistant. How can I help you grow your business today?`;
      await sendWhatsAppMessage(senderPhone, welcomeMessage);
      lead.whatsappHistory.push({ role: 'assistant', content: welcomeMessage, timestamp: new Date() });
      await lead.save();
      return;
    }

    // STATE: AWAITING DATE
    if (lead.bookingStatus === "awaiting_date") {
      const dateObj = await normalizeDate(text);
      if (!dateObj) {
        const retryMsg = "I couldn't quite catch that date. Could you tell me what day works for you? (e.g., 'This Friday' or 'Nov 20th')";
        await sendWhatsAppMessage(senderPhone, retryMsg);
        lead.whatsappHistory.push({ role: "assistant", content: retryMsg, timestamp: new Date() });
        await lead.save();
        return;
      }

      lead.meetingDate = dateObj;
      lead.bookingStatus = "awaiting_time";
      const timeMsg = `Got it, ${dateObj.toLocaleDateString()}! What time would you prefer?`;
      await sendWhatsAppMessage(senderPhone, timeMsg);
      lead.whatsappHistory.push({ role: "assistant", content: timeMsg, timestamp: new Date() });
      await lead.save();
      return;
    }

    // STATE: AWAITING TIME
    if (lead.bookingStatus === "awaiting_time") {
      lead.meetingTime = text;
      lead.meetingScheduled = true;
      lead.bookingStatus = "idle";
      lead.status = "Meeting Booked";

      // Generate automatic summary for CRM
      const summary = await generateChatSummary(lead.whatsappHistory);
      lead.chatSummary = summary;

      const confirmMsg = `Great! Your meeting is scheduled for ${lead.meetingDate?.toLocaleDateString()} at ${lead.meetingTime}. Our team will reach out to you shortly. 🚀`;
      await sendWhatsAppMessage(senderPhone, confirmMsg);
      lead.whatsappHistory.push({ role: "assistant", content: confirmMsg, timestamp: new Date() });
      await lead.save();
      return;
    }

    // STATE: IDLE
    if (lead.bookingStatus === "idle") {
      const hasIntent = await checkBookingIntent(text);

      if (hasIntent) {
        lead.bookingStatus = "awaiting_date";
        const bookingStartMsg = "I'd be happy to set that up! What date works best for you?";
        await sendWhatsAppMessage(senderPhone, bookingStartMsg);
        lead.whatsappHistory.push({ role: "assistant", content: bookingStartMsg, timestamp: new Date() });
        await lead.save();
        return;
      }

      // Standard AI Response
      const historyForContext: HistoryMessage[] = lead.whatsappHistory
        .slice(0, -1)
        .map((h: any) => ({ role: h.role, content: h.content, timestamp: h.timestamp }));

      const aiReply = await generateAIResponse(text, historyForContext);
      await sendWhatsAppMessage(senderPhone, aiReply);
      lead.whatsappHistory.push({ role: "assistant", content: aiReply, timestamp: new Date() });
      await lead.save();
    }
  } catch (error) {
    console.error('Error processing WhatsApp message:', error);
  }
}
