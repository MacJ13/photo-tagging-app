import { FieldValidationError } from "express-validator";
import { getFieldErrorValidation } from "../../../src/utils/validation/validation.utils";

import { describe, expect, test } from "@jest/globals";

// const testErrors: FieldValidationError[] = [
//   {
//     type: "field",
//     value: "",
//     msg: "Username is required",
//     path: "Username",
//     location: "body",
//   },
//   {
//     type: "field",
//     value: "",
//     msg: "Username must be between 4 and 100 characters long",
//     path: "Username",
//     location: "body",
//   },
// ];

describe("Field validation errors", () => {
  let testUsernameFieldErrors: String[];
  let testPasswordFieldErrors: String[];

  beforeAll(() => {
    const testErrors: FieldValidationError[] = [
      {
        type: "field",
        value: "",
        msg: "Username is required",
        path: "username",
        location: "body",
      },
      {
        type: "field",
        value: "",
        msg: "Username must be between 4 and 100 characters long",
        path: "username",
        location: "body",
      },
    ];

    const resultErr = getFieldErrorValidation(testErrors);
    testUsernameFieldErrors = resultErr.Username;

    testPasswordFieldErrors = resultErr.password;
  });

  test("should contain 2 values in array", () => {
    expect(testUsernameFieldErrors).toHaveLength(2);
  });

  test("should contains exact values ", () => {
    expect(testUsernameFieldErrors).toEqual([
      "Username is required",
      "Username must be between 4 and 100 characters long",
    ]);
  });

  test("should noy contains password property errors ", () => {
    expect(testPasswordFieldErrors).toBeUndefined();
  });
});
