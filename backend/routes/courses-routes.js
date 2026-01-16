const express = require("express");
const { check } = require("express-validator");
const coursesController = require("../controllers/courses-controller");

const router = express.Router();

router.get("/", coursesController.getAllCourses);
router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("shortDescription").not().isEmpty(),
    check("longDescription").not().isEmpty(),
    check("mode").isIn(["Offline", "Online", "Hybrid"]),
    check("applicationDeadline").isISO8601(),
  ],
  coursesController.createdCourse
);
router.get("/:cid", coursesController.getCoursesById);
router.patch(
  "/:cid",
  [
    check("title").optional().not().isEmpty(),
    check("shortDescription").optional().not().isEmpty(),
    check("longDescription").optional().not().isEmpty(),
    check("duration").optional().isString(),
    check("mode").optional().isIn(["Offline", "Online", "Hybrid"]),
    check("applicationDeadline").optional().isISO8601(),
    check("isActive").optional().isBoolean(),
  ],
  coursesController.updateCourse
);
router.delete("/:cid", coursesController.deleteCourse);
module.exports = router;
