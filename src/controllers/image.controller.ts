import cloudinaryService from "../service/cloudinary.service";
import { HandlerType } from "../types/Handler";
const image_index_get: HandlerType = (req, res, next) => {
  //   res.send("Image Index Page");
  res.render("pages/imageIndex", { title: "Image Index" });
};

const image_upload_get: HandlerType = (req, res, next) => {
  res.render("pages/imageUpload", { title: "Upload Images" });
};

const image_upload_post: HandlerType = async (req, res, next) => {
  console.log(req.fileUloadError);
  console.log(req.file);
  if (req.fieldValidationError || req.fileUloadError || !req.file) {
    let noFileMessageError: string = "";
    if (!req.file) {
      noFileMessageError = "No file uploaded";
    }

    return res.render("pages/imageUpload", {
      title: "Upload Images",
      fieldErrors: req.fieldValidationError,
      fieldFileError: req.fileUloadError || noFileMessageError || "",
      formData: req.body,
    });
  }

  // if (req.fileUloadError) {
  //   console.log("File upload error:", req.fileUloadError);

  //   return res.render("pages/imageUpload", {
  //     title: "Upload Images",
  //     errorMessage: req.fileUloadError,
  //   });
  // }

  try {
    const imageTitle = req.body.imagetitle;

    console.log(imageTitle);
    console.log(req.file);

    res.redirect("/images");
    // console.log("file uploaded successfully");
    // console.log(req.file);

    // // console.log("Uploading to Cloudinary...");
    // console.log(cloudinary);
    const uploaded = await cloudinaryService.upload_stream(
      "photo-tagging-app/name",
      req.file
    );
    console.log("Uploaded to Cloudinary:", uploaded);
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
