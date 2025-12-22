const express = require("express")
const cors = require("cors")

const allowedOrigins = [
  "http://localhost:5173",
  "https://lacarta-two.vercel.app"
]

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error("Not allowed by CORS"))
      }
    },
    credentials: true
  })
)

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.json({ message: "App is ready" })
})

module.exports = app