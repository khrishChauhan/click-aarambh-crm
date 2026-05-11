import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    phone: {
      type: String,
      required: [true, "Please provide a phone number"],
    },
    email: {
      type: String,
    },
    status: {
      type: String,
      default: "New",
    },
    source: {
      type: String,
    },
    campaign: {
      type: String,
    },
    city: {
      type: String,
    },
    revenue: {
      type: Number,
      default: 0,
    },
    notes: {
      type: String,
    },
    nextFollowUp: {
      type: Date,
    },
    whatsappId: {
      type: String,
      sparse: true,
      unique: true,
    },
    whatsappHistory: [
      {
        role: { type: String, enum: ["user", "bot", "assistant"] },
        content: { type: String },
        timestamp: { type: Date, default: Date.now },
      }
    ],
    // Fields for AI Booking Flow
    bookingStatus: { 
      type: String, 
      enum: ["idle", "awaiting_date", "awaiting_time"], 
      default: "idle" 
    },
    meetingScheduled: { type: Boolean, default: false },
    meetingDate: { type: Date },
    meetingTime: { type: String },
    chatSummary: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Lead || mongoose.model("Lead", LeadSchema);