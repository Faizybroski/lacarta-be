import express from "express";
import cors from "cors";

const app = express();

/* Allowed Origins */
const allowedOrigins = [
  "http://localhost:5173",
  "https://lacarta-two.vercel.app"
];

/* Middlewares */
app.use(express.json());

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

export default app;