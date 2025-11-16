import { body } from "express-validator";
import User from "../models/user.model";
import bcrypt from "bcrypt";

export const loginValidator = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long"),
  // .custom((value) => {
  //   if (/\s/.test(value)) {
  //     throw new Error("Username must not contain spaces");
  //   }
  // })

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .custom(async (value, { req }) => {
      // Check if password is correct
      // This is a placeholder for actual password check

      const passwordField = value;
      const userNameField = req.body.username;
      const user = await User.findOne({ username: userNameField });
      if (!user) {
        throw new Error("Username does not exist");
      }

      const isPasswordCorrect = await bcrypt.compare(
        passwordField,
        user.password
      );

      if (!isPasswordCorrect) {
        throw new Error("Incorrect password");
      }
      return true;
    }),
];
