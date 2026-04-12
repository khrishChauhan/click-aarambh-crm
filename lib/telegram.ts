import { connectDB } from "./db";
import Lead from "../models/Lead";
import {
  generateAIResponse,
  checkBookingIntent,
  generateChatSummary,
  normalizeDate,
  type HistoryMessage,
} from "./ai";

// ─── Telegram API helper ─────────────────────────────────────────────────────

/**
 * Send a text message to a Telegram chat via the HTTP API.
 * Token is read at call time to ensure env vars are available in serverless.
 */
async function sendTelegramMessage(chatId: number | string, text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    console.error("[Telegram] TELEGRAM_BOT_TOKEN is not set — cannot send message.");
    return;
  }

  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  
  console.log(`[Telegram] Sending message to chat ${chatId}...`);

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });

  const responseBody = await res.json();
  
  if (!res.ok) {
    console.error("[Telegram] sendMessage failed:", res.status, JSON.stringify(responseBody));
  } else {
    console.log("[Telegram] Message sent successfully ✅");
  }
}

// ─── Telegram Update types (minimal) ─────────────────────────────────────────

interface TelegramUser {
  id: number;
  first_name?: string;
  username?: string;
}

interface TelegramMessage {
  message_id: number;
  from?: TelegramUser;
  chat: { id: number };
  text?: string;
}

export interface TelegramUpdate {
  update_id: number;
  message?: TelegramMessage;
}

// ─── Main handler (called by the webhook API route) ──────────────────────────

/**
 * Process a single Telegram update object.
 * This is a pure function — no polling, no long-running process.
 */
export async function handleTelegramUpdate(update: TelegramUpdate) {
  const message = update.message;
  if (!message || !message.text) return;

  const chatId = message.chat.id;
  const text = message.text.trim();
  const username = message.from?.username || "unknown";
  const firstName = message.from?.first_name || username;

  if (!text) return;

  try {
    await connectDB();

    // ── 1. Fetch or create lead ──────────────────────────────────────────────
    let lead = await Lead.findOne({ telegramId: String(chatId) });

    if (!lead) {
      lead = new Lead({
        name: firstName,
        phone: "Pending via Telegram",
        source: "Telegram Bot",
        status: "New",
        telegramId: String(chatId),
        telegramUsername: username,
        telegramHistory: [],
        bookingStatus: "idle",
      });
    }

    // Ensure bookingStatus is initialized for older records
    if (!lead.bookingStatus) lead.bookingStatus = "idle";

    // ── 2. Persist user message ──────────────────────────────────────────────
    const userEntry: HistoryMessage = {
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    lead.telegramHistory.push(userEntry);

    // ── 3. Handle first message / /start ─────────────────────────────────────
    const isFirstMessage = lead.telegramHistory.length === 1;
    if (text === "/start" || isFirstMessage) {
      const welcomeMessage = `Hey ${firstName} 👋 Welcome to ClickRM! I'm your sales assistant. How can I help you grow your business today?`;
      await sendTelegramMessage(chatId, welcomeMessage);
      lead.telegramHistory.push({ role: "assistant", content: welcomeMessage, timestamp: new Date() });
      lead.bookingStatus = "idle";
      await lead.save();
      return;
    }

    // ── 4. Booking Flow State Machine ────────────────────────────────────────

    // STATE: AWAITING DATE
    if (lead.bookingStatus === "awaiting_date") {
      const dateObj = await normalizeDate(text);
      if (!dateObj) {
        const retryMsg = "I couldn't quite catch that date. Could you tell me what day works for you? (e.g., 'This Friday' or 'Nov 20th')";
        await sendTelegramMessage(chatId, retryMsg);
        lead.telegramHistory.push({ role: "assistant", content: retryMsg, timestamp: new Date() });
        await lead.save();
        return;
      }

      lead.meetingDate = dateObj;
      lead.bookingStatus = "awaiting_time";
      const timeMsg = `Got it, ${dateObj.toLocaleDateString()}! What time would you prefer?`;
      await sendTelegramMessage(chatId, timeMsg);
      lead.telegramHistory.push({ role: "assistant", content: timeMsg, timestamp: new Date() });
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
      const summary = await generateChatSummary(lead.telegramHistory);
      lead.chatSummary = summary;

      const confirmMsg = `Great! Your meeting is scheduled for ${lead.meetingDate?.toLocaleDateString()} at ${lead.meetingTime}. Our team will reach out to you shortly. 🚀`;
      await sendTelegramMessage(chatId, confirmMsg);
      lead.telegramHistory.push({ role: "assistant", content: confirmMsg, timestamp: new Date() });
      await lead.save();
      console.log(`[Booking] Confirmed for ${username}: ${lead.meetingDate} @ ${lead.meetingTime}`);
      return;
    }

    // STATE: IDLE (Check for Intent)
    if (lead.bookingStatus === "idle") {
      const hasIntent = await checkBookingIntent(text);

      if (hasIntent) {
        lead.bookingStatus = "awaiting_date";
        const bookingStartMsg = "I'd be happy to set that up! What date works best for you?";
        await sendTelegramMessage(chatId, bookingStartMsg);
        lead.telegramHistory.push({ role: "assistant", content: bookingStartMsg, timestamp: new Date() });
        await lead.save();
        return;
      }

      // Standard AI Response
      const historyForContext: HistoryMessage[] = lead.telegramHistory
        .slice(0, -1)
        .map((h: any) => ({ role: h.role, content: h.content, timestamp: h.timestamp }));

      const aiReply = await generateAIResponse(text, historyForContext);
      await sendTelegramMessage(chatId, aiReply);
      lead.telegramHistory.push({ role: "assistant", content: aiReply, timestamp: new Date() });
      await lead.save();
    }
  } catch (error) {
    console.error("[Telegram] Error processing update:", error);
    await sendTelegramMessage(chatId, "Sorry, I had a bit of a glitch. Could you try that again?").catch(() => {});
  }
}
