import { HandlerType } from "../types/Handler";

const image_index_get: HandlerType = (req, res, next) => {
  //   res.send("Image Index Page");
  res.render("pages/imageIndex", { title: "Image Index" });
};

const image_upload_get: HandlerType = (req, res, next) => {
  res.render("pages/imageUpload", { title: "Upload Images" });
};

const image_upload_post: HandlerType = (req, res, next) => {
  // console.log(req.fileUloadError, "---", Boolean(req.fileUloadError));

  if (req.fileUloadError) {
    console.log("File upload error:", req.fileUloadError);

    return res.render("pages/imageUpload", {
      title: "Upload Images",
      errorMessage: req.fileUloadError,
    });
  }

  if (!req.file) {
    console.log("No file uploaded");
    return res.render("pages/imageUpload", {
      title: "Upload Images",
      errorMessage: "No file uploaded",
    });
  }

  try {
    console.log("file uploaded successfully");
    console.log(req.file);
    // THIS WILL CONTINUE TO SAVE THE FILE TO DB OR FILE SYSTEM
    res.render("pages/imageUpload", { title: "Upload Images" });
  } catch (error) {
    res.status(500).render("pages/imageUpload", {
      title: "Upload Images",
      errorMessage: "An error occurred while processing the image",
    });
  }
};

export default {
  image_index_get,
  image_upload_get,
  image_upload_post,
};
