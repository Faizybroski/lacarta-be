import express from "express";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

/* PUBLIC */
router.get("/all-categories/", getCategories);

/* ADMIN */
router.post("/create-category", protect, admin, createCategory);
router.put("/update-category/:id", protect, admin, updateCategory);
router.delete("/delete-category/:id", protect, admin, deleteCategory);

export default router;