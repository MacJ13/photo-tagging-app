import express from "express";
import imageController from "../controllers/image.controller";

import { requireAuth } from "../middlewares/requireAuth";

const imageRouter = express.Router();

imageRouter.use(requireAuth);

imageRouter.get("/", imageController.image_index_get);

export default imageRouter;
