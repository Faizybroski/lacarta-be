import Trip from "../models/trip.js";
import sendEmail from "../utils/sendEmail.js";

export const bookTrip = async (req, res) => {
  try {
    const {
      fullName,
      phone,
      email,
      preferredLanguage,
      services,
      travelDate,
      message,
    } = req.body;

    /* Basic validation */
    if (
      !fullName ||
      !phone ||
      !email ||
      !preferredLanguage ||
      !services ||
      !travelDate
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });
    }

    const trip = await Trip.create({
      fullName,
      phone,
      email,
      preferredLanguage,
      services,
      travelDate,
      message,
    });

    res.status(201).json({
      message: "Trip booked successfully",
      trip,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* GET trips by user (email) */
export const getUserTrips = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const trips = await Trip.find({ email }).sort({ createdAt: -1 });

    res.json({
      count: trips.length,
      trips,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* GET all trips (Admin) */
export const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find().sort({ createdAt: -1 });

    res.json({
      count: trips.length,
      trips,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cancelation the trip

export const cancelTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    if (!reason) {
      return res
        .status(400)
        .json({ message: "Cancellation reason is required" });
    }

    const trip = await Trip.findById(id);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    if (trip.status === "Cancelled") {
      return res.status(400).json({ message: "Trip already cancelled" });
    }

    const isAdmin = req.user?.role === "admin";

    /* User ownership check */
    if (!isAdmin && trip.email !== req.user.email) {
      return res
        .status(403)
        .json({ message: "Not authorized to cancel this trip" });
    }

    /* Future date check (users only) */
    if (!isAdmin && new Date(trip.travelDate) <= new Date()) {
      return res.status(400).json({
        message: "You can only cancel trips with future travel dates",
      });
    }

    /* Update cancellation */
    trip.status = "Cancelled";
    trip.cancellationReason = reason;
    trip.cancelledAt = new Date();

    await trip.save();

    /* Send Email */
    await sendEmail({
      to: trip.email,
      subject: "Your Trip Has Been Cancelled",
      text: `
Hello ${trip.fullName},

Your trip scheduled for ${trip.travelDate.toDateString()} has been cancelled.

Reason:
${reason}

If you have any questions, please contact our support team.

— LaCarta Travel Team
      `,
    });

    res.json({
      message: "Trip cancelled successfully",
      trip,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
