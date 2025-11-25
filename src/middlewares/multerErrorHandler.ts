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
    let errorMessage: string = "sending file failed";

    if (err.code === "LIMIT_FILE_SIZE") {
      errorMessage = "File size exceeds the allowed limit";
    } else {
      errorMessage = "multer error: " + err.message;
    }

    req.fileUloadError = errorMessage;
    return next();
  }

  if (err instanceof Error && err.message === "Only image files are allowed") {
    req.fileUloadError = err.message;
    return next();
  }

  next(err);
};
