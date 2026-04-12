/**
 * bot.ts — Entry point for the Telegram bot process.
 *
 * All message handling logic lives in lib/telegram.ts.
 * All AI logic lives in lib/ai.ts.
 */

// ─── Environment Validation ──────────────────────────────────────────────────
const requiredEnvVars = [
  "TELEGRAM_BOT_TOKEN",
  "MONGODB_URI",
  "GROK_API_KEY"
];

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error("❌ CRITICAL ERROR: Missing environment variables:");
  missingVars.forEach(v => console.error(`   - ${v}`));
  console.error("\nEnsure these are set in your platform dashboard (e.g., Render) or environment.");
  process.exit(1);
}

// ─── Initialize Bot ──────────────────────────────────────────────────────────
import "./lib/telegram"; // registers the bot and all event handlers

// Keep the process alive 
process.on("uncaughtException", (err) => {
  console.error("[bot] Uncaught exception:", err);
});

process.on("unhandledRejection", (reason) => {
  console.error("[bot] Unhandled rejection:", reason);
});
