import OpenAI from "openai";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface HistoryMessage {
  role: "user" | "bot" | "assistant";
  content: string;
  timestamp: Date;
}

// ─── Groq client (OpenAI-compatible) ─────────────────────────────────────────

const getClient = (): OpenAI => {
  const apiKey = process.env.GROK_API_KEY; // Using the provided key labeled as GROK
  if (!apiKey) {
    throw new Error("GROK_API_KEY environment variable is not set.");
  }
  return new OpenAI({
    apiKey,
    baseURL: "https://api.groq.com/openai/v1",
    timeout: 15_000,
  });
};

// ─── System prompt ────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are a smart sales assistant for ClickRM, a CRM system. Your goal is to:
- Understand user needs and ask relevant follow-up questions.
- Naturally guide the user toward booking a call or demo.
- Suggest booking when intent is detected (e.g., interest in services, demo, or pricing).
- Be helpful, polite, and concise.
- When a user shows interest, encourage them to schedule a meeting.

Keep replies short (2–3 sentences). Always remain human-like and proactive.`;

// ─── Main functions ──────────────────────────────────────────────────────────

/**
 * Generate a conversational AI response.
 */
export async function generateAIResponse(
  message: string,
  history: HistoryMessage[] = []
): Promise<string> {
  try {
    const client = getClient();
    const recentHistory = history.slice(-10);

    const contextMessages: OpenAI.Chat.ChatCompletionMessageParam[] =
      recentHistory.map((entry) => ({
        role: entry.role === "bot" || entry.role === "assistant" ? "assistant" : "user",
        content: entry.content,
      }));

    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...contextMessages,
      { role: "user", content: message },
    ];

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages,
      max_tokens: 300,
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content?.trim() || "I'm here to help!";
  } catch (error) {
    console.error("[AI] Error:", error);
    return "I'm having trouble responding right now. Please try again.";
  }
}

/**
 * Detect if the user has a booking intent.
 */
export async function checkBookingIntent(message: string): Promise<boolean> {
  try {
    const client = getClient();
    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { 
          role: "system", 
          content: "You are an intent classifier. Respond with 'YES' if the user wants to book a call, meeting, demo, talk, or schedule something. Otherwise, respond with 'NO'. No other text." 
        },
        { role: "user", content: message },
      ],
      max_tokens: 5,
      temperature: 0,
    });

    const result = completion.choices[0]?.message?.content?.trim().toUpperCase();
    return result === "YES";
  } catch {
    return false;
  }
}

/**
 * Generate a summary of the conversation for the CRM.
 */
export async function generateChatSummary(history: HistoryMessage[]): Promise<string> {
  try {
    const client = getClient();
    const transcript = history.map(h => `${h.role}: ${h.content}`).join("\n");

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { 
          role: "system", 
          content: "Summarize the conversation focusing on: User requirement, Problem they are solving, and Interest level. Keep it under 100 words." 
        },
        { role: "user", content: transcript },
      ],
      max_tokens: 200,
    });

    return completion.choices[0]?.message?.content?.trim() || "No summary available.";
  } catch {
    return "Summary generation failed.";
  }
}

/**
 * Clean/Normalize a date string from the user.
 */
export async function normalizeDate(dateStr: string): Promise<Date | null> {
  try {
    const client = getClient();
    const now = new Date().toISOString();
    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { 
          role: "system", 
          content: `Convert the user's date input into an ISO date string. Current time is ${now}. If the input is not a date, return 'INVALID'. No other text.` 
        },
        { role: "user", content: dateStr },
      ],
      max_tokens: 30,
    });

    const result = completion.choices[0]?.message?.content?.trim();
    if (result === "INVALID") return null;
    const date = new Date(result || "");
    return isNaN(date.getTime()) ? null : date;
  } catch {
    return null;
  }
}
