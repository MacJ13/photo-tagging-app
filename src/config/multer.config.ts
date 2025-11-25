import multer from "multer";

const LIMIT_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const STORAGE_TYPE = multer.memoryStorage();

export const upload = multer({
  storage: STORAGE_TYPE,
  limits: { fileSize: LIMIT_FILE_SIZE },
  fileFilter(req, file, callback) {
    const isImage = file.mimetype.startsWith("image/");

    if (!isImage) {
      return callback(new Error("Only image files are allowed"));
    }
    callback(null, true);
  },
  // preservePath: true,
}); // 5MB limit
