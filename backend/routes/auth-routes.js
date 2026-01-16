const express = require("express");
const { check } = require("express-validator");
const authController = require("../controllers/auth-controller");

const router = express.Router();

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 5 }),
    check("role").isIn(["Student", "Admin"]),
  ],
  authController.signup
);

router.post("/login", authController.login);

module.exports = router;
