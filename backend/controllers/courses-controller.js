const { v4: uuidv4 } = require("uuid");
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

const getCoursesById = (req, res, next) => {
  const courseId = req.params.cid;
  const course = DUMMY_COURSES.find((c) => {
    return c.id === courseId;
  });
  if (!course) {
    throw new HttpError("NO course found with given id", 404);
  }
  res.json({ course });
};

const createdCourse = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError("Invalid input", 422));
  }
  const { title } = req.body;
  const createdCourse = {
    id: uuidv4(),
    title: title,
  };

  DUMMY_COURSES.push(createdCourse);
  res.status(201).json({ message: "Place created successfully!" });
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
