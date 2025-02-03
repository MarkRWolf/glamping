import mongoose, { Schema } from "mongoose";
mongoose.set("runValidators", true);

const activitySchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  pictureUrl: { type: String, required: true },
  created: { type: Date, default: new Date() },
});

export default mongoose.models.activity || mongoose.model("activity", activitySchema);
