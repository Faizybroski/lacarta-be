import dotenv from "dotenv";
// import 'dotenv/config'
import app from "../src/app.js";
import connectDB from "../src/Config/db.js";
import authRoutes from "../src/Routes/authRoutes.js";
import hotelBookingRoutes from "../src/routes/hotelBookingRoutes.js";
import activityRoutes from "../src/routes/activityRoutes.js";
import categoryRoutes from "../src/routes/categoryRoutes.js";
import restaurantRoutes from "../src/routes/restaurantRoutes.js";
import gastronomyRoutes from "../src/routes/gastronomyRoutes.js";
import boatingRoutes from "../src/routes/boatingRoutes.js";
import tourRoutes from "../src/routes/tourRoutes.js";
import searchRoutes from '../src/routes/searchRoutes.js'

dotenv.config({ path: '../.env' })

// Connect DB once per cold start
let isConnected = false;
async function connectOnce() {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
}

const PORT = process.env.PORT || 5000;


app.use("/api/auth", authRoutes);
app.use("/api/hotels", hotelBookingRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/gastronomy", gastronomyRoutes);
app.use("/api/boats", boatingRoutes);
app.use("/api/tours", tourRoutes);
app.use("/api/search", searchRoutes);

if (process.env.NODE_ENV !== 'production') {
  await connectOnce();
  app.listen(PORT, () => {
    console.log(`🚀 Local API running on http://localhost:${PORT}`);
  });
}

// Serverless handler
export default async function handler(req, res) {
  await connectOnce();
  return app(req, res);
}
