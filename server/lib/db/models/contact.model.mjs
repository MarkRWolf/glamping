import mongoose, { Schema } from "mongoose";
mongoose.set("runValidators", true);

const contactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, default: null, required: true },
  message: { type: String, default: null, required: true },
  subject: { type: String, default: "booking", required: true },
  created: { type: Date, default: new Date() },
});

export default mongoose.models.contact || mongoose.model("contact", contactSchema);
