const express = require("express");
require("dotenv").config();
const indexRoute = require("./routes/index");
const path = require("path");
const rateLimit = require("express-rate-limit");
const { connectDb } = require("../config/dbConfig");
const db = require("./models");
const app = express();
const port = process.env.PORT;

connectDb()
  .then(() => db.sequelize.sync())
  .catch((err) => console.error("Failed to connect DB:", err));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
  // standardHeaders: true,
  // legacyHeaders: false,
});

app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(limiter);
app.use("/api", indexRoute);
app.listen(port, () => {
  console.log(`Server start on port ${port}`);
});
