import mongoose, { Schema } from "mongoose";
mongoose.set("runValidators", true);

const staySchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  infoTitle: { type: String, required: true },
  numberOfPersons: { type: String, required: true },
  price: { type: Number, required: true },
  includes: { type: String, required: true },
  pictureUrl: { type: String, required: true },
  created: { type: { id: String, date: Date } },
  updated: { type: [{ id: String, date: Date }], default: [] },
});

export default mongoose.models.stay || mongoose.model("stay", staySchema);
