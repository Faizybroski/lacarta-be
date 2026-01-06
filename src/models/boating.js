import mongoose from "mongoose";

const boatingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },

    type: {
      type: String,
      enum: [
        "Catamarans",
        "Boats",
        "Sailboat",
        "Jet Ski",
        "Tours",
        "Yachts",
        "Powerboats",
      ],
      required: true,
    },

    capacity: Number,
    pricePerDay: Number,
    images: [String],
    location: { type: String, default: "Cartagena" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

/* Search Index */
boatingSchema.index({
  title: "text",
  description: "text",
  type: "text",
});

const Boating =
  mongoose.models.Boating || mongoose.model("Boating", boatingSchema);

export default Boating;