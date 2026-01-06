import express from "express";
import {
  getRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from "../controllers/restaurantController.js";

import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

/* PUBLIC */
router.get("/", getRestaurants);
router.get("/:id", getRestaurantById);

/* ADMIN */
router.post("/", protect, admin, createRestaurant);
router.put("/:id", protect, admin, updateRestaurant);
router.delete("/:id", protect, admin, deleteRestaurant);

export default router;