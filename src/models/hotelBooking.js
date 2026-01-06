import mongoose from "mongoose";

const hotelBookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
    },

    numberOfPeople: {
      type: Number,
      required: true,
      min: 1,
    },

    checkInDate: {
      type: Date,
      required: true,
    },

    departureDate: {
      type: Date,
      required: true,
    },

    message: {
      type: String,
    },

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Pending",
    },

    cancellationReason: {
      type: String,
    },
  },
  { timestamps: true }
);

hotelBookingSchema.index({
  title: "text",
  description: "text",
  category: "text",
  location: "text",
});

const HotelBooking =
  mongoose.models.HotelBooking || mongoose.model("HotelBooking", hotelBookingSchema);

export default HotelBooking;