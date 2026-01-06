import express from "express";
import { bookTrip,getUserTrips,
  getAllTrips,
  cancelTrip, } from "../controllers/tripController.js";
  import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/book-trip", bookTrip);
/* User trips */
router.get("/my-trips",protect, getUserTrips);

/* Admin trips */
router.get("/all-trips",protect, getAllTrips);

// cancel trip
router.put("/cancel-trip/:id", protect, cancelTrip);

export default router;