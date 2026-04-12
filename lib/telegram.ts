import TelegramBot from "node-telegram-bot-api";
import { connectDB } from "./db";
import Lead from "../models/Lead";
import { generateAIResponse, type HistoryMessage } from "./ai";

// ─── Bot instance ─────────────────────────────────────────────────────────────

const token = process.env.TELEGRAM_BOT_TOKEN;

export const bot = token ? new TelegramBot(token, { polling: true }) : null;

// ─── Message handler ──────────────────────────────────────────────────────────

if (bot) {
  console.log("✅ Telegram bot initialized in polling mode.");

  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text?.trim();
    const username = msg.from?.username || "unknown";
    const firstName = msg.from?.first_name || username;

    if (!text) return;

    try {
      await connectDB();

      // ── 1. Fetch or create lead ────────────────────────────────────────────
      let lead = await Lead.findOne({ telegramId: String(chatId) });

      if (!lead) {
        console.log(`[Telegram] New user: ${username} (${chatId})`);
        lead = new Lead({
          name: firstName,
          phone: "Pending via Telegram",
          source: "Telegram Bot",
          status: "New",
          telegramId: String(chatId),
          telegramUsername: username,
          telegramHistory: [],
        });
      }

      const isFirstMessage = lead.telegramHistory.length === 0;

      // ── 2. Persist user message ────────────────────────────────────────────
      const userEntry: HistoryMessage = {
        role: "user",
        content: text,
        timestamp: new Date(),
      };
      lead.telegramHistory.push(userEntry);
      await lead.save();

      // ── 3. Welcome message on first contact / /start ───────────────────────
      if (text === "/start" || isFirstMessage) {
        const welcomeMessage =
          `Hey ${firstName} 👋 Thanks for reaching out to ClickRM!\n\n` +
          `I'm your sales assistant. Tell me what you're looking for — ` +
          `I'd love to help you discover how ClickRM can grow your business. 🚀`;

        await bot.sendMessage(chatId, welcomeMessage);

        lead.telegramHistory.push({
          role: "assistant",
          content: welcomeMessage,
          timestamp: new Date(),
        });
        await lead.save();
        return;
      }

      // ── 4. Build context & call Grok AI ───────────────────────────────────
      // Pass the history *before* the current message for context (exclude the
      // just-pushed user entry so it doesn't appear twice inside generateAIResponse)
      const historyForContext: HistoryMessage[] = lead.telegramHistory
        .slice(0, -1) // everything except the just-added user message
        .map((h: { role: string; content: string; timestamp: Date }) => ({
          role: h.role as "user" | "bot" | "assistant",
          content: h.content,
          timestamp: h.timestamp,
        }));

      const aiReply = await generateAIResponse(text, historyForContext);

      // ── 5. Send reply ──────────────────────────────────────────────────────
      await bot.sendMessage(chatId, aiReply);

      // ── 6. Persist assistant reply ─────────────────────────────────────────
      const assistantEntry: HistoryMessage = {
        role: "assistant",
        content: aiReply,
        timestamp: new Date(),
      };
      lead.telegramHistory.push(assistantEntry);
      await lead.save();

      console.log(`[Telegram] ${username}: "${text}" → AI replied ✅`);
    } catch (error) {
      console.error("[Telegram] Error handling message:", error);
      try {
        await bot.sendMessage(
          chatId,
          "Sorry, I encountered an error processing your message. Please try again."
        );
      } catch {
        // Silently ignore if we can't even send the error message
      }
    }
  });

  bot.on("polling_error", (error) => {
    console.error("[Telegram] Polling error:", error);
  });
} else {
  console.warn("⚠️  TELEGRAM_BOT_TOKEN is not set. Bot is not initialized.");
}
