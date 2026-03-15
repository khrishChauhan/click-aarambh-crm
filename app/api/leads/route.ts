import { connectDB } from "@/lib/db"
import Lead from "@/models/Lead"
import { NextResponse } from "next/server"

export async function GET() {
  await connectDB()
  const leads = await Lead.find()
  return NextResponse.json(leads)
}

export async function POST(req: Request) {
  await connectDB()
  const body = await req.json()
  const lead = await Lead.create(body)
  return NextResponse.json(lead)
}