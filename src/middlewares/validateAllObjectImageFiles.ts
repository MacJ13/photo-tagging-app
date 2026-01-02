import { Request, Response, NextFunction } from "express";

export const validateAllObjectImageFiles = (req: Request, res: Response, next: NextFunction) => {
  console.log("IN VALIDATE ALL OBJECT FILS:")
    const requiredFields = [
    'objects[0][file]',
    'objects[1][file]',
    'objects[2][file]'
  ];

  const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;

  console.log({files});
  for (const field of requiredFields) {
    console.log(files[field])
    if(!files || !files[field] || files[field].length === 0) {
        req.fileUloadError = `Missing file for: ${field}. All photos are required.`;
        return next();
    }
  }

  return next();
}
