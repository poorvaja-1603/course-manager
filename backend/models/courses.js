const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coursesSchema = new Schema({
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  longDescription: { type: String, required: true },
  duration: { type: String, required: true },
  mode: { type: String, enum: ["Online", "Offline", "Hybrid"], required: true },
  applicationDeadline: { type: Date },
  createdBy: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  applicationsCount: { type: Number, default: 0 },
});

module.exports = mongoose.model("Course", coursesSchema);
