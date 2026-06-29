import { connectDB } from "@/lib/db";
import Lead from "@/models/Lead";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("[API /leads] GET — attempting DB connection...");
    console.log("[API /leads] MONGODB_URI in use:", process.env.MONGODB_URI?.replace(/:([^:@]+)@/, ":***@")); // mask password

    await connectDB();
    console.log("[API /leads] DB connected. Fetching leads...");

    const leads = await Lead.find({}).sort({ createdAt: -1 });
    console.log(`[API /leads] Fetched ${leads.length} leads.`);

    return NextResponse.json(leads);
  } catch (error: any) {
    console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.error("[API /leads] ❌ GET FAILED");
    console.error("  Error name   :", error.name);
    console.error("  Error message:", error.message);
    console.error("  Error code   :", error.code);
    if (error.reason) console.error("  Error reason :", error.reason);
    console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    return NextResponse.json(
      { error: error.message, code: error.code ?? "UNKNOWN" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    console.log("[API /leads] POST — attempting DB connection...");

    await connectDB();

    const body = await req.json();
    console.log("[API /leads] POST body received:", JSON.stringify(body, null, 2));

    if (!body.name || !body.phone) {
      return NextResponse.json(
        { error: "Name and Phone are required" },
        { status: 400 }
      );
    }

    const lead = await Lead.create(body);
    console.log("[API /leads] ✅ Lead created:", lead._id);
    return NextResponse.json(lead, { status: 201 });
  } catch (error: any) {
    console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.error("[API /leads] ❌ POST FAILED");
    console.error("  Error name   :", error.name);
    console.error("  Error message:", error.message);
    console.error("  Error code   :", error.code);
    if (error.reason) console.error("  Error reason :", error.reason);
    console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    return NextResponse.json(
      { error: error.message, code: error.code ?? "UNKNOWN" },
      { status: 500 }
    );
  }
}