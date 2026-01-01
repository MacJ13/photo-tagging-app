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
    .withMessage("Password must not be empty")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .custom(async (value, { req }) => {
      // Check if password is correct
      // This is a placeholder for actual password check

      const passwordField = value as string;
      const userNameField = req.body.username as string;

      const properPasswordField = !passwordField || passwordField.length < 6;
      const properUsernameField = !userNameField || userNameField.length < 3;

      if (properPasswordField || properUsernameField) {
        return;
      }
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

export const imageTitleValidator = [
  body("imagetitle")
    .trim()
    .notEmpty()
    .withMessage("Image title must be not empty")
    .isLength({ min: 4 })
    .withMessage("Title must be between 4 and 100 characters long"),
];


export const objectImageValidators = [
  body([
    'objects.*.startX',
    'objects.*.startY',
    'objects.*.endX',
    'objects.*.endY'
  ]).trim().notEmpty().withMessage(("object position must not be empty")).isInt({ min: 0}).withMessage('all coords must be '),
  body("objects.*.filename").trim().notEmpty().withMessage("file name must not be empty").isLength({min: 3}).withMessage("file name must name at least 3 characters")
];