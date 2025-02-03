import mongoose, { Schema } from "mongoose";
mongoose.set("runValidators", true);

const reviewSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  pictureUrl: { type: String },
  review: { type: String, required: true },
  stay: { type: String },
  approved: { type: Boolean, default: false },
  created: { type: Date, default: new Date() },
});

export default mongoose.models.review || mongoose.model("review", reviewSchema);
