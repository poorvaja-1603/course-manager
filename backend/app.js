const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const coursesRoutes = require("./routes/courses-routes");
const authRoutes = require("./routes/auth-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(express.json());
app.use("/api/courses", coursesRoutes);
app.use("/api", authRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(3000, () => {
      console.log("Connected Successfully!");
    });
  })
  .catch((err) => {
    console.log(err);
  });
