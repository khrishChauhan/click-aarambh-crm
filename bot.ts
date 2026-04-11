import TelegramBot from "node-telegram-bot-api";
import { connectDB } from "./lib/db";
import Lead from "./models/Lead";
import { generateAIResponse } from "./lib/ai";

const token = process.env.TELEGRAM_BOT_TOKEN;

// Create a reusable bot instance
export const bot = token ? new TelegramBot(token, { polling: true }) : null;

if (bot) {
  console.log("Telegram bot initialized in polling mode.");

  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    const username = msg.from?.username || "unknown";

    if (!text) return;

    try {
      await connectDB();

      // Find if lead exists via telegramId
      let lead = await Lead.findOne({ telegramId: String(chatId) });

      if (!lead) {
        // If not found, create a new Lead representing the Telegram user
        console.log(`New Telegram user joined: ${username}`);
        lead = new Lead({
          name: msg.from?.first_name || username,
          phone: "Pending via Telegram", // Phone is required by Schema
          source: "Telegram Bot",
          status: "New",
          telegramId: String(chatId),
          telegramUsername: username,
          telegramHistory: []
        });
      }

      const isFirstMessage = lead.telegramHistory.length === 0;

      // Save user message
      lead.telegramHistory.push({
        role: "user",
        content: text,
        timestamp: new Date()
      });
      await lead.save();

      // Handle first message logic
      if (text === "/start" || isFirstMessage) {
        const welcomeMessage = "Hey 👋 Thanks for reaching out! I saw your inquiry, how can I help you?";
        await bot.sendMessage(chatId, welcomeMessage);
        
        lead.telegramHistory.push({
          role: "bot",
          content: welcomeMessage,
          timestamp: new Date()
        });
        await lead.save();
        return;
      }

      // Generate AI response
      const aiResponse = await generateAIResponse(text);

      await bot.sendMessage(chatId, aiResponse);

      // Save bot response
      lead.telegramHistory.push({
        role: "bot",
        content: aiResponse,
        timestamp: new Date()
      });
      await lead.save();

    } catch (error) {
      console.error("Error handling Telegram message:", error);
      bot.sendMessage(chatId, "Sorry, I encountered an error processing your message.");
    }
  });

  bot.on('polling_error', (error) => {
    console.error("Telegram polling error:", error);
  });
} else {
  console.warn("TELEGRAM_BOT_TOKEN is not set. Bot is not initialized.");
}
