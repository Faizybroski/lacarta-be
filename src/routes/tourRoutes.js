import express from "express";
import {
  getTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
} from "../controllers/tourController.js";

import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/all-tour", getTours);
router.get("/tour-by-id/:id", getTourById);
router.post("/create-tour", protect, admin, createTour);
router.put("/update-tour/:id", protect, admin, updateTour);
router.delete("/delete-tour/:id", protect, admin, deleteTour);

export default router;