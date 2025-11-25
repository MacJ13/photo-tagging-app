import express from "express";
import imageController from "../controllers/image.controller";

const imageRouter = express.Router();

imageRouter.get("/", imageController.image_index_get);

imageRouter.get("/upload", imageController.image_upload_get);

export default imageRouter;
