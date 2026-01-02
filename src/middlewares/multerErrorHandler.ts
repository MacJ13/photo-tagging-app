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
  
  if (err instanceof multer.MulterError) {

     console.log("file", req.file, req.files);
     console.log(err.code, err.field, err.message, err.name, err.stack);

    let errorMessage: string = "sending file failed";

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
    // if (err.code === "LIMIT_FILE_SIZE") {
    //   errorMessage = "File size exceeds the allowed limit";
    // } else {
    //   errorMessage = "multer error: " + err.message;
    // }

    req.fileUloadError = errorMessage;
    return next();
  }

  if (err instanceof Error && err.message === "Only image files are allowed") {
    req.fileUloadError = err.message;
    return next();
  }



 



  next(err);
};
