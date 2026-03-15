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
  },
  { timestamps: true }
);

export default mongoose.models.Lead || mongoose.model("Lead", LeadSchema);