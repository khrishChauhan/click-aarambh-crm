import { connectDB } from "@/lib/db";
import Lead from "@/models/Lead";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    
    // Fetch leads where meetingScheduled is true, sort by meetingDate (ascending)
    const meetings = await Lead.find({ meetingScheduled: true })
      .sort({ meetingDate: 1 })
      .select('name phone email status meetingDate meetingTime chatSummary');
      
    return NextResponse.json(meetings);
  } catch (error: any) {
    console.error("Error fetching meetings:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
