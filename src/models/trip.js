import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    fullName: String,
    phone: String,
    email: String,
    preferredLanguage: String,
    services: [String],
    travelDate: Date,
    message: String,

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Pending",
    },

    cancellationReason: {
      type: String,
      default: "",
    },

    cancelledAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

tripSchema.index({
  title: "text",
  description: "text",
  category: "text",
  location: "text",
});

const Trip =
  mongoose.models.Trip || mongoose.model("Trip", tripSchema);

export default Trip