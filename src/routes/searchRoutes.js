import express from "express";
import { globalSearch } from "../controllers/searchController.js";

const router = express.Router();

router.get("/searching", globalSearch);

export default router;