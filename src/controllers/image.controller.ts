import { HandlerType } from "../types/Handler";

const image_index_get: HandlerType = (req, res, next) => {
  //   res.send("Image Index Page");
  res.render("pages/imageIndex", { title: "Image Index" });
};

export default {
  image_index_get,
};
