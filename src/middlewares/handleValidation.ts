import { HandlerType } from "../types/Handler";
import { FieldValidationError, validationResult } from "express-validator";
import { getFieldErrorValidation } from "../utils/validation/validation.utils";

export const handleValidationErrors: HandlerType = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const srcErrors = errors.array();

    if (Array.isArray(srcErrors)) {
      const fieldErrors = getFieldErrorValidation(
        srcErrors as FieldValidationError[]
      );

      req.fieldValidationError = fieldErrors;
    }
  }
  next();
};

// export const handleImageTitleValidationErrors: HandlerType = (
//   req,
//   res,
//   next
// ) => {
//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     const errorResult = errors.isEmpty();

//     console.log(errors);
//     console.log(errors.array());
//     console.log({ errorResult });

//     // req.fieldValidationError = "field error";

//     return next();
//   }

//   next();
// };

// export const handleImageTitleValidationErrors: HandlerType = (
//   req,
//   res,
//   next
// ) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     const srcErrors = errors.array();

//     const fieldErrors: Record<string, unknown> = {};
//     if (Array.isArray(srcErrors)) {
//       srcErrors.forEach((e) => {
//         console.log();
//         const fieldError = e as FieldValidationError;
//         fieldErrors[fieldError.path] = fieldError.msg;
//       });
//     }
//     console.log({ fieldErrors });
//     res.render("pages/imageUpload", {
//       title: "Upload Images",
//       fieldErrors,

//       formData: req.body,
//     });
//     return;
//   }
//   next();
// };
