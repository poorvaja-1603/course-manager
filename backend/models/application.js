const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
  student: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  course: {
    type: mongoose.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  status: {
    type: String,
    enum: ["Applied", "Accepted", "Rejected"],
    default: "Applied",
    required: true,
  },
});

module.exports = mongoose.model("Application", applicationSchema);
