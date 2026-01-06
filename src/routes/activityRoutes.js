import express from "express";
import {
  getActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
} from "../controllers/activityController.js";

import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

/* PUBLIC */
router.get("/all-activities", getActivities);
router.get("/activities-by-ID/:id", getActivityById);

/* ADMIN */
router.post("/create-activity", protect, admin, createActivity);
router.put("/update-activity/:id", protect, admin, updateActivity);
router.delete("/delete-activity/:id", protect, admin, deleteActivity);

export default router;