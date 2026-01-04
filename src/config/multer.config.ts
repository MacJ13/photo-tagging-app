import multer from "multer";

const LIMIT_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const STORAGE_TYPE = multer.memoryStorage();

export const upload = multer({
  storage: STORAGE_TYPE,
  limits: { fileSize: LIMIT_FILE_SIZE },
  fileFilter(req, file, callback) {
    const isImage = file.mimetype.startsWith("image/");

    if (!isImage) {
      const error = new Error("Only image files are allowed") as any;
      error.field = file.fieldname;
      return callback(error);
    }
    callback(null, true);
  },
  // preservePath: true,
}); // 5MB limit
