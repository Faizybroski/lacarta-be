import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    images: [
      {
        type: String, // image URLs
      },
    ],

    location: {
      type: String,
    },

    priceRange: {
      type: String, // $, $$, $$$
    },

    rating: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

restaurantSchema.index({
  title: "text",
  description: "text",
  category: "text",
  location: "text",
});

const Restaurant =
  mongoose.models.Restaurant ||
  mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;