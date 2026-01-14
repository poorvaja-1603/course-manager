const express = require("express");
const { check } = require("express-validator");
const coursesController = require("../controllers/courses-controller");

const router = express.Router();

router.get("/", coursesController.getAllCourses);
router.post(
  "/",
  [check("title").not().isEmpty()],
  coursesController.createdCourse
);
router.get("/:cid", coursesController.getCoursesById);
router.patch(
  "/:cid",
  [check("title").not().isEmpty()],
  coursesController.updateCourse
);
router.delete("/:cid", coursesController.deleteCourse);
module.exports = router;
