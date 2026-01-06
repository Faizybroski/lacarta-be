import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    icon: {
      type: String, // bootstrap icon or image URL
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);



const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;