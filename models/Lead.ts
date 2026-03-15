import mongoose from "mongoose"

const LeadSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  status: String,
  nextFollowUp: Date,
  revenue: Number,
  notes: String,
  source: String,
  campaign: String,
  city: String
}, { timestamps: true })

export default mongoose.models.Lead || mongoose.model("Lead", LeadSchema)