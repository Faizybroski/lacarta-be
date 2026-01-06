import HotelBooking from "../models/hotelBooking.js";

/* BOOK HOTEL */
export const bookHotel = async (req, res) => {
  try {
    const booking = await HotelBooking.create(req.body);

    res.status(201).json({
      message: "Hotel booking successful",
      booking,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/* GET USER HOTEL BOOKINGS */
export const getUserHotelBookings = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const bookings = await HotelBooking.find({ email }).sort({
      createdAt: -1,
    });

    res.json({ bookings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* GET ALL HOTEL BOOKINGS (ADMIN) */
export const getAllHotelBookings = async (req, res) => {
  try {
    const bookings = await HotelBooking.find().sort({ createdAt: -1 });
    res.json({ bookings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* CANCEL HOTEL BOOKING */
export const cancelHotelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const booking = await HotelBooking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Hotel booking not found" });
    }

    if (booking.status === "Cancelled") {
      return res.status(400).json({ message: "Booking already cancelled" });
    }

    //  Cannot cancel after check-in date
    if (new Date(booking.checkInDate) <= new Date()) {
      return res
        .status(400)
        .json({ message: "Cannot cancel after check-in date" });
    }

    booking.status = "Cancelled";
    booking.cancellationReason = reason || "No reason provided";

    await booking.save();

    res.json({
      message: "Hotel booking cancelled successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};