const Course = require("../models/course");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");

const getCoursesById = async (req, res, next) => {
  const courseId = req.params.cid;
  let course;
  try {
    course = await Course.findById(courseId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong while finding, Please try again later",
      500
    );
    return next(error);
  }
  if (!course) {
    throw new HttpError("No course found with given id", 404);
  }
  res.json({ course: course.toObject({ getters: true }) });
};

const createdCourse = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError("Invalid input", 422));
  }
  const {
    title,
    shortDescription,
    longDescription,
    duration,
    mode,
    applicationDeadline,
    isActive,
  } = req.body;
  const createdCourse = new Course({
    title,
    shortDescription,
    longDescription,
    duration,
    mode,
    applicationDeadline,
    createdBy: req.user.id,
    isActive,
    applicationsCount: 0,
  });

  try {
    await createdCourse.save();
  } catch (err) {
    const error = new HttpError(
      "Cannnot create course right now, Try again Later",
      500
    );
    return next(error);
  }
  res
    .status(201)
    .json({ createdCourse: createdCourse.toObject({ getters: true }) });
};

const getAllCourses = async (req, res, next) => {
  let courses;
  try {
    courses = await Course.find();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Something went wrong, try again later!", 500);
    return next(error);
  }
  res.json({ courses: courses.map((c) => c.toObject({ getters: true })) });
};

const updateCourse = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError("Invalid input", 422));
  }
  const {
    title,
    shortDescription,
    longDescription,
    duration,
    mode,
    applicationDeadline,
    isActive,
  } = req.body;
  const courseId = req.params.cid;
  let course;
  try {
    course = await Course.findById(courseId);
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Something went wrong while updating course, try again later",
      500
    );
    return next(error);
  }
  if (!course) {
    return next(new HttpError("Course not found", 404));
  }

  if (title !== undefined) course.title = title;
  if (shortDescription !== undefined)
    course.shortDescription = shortDescription;
  if (longDescription !== undefined) course.longDescription = longDescription;
  if (duration !== undefined) course.duration = duration;
  if (mode !== undefined) {
    if (course.applicationsCount > 0) {
      return next(
        new HttpError("Cannot change mode once applications have started", 400)
      );
    }
    course.mode = mode;
  }
  if (applicationDeadline !== undefined) {
    course.applicationDeadline = new Date(applicationDeadline);
  }
  if (typeof isActive === "boolean") {
    course.isActive = isActive;
  }

  try {
    await course.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Could not update the course, try again later",
      500
    );
    return next(error);
  }
  res.status(200).json({ course: course.toObject({ getters: true }) });
};

const deleteCourse = async (req, res, next) => {
  const courseId = req.params.cid;
  let course;
  try {
    course = await Course.findById(courseId);
  } catch (err) {
    console.log(err);
    return next(new HttpError("Something went wrong, try again later!", 500));
  }
  if (!course) {
    return next(new HttpError("Course not found", 404));
  }

  try {
    await Course.deleteOne(course);
  } catch (err) {
    console.log(err);
    return next(new HttpError("Could not update, try again later!", 500));
  }
  res.status(200).json({ message: "Deleted Successfully" });
};

exports.getCoursesById = getCoursesById;
exports.createdCourse = createdCourse;
exports.getAllCourses = getAllCourses;
exports.updateCourse = updateCourse;
exports.deleteCourse = deleteCourse;
