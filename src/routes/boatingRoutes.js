import express from "express";
import {
  getBoats,
  getBoatById,
  createBoat,
  updateBoat,
  deleteBoat,
} from "../controllers/boatingController.js";

import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/all-boats", getBoats); // ?type=Yachts
router.get("/boats-by-id/:id", getBoatById);
router.post("/create-boating/", protect, admin, createBoat);
router.put("/update-boating/:id", protect, admin, updateBoat);
router.delete("/delete-boating/:id", protect, admin, deleteBoat);

export default router;