import { CloudinaryStorage } from "../service/image-storage/CloudinaryStorage";
import { ImageStorage } from "../service/image-storage/ImageStorage";
import {
  getAllMainImagesInDB,
  getMainImageByID,
  savePhotoInDB,
} from "../service/photo.service";
import { HandlerType } from "../types/Handler";

const imageStorageService: ImageStorage = new CloudinaryStorage();

const image_index_get: HandlerType = async (req, res, next) => {
  //   res.send("Image Index Page");
  try {
    const images = await getAllMainImagesInDB();
    console.log({ images });
    res.render("pages/imageIndex", { title: "Image Index", images: images });
  } catch (err) {
    console.log(err);
  }
};

const image_detail_get: HandlerType = async (req, res, next) => {
  try {
    console.log({ params: req.params });

    const imageId = req.params.imageId;

    const mainImage = await getMainImageByID(imageId);

    console.log({ mainImage });

    console.log({ imageId });
    res.render("pages/imageDetail", { title: "Image Detail", mainImage, objects: [] });
  } catch (err) {
    console.log(err);
  }
};

const image_detail_post: HandlerType = async (req, res, next) => {
 
  console.log( "req body ",req.body);

  if(req.fieldValidationError) {
      console.log(req.body);

      const objects = req.body.objects;

      console.log({objects})
      console.log(req.fieldValidationError);

       const imageId = req.params.imageId;

        const mainImage = await getMainImageByID(imageId);

       res.render("pages/imageDetail", { title: "Image Detail", mainImage, objects })
       return;
  }

  req.body.objects.forEach((obj: any) => {
    console.log(obj.filename);
    console.log(obj.startX, obj.endX)
    console.log(obj.startY, obj.endY)
  })
   res.render("pages/imageUpload", { title: "Upload Images" });
}

const image_upload_get: HandlerType = (req, res, next) => {
  res.render("pages/imageUpload", { title: "Upload Images" });
};

const image_upload_post: HandlerType = async (req, res, next) => {
  // console.log(req.fileUloadError);
  // console.log(req.file);

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
    const imageTitle = req.body.imagetitle as string;

    // console.log("file uploaded successfully");
    // console.log(req.file);

    // // console.log("Uploading to Cloudinary...");
    // console.log(cloudinary);

    const uploadedImageTitle = imageTitle.replace(/ /g, "-");

    const uploadedFolder = `photo-tagging-app/${uploadedImageTitle}`;

    const uploadedData = await imageStorageService.uploadImage(
      uploadedFolder,
      req.file
    );
    // const uploaded = await cloudinaryService.upload_stream(
    //   "photo-tagging-app/name",
    //   req.file
    // );
    // console.log("Uploaded to Cloudinary:", uploadedData);

    //  save image data in db
    await savePhotoInDB(uploadedImageTitle, uploadedData);

    // THIS WILL CONTINUE TO SAVE THE FILE TO DB OR FILE SYSTEM
    res.redirect("/images");
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
  image_detail_get,
  image_detail_post
};
