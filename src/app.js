import express from "express";
import cors from "cors";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://lacarta-two.vercel.app",
];

app.use(express.json());

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// health check (IMPORTANT)
app.get("/", (req, res) => {
  res.json({ status: "OK", message: "API is running" });
});

export default app;
