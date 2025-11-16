import { HandlerType } from "../types/Handler";
import { FieldValidationError, validationResult } from "express-validator";

export const handleValidationErrors: HandlerType = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const srcErrors = errors.array();

    const fieldErrors: Record<string, unknown> = {};
    if (Array.isArray(srcErrors)) {
      srcErrors.forEach((e) => {
        console.log();
        const fieldError = e as FieldValidationError;

        fieldErrors[fieldError.path] = fieldError.msg;
      });
    }

    console.log({ fieldErrors });
    res.render("pages/login", {
      title: "User Login",
      fieldErrors,
      formData: req.body,
    });
    return;
  }
  next();
};
