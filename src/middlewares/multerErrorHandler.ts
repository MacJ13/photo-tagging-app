import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import multer from "multer";

interface MulterError extends Error {
  code?: string;
  field?: string;
  storageErrors?: string[];
}
export const multerErrorHandler: ErrorRequestHandler = (
  err: MulterError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if(!req.fileUploadErrors) req.fileUploadErrors = {};
  
  if (err instanceof multer.MulterError) {

    //  console.log("file", req.file, req.files);
    //  console.log(err.code, err.field, err.message, err.name, err.stack);
    const fieldName = err.field || "general";

    let errorMessage: string = "";

    switch (err.code) {
      case "LIMIT_FILE_SIZE":
        errorMessage = "One of the files is too large (max 5MB).";
        break;
      case "LIMIT_UNEXPECTED_FILE":
        errorMessage = `Unexpected field: ${err.field}. Please check your form.`;
        break;
      case "LIMIT_FILE_COUNT":
        errorMessage = `Too many files uploaded.`;
        break;
      default:
        errorMessage = `Upload error: ${err.message}`;

    }

    req.fileUploadErrors[fieldName] = {
      code: err.code,
      field: fieldName,
      message: errorMessage
    }

    return next();
  }

  if (err instanceof Error && err.message === "Only image files are allowed") {
    const fieldName = (err as any).field || "general";

    req.fileUploadErrors[fieldName] = {
      code: "INVALID_FORMAT",
      field: fieldName,
      message: err.message
    }
    return next();
  }



 



  next(err);
};
