import mongoose from "mongoose";

const gastronomySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ["Restaurant", "Cafe", "Bar", "Street Food"],
      required: true,
    },
    location: { type: String, default: "Cartagena" },
    priceRange: { type: String }, // $, $$, $$$
    images: [String],
    rating: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

/* Search Index */
gastronomySchema.index({
  name: "text",
  description: "text",
  category: "text",
});

const Gastronomy =
  mongoose.models.Gastronomy ||
  mongoose.model("Gastronomy", gastronomySchema);

export default Gastronomy;