import express from "express";
import { signup, login } from "../controllers/authController.js";
import { googleAuth } from "../controllers/oAuthController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/google", googleAuth);
// router.post("/facebook", facebookAuth);

export default router;