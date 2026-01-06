import express from "express";
import {
  bookHotel,
  getUserHotelBookings,
  getAllHotelBookings,
  cancelHotelBooking,
} from "../controllers/hotelBookingController.js";

const router = express.Router();

router.post("/book-hotel", bookHotel);
router.get("/my-bookings", getUserHotelBookings);
router.get("/all-bookings", getAllHotelBookings);
router.put("/cancel-booking/:id", cancelHotelBooking);

export default router;