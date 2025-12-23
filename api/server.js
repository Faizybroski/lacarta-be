import dotenv from "dotenv";
import app from "../src/app.js";
import connectDB from "../src/Config/db.js";
import authRoutes from "../src/Routes/authRoutes.js";

dotenv.config();

connectDB();

app.use("/api/auth", authRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});