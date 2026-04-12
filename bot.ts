/**
 * bot.ts — Entry point for the Telegram bot process.
 *
 * Run with:  npm run bot:dev
 *
 * All message handling logic lives in lib/telegram.ts.
 * All AI logic lives in lib/ai.ts.
 */

import "./lib/telegram"; // registers the bot and all event handlers

// Keep the process alive (polling mode handles the event loop naturally,
// but this guards against accidental early exits in edge cases)
process.on("uncaughtException", (err) => {
  console.error("[bot] Uncaught exception:", err);
});

process.on("unhandledRejection", (reason) => {
  console.error("[bot] Unhandled rejection:", reason);
});
