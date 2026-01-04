import { Request, Response, NextFunction } from "express";

export const validateAllObjectImageFiles = (req: Request, res: Response, next: NextFunction) => {
  console.log("IN VALIDATE ALL OBJECT FILS:")
    const requiredFields = [
    'objects[0][file]',
    'objects[1][file]',
    'objects[2][file]'
  ];

  const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;

  // console.log({files});
  // console.log(files);

  // for (const field of requiredFields) {
    
  //   console.log(files[field])
  // }
  // console.log(req.fileUloadError);
  // let missingField = ""

  // for (const [index, field] of requiredFields.entries()) {

  //   if(!files || !files[field] || files[field].length === 0) {
  //       missingField += `Object photo ${index +1}${requiredFields.length - 1 === index ? "" : ", " }`;
  //       req.fileUloadError = `Missing file for: ${missingField}. All photos are required.`;
  //   }
  // }

  let isAnyFileMissing = false;

  requiredFields.forEach((fieldName) => {
    const hasFile = !!(files && files[fieldName] && files[fieldName].length > 0);
    if (!hasFile) {
      isAnyFileMissing = true;
    }
  });

  if (isAnyFileMissing) {
    if (!req.fileUploadErrors) {
      req.fileUploadErrors = {};
    }
  }
 

  requiredFields.forEach((fieldName, index) => {
    const hasFile = files && files[fieldName] && files[fieldName].length > 0;

    if(!hasFile && !req.fileUploadErrors![fieldName]) {
      req.fileUploadErrors![fieldName] = {
        code: "REQUIRED_FILE",
        field: fieldName,
        message:  `Missing file for object ${index + 1}. All photos are required.`
      }
    }
  })

  return next();
}
