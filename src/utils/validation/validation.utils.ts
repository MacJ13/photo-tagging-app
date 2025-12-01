import { FieldValidationError } from "express-validator";

export const getFieldErrorValidation = (
  validationErrors: FieldValidationError[]
) => {
  // 1. Create fieldError object variable
  const fieldError: Record<string, Array<String>> = {};

  // 2. extract data from validationErrors and retain in fieldError object
  validationErrors.forEach((singleFieldError) => {
    // 3. save correct field by specific error property
    if (!fieldError[singleFieldError.path]) {
      fieldError[singleFieldError.path] = [singleFieldError.msg];
    } else {
      fieldError[singleFieldError.path].push(singleFieldError.msg);
    }
  });

  return fieldError;
};
