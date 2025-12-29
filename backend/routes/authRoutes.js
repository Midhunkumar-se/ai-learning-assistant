import express from "express";
import { body } from "express-validator";

import {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
} from "../controller/authController.js";
import protect from "../middleware/auth.js";

const route = express.Router();

//Validation middleware
const registerValidation = [
  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 charaters"),
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please Provide a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

const loginValidation = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please Provide a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

//Public routes
route.post("/register", registerValidation, register);
route.post("/login", loginValidation, login);

//Protected routes
route.get("/profile", protect, getProfile);
route.put("/profile", protect, updateProfile);
route.post("/change-password", protect, changePassword);

export default route;
