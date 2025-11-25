import { HandlerType } from "../types/Handler";

const image_index_get: HandlerType = (req, res, next) => {
  //   res.send("Image Index Page");
  res.render("pages/imageIndex", { title: "Image Index" });
};

const image_upload_get: HandlerType = (req, res, next) => {
  res.render("pages/imageUpload", { title: "Upload Images" });
};

export default {
  image_index_get,
  image_upload_get,
};
