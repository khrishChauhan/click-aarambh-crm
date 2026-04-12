import OpenAI from "openai";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface HistoryMessage {
  role: "user" | "bot" | "assistant";
  content: string;
  timestamp: Date;
}

// ─── Grok client (OpenAI-compatible) ─────────────────────────────────────────

const getClient = (): OpenAI => {
  const apiKey = process.env.GROK_API_KEY;
  if (!apiKey) {
    throw new Error("GROK_API_KEY environment variable is not set.");
  }
  return new OpenAI({
    apiKey,
    baseURL: "https://api.groq.com/openai/v1",
    timeout: 15_000, // 15-second request timeout
  });
};

// ─── System prompt ────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are a smart sales assistant for ClickRM, a CRM system. Your goal is to:
- Understand user needs
- Ask relevant questions
- Guide the user toward booking a demo
- Be helpful, polite, and concise
- Avoid long or robotic responses

Keep replies short (2–4 sentences). Always end with a question or a call-to-action when appropriate.`;

// ─── Main function ────────────────────────────────────────────────────────────

/**
 * Generate a conversational AI response using the Grok API.
 *
 * @param message       - Current user message
 * @param history       - Previous telegramHistory entries (last 10 used for context)
 * @returns             - AI-generated reply string
 */
export async function generateAIResponse(
  message: string,
  history: HistoryMessage[] = []
): Promise<string> {
  try {
    const client = getClient();

    // Build context from the last 10 history messages (excluding the current one)
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

    const reply = completion.choices[0]?.message?.content?.trim();

    if (!reply) {
      throw new Error("Empty response from Grok API.");
    }

    return reply;
  } catch (error) {
    console.error("[AI] Grok API error:", error);
    return "I'm having trouble responding right now. Please try again in a moment.";
  }
}
