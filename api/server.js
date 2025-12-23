import dotenv from "dotenv";
import app from "../src/app.js";
import connectDB from "../src/Config/db.js";
import authRoutes from "../src/Routes/authRoutes.js";

dotenv.config();

// Connect DB once per cold start
let isConnected = false;
async function connectOnce() {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
}

app.use("/api/auth", authRoutes);

// Serverless handler
export default async function handler(req, res) {
  await connectOnce();
  return app(req, res);
}
