import express from "express";
import imageController from "../controllers/image.controller";

import { multerErrorHandler } from "../middlewares/multerErrorHandler";
import { requireAuth } from "../middlewares/requireAuth";
import { upload } from "../config/multer.config";
import { imageTitleValidator, objectImageValidators } from "../middlewares/bodyValidators";
import { handleValidationErrors } from "../middlewares/handleValidation";

import {validateAllObjectImageFiles }from "../middlewares/validateAllObjectImageFiles";

const imageRouter = express.Router();

imageRouter.use(requireAuth);

imageRouter.get("/", imageController.image_index_get);

imageRouter.get("/upload", imageController.image_upload_get);

imageRouter.get("/:imageId/add", imageController.image_detail_get);



imageRouter.post(
  "/upload",
  upload.single("image"),
  multerErrorHandler,
  imageTitleValidator,
  handleValidationErrors, 
  imageController.image_upload_post
);

imageRouter.post("/:imageId/add",  
  upload.fields([
    { name: 'objects[0][file]', maxCount: 1 },
    { name: 'objects[1][file]', maxCount: 1 },
    { name: 'objects[2][file]', maxCount: 1 }
  ]),
  multerErrorHandler,
  validateAllObjectImageFiles,
  objectImageValidators, 
  handleValidationErrors, 
  imageController.image_detail_post
);

export default imageRouter;
