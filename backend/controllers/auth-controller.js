const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const User = require("../models/user");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "A",
    email: "test1@g.com",
    password: "123",
    role: "Student",
  },
  {
    id: "u2",
    name: "B",
    email: "admin@g.com",
    password: "123",
    role: "Admin",
  },
];

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError("Invalid input", 422));
  }
  const { name, email, password, role } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    console.log(err);
    return next(new HttpError("Something went wrong, try again later!", 500));
  }
  if (existingUser) {
    throw new HttpError("User already exists!", 422);
  }
  const createdUser = new User({
    name,
    email,
    password,
    role,
  });
  try {
    await createdUser.save();
  } catch (err) {
    console.log(err);
    return next(
      new HttpError("Something went wrong, try signing up later!", 500)
    );
  }
  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let identifiedUser;
  try {
    identifiedUser = await User.findOne({ email: email });
  } catch (err) {
    console.log(err);
    return next(new HttpError("Something went wrong, try again later!", 500));
  }
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError("Wrong credentials", 401);
  }
  res.json({ message: "Logged In!" });
};

exports.signup = signup;
exports.login = login;
