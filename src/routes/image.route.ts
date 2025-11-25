import express from "express";
import imageController from "../controllers/image.controller";

import { multerErrorHandler } from "../middlewares/multerErrorHandler";
import { requireAuth } from "../middlewares/requireAuth";
import { upload } from "../config/multer.config";

const imageRouter = express.Router();

imageRouter.use(requireAuth);

imageRouter.get("/", imageController.image_index_get);

imageRouter.get("/upload", imageController.image_upload_get);

imageRouter.post(
  "/upload",
  upload.single("image"),
  multerErrorHandler,
  imageController.image_upload_post
);

export default imageRouter;
