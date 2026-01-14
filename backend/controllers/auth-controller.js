const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");

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

const signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError("Invalid input", 422));
  }
  const { name, email, password, role } = req.body;
  const hasUser = DUMMY_USERS.find((u) => u.email === email);
  if (hasUser) {
    throw new HttpError("User already exists!", 422);
  }
  const createdUser = {
    id: uuidv4(),
    name,
    email,
    password,
    role,
  };
  DUMMY_USERS.push(createdUser);
  res.status(200).json({ user: createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError("Wrong credentials", 401);
  }
  res.json({ message: "Logged In!" });
};

exports.signup = signup;
exports.login = login;
