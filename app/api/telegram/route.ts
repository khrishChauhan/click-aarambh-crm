import { NextResponse } from "next/server";
import { handleTelegramUpdate, type TelegramUpdate } from "@/lib/telegram";

/**
 * POST /api/telegram
 *
 * Webhook endpoint for Telegram Bot API.
 * Telegram sends a JSON update object to this route whenever the bot receives a message.
 *
 * Setup:
 *   https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/setWebhook?url=https://your-domain.vercel.app/api/telegram
 */
export async function POST(req: Request) {
  try {
    const update: TelegramUpdate = await req.json();

    console.log("[Webhook] Received update:", JSON.stringify(update));

    // Validate that this is a real Telegram update
    if (!update || !update.update_id) {
      console.warn("[Webhook] Invalid update — missing update_id");
      return NextResponse.json({ error: "Invalid update" }, { status: 400 });
    }

    // Process the update
    await handleTelegramUpdate(update);

    console.log("[Webhook] Update processed successfully ✅");
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[Webhook] Error processing Telegram update:", error);
    // Always return 200 to Telegram to prevent retries on application errors
    return NextResponse.json({ ok: true });
  }
}

/**
 * GET /api/telegram
 *
 * Health check — useful for verifying the endpoint is live.
 */
export async function GET() {
  return NextResponse.json({
    status: "active",
    message: "Telegram webhook endpoint is live.",
    tokenSet: !!process.env.TELEGRAM_BOT_TOKEN,
    dbSet: !!process.env.MONGODB_URI,
    aiSet: !!process.env.GROK_API_KEY,
  });
}
