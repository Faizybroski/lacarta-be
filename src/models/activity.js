import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    category: {
      type: String,
      enum: [
        "beaches",
        "activities",
        "tours",
        "gastronomy",
        "hotels",
        "boating"
      ],
      required: true
    }
  },
  { timestamps: true }
);

activitySchema.index({
  title: "text",
  description: "text",
  category: "text",
  location: "text",
});

const Activity =
  mongoose.models.Activity || mongoose.model("Activity", activitySchema);

export default Activity