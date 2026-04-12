/**
 * bot.ts — One-time webhook setup script.
 *
 * Run this ONCE after deploying to Vercel:
 *   npx tsx bot.ts
 *
 * It registers your Vercel URL as the Telegram webhook.
 * After that, Telegram will POST all updates to /api/telegram.
 */

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const VERCEL_URL = process.env.VERCEL_URL || process.env.WEBHOOK_URL;

if (!TOKEN) {
  console.error("❌ TELEGRAM_BOT_TOKEN is not set.");
  process.exit(1);
}

if (!VERCEL_URL) {
  console.error("❌ Set VERCEL_URL or WEBHOOK_URL to your deployed domain (e.g., https://your-app.vercel.app)");
  process.exit(1);
}

// Ensure the URL has a protocol
const baseUrl = VERCEL_URL.startsWith("http") ? VERCEL_URL : `https://${VERCEL_URL}`;
const webhookUrl = `${baseUrl}/api/telegram`;

async function setupWebhook() {
  console.log(`\n🔗 Setting webhook to: ${webhookUrl}\n`);

  const res = await fetch(
    `https://api.telegram.org/bot${TOKEN}/setWebhook?url=${encodeURIComponent(webhookUrl)}`
  );
  const data = await res.json();

  if (data.ok) {
    console.log("✅ Webhook set successfully!");
    console.log(`   Telegram will now POST updates to: ${webhookUrl}`);
  } else {
    console.error("❌ Failed to set webhook:", data.description);
  }

  // Also display current webhook info
  const infoRes = await fetch(`https://api.telegram.org/bot${TOKEN}/getWebhookInfo`);
  const info = await infoRes.json();
  console.log("\n📋 Current webhook info:");
  console.log(`   URL: ${info.result?.url || "(none)"}`);
  console.log(`   Pending updates: ${info.result?.pending_update_count || 0}`);
  if (info.result?.last_error_message) {
    console.log(`   Last error: ${info.result.last_error_message}`);
  }
}

setupWebhook();
