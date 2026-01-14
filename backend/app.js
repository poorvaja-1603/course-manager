const express = require("express");

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

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
