import express from "express";
import {
  getGastronomy,
  getGastronomyById,
  createGastronomy,
  updateGastronomy,
  deleteGastronomy,
} from "../controllers/gastronomyController.js";

import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/all-gastronomy", getGastronomy);
router.get("/gastronomy-by-id/:id", getGastronomyById);
router.post("/create-gastronomy", protect, admin, createGastronomy);
router.put("/update-gastronomy/:id", protect, admin, updateGastronomy);
router.delete("/delete-gastronomy/:id", protect, admin, deleteGastronomy);

export default router;
