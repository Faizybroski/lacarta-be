import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: String,
    price: Number,
    category: String,
    images: [String],
    location: { type: String, default: "Cartagena" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

tourSchema.index({
  title: "text",
  description: "text",
  category: "text",
});

const Tour = mongoose.models.Tour || mongoose.model("Tour", tourSchema);
export default Tour;