const { v4: uuidv4 } = require("uuid");
const Course = require("../models/course");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");

let DUMMY_COURSES = [
  {
    id: "c1",
    title: "React",
  },
  {
    id: "c2",
    title: "ML",
  },
];

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
    createdBy,
    createdAt,
    isActive,
    applicationsCount,
  } = req.body;
  const createdCourse = {
    title,
    shortDescription,
    longDescription,
    duration,
    mode,
    applicationDeadline,
    createdBy,
    createdAt,
    isActive,
    applicationsCount,
  };

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

const getAllCourses = (req, res, next) => {
  res.status(200).json(DUMMY_COURSES);
};

const updateCourse = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError("Invalid input", 422));
  }
  const { title } = req.body;
  const courseId = req.params.cid;

  const courseIndex = DUMMY_COURSES.findIndex((c) => c.id === courseId);
  const course = DUMMY_COURSES[courseIndex];
  const updatedCourse = {
    ...course,
    title: title,
  };

  DUMMY_COURSES[courseIndex] = updatedCourse;
  res.status(200).json(updatedCourse);
};

const deleteCourse = (req, res, next) => {
  const courseId = req.params.cid;
  if (DUMMY_COURSES.find((c) => c.id === courseId)) {
    throw new HttpError("No such place found!", 404);
  }
  DUMMY_COURSES = DUMMY_COURSES.filter((p) => p.id !== courseId);
  res.status(200).json({ message: "Deleted Successfully" });
};

exports.getCoursesById = getCoursesById;
exports.createdCourse = createdCourse;
exports.getAllCourses = getAllCourses;
exports.updateCourse = updateCourse;
exports.deleteCourse = deleteCourse;
