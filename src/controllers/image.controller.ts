import { CloudinaryStorage } from "../service/image-storage/CloudinaryStorage";
import { ImageStorage, UploadImageObjectResult } from "../service/image-storage/ImageStorage";
import {
  getAllMainImagesInDB,
  getMainImageAssetFolder,
  getMainImageByID,
  savePhotoInDB,
} from "../service/photo.service";
import { savePhotoObjectsInDB } from "../service/photoObject.service";
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
 
  // console.log( "req body ",req.body);

  // console.log("req. files ", req.files)
  // console.log(req.files);

   
    // console.log(uploadImageValues);
    // console.log({length: uploadImageValues.length})

  console.log( "error upload file: ",req.fileUploadErrors) ;
  if(req.fieldValidationError || req.fileUploadErrors) {

    
      const objects = req.body.objects;

      const imageId = req.params.imageId;

      const mainImage = await getMainImageByID(imageId);

       res.render("pages/imageDetail", { title: "Image Detail", mainImage, objects, fieldError: req.fieldValidationError, fileError: req.fileUploadErrors })
       return;
  }

  try {
    const imageId = req.params.imageId;

    const uploadedImages = req.files as { [fieldname: string]: Express.Multer.File[] | undefined };
    const uploadImageValues = Object.values(uploadedImages);    

    const uploadImageTest = uploadImageValues.flat().filter(Boolean) as Express.Multer.File[];

    console.log({uploadImageTest})

    // get asset folder by main image to save object image in proper directory
    const mainImageAssetFolder = await getMainImageAssetFolder(imageId) as string;


    // create array of upload object images to cloudinary
    const uploadObjectImageCloudinary = uploadImageTest.map(async (file) => {
      return await imageStorageService.uploadImage(mainImageAssetFolder, file);
    })

    // upload all object images to cloudinary
    const savedImageCloudinary = await Promise.all(uploadObjectImageCloudinary);
    
    console.log("PHOTOS OBJECTS ARE ADDED TO CLOUDINARY")
    console.log(savedImageCloudinary);

    console.log({mainImageAssetFolder})



    
    
  const imageObjectData: UploadImageObjectResult[] = req.body.objects.map((obj: any, index: number) => {
    const saveImageObj = savedImageCloudinary[index];
    const newObjet = {
      label: obj.filename,
      startX: obj.startX,
      endX: obj.endX,
      endY: obj.endY,
      startY: obj.startY, 
      
      displayName: saveImageObj.displayName,
      url: saveImageObj.url,
      assetFolder: saveImageObj.assetFolder,
      publicId: saveImageObj.publicId,
      bytes: saveImageObj.bytes,
      width: saveImageObj.width,
      height: saveImageObj.height,

    }
    return newObjet;
  })

  console.log({imageObjectData})

  await savePhotoObjectsInDB(imageId, imageObjectData); 
  console.log("PHOTO OBJECTS SAVED IN DB");


  res.redirect(`/images/`);
  //  res.render("pages/imageUpload", { title: "Upload Images" });
  } catch(err) {
    console.log(err);
  }
}

const image_upload_get: HandlerType = (req, res, next) => {
  res.render("pages/imageUpload", { title: "Upload Images" });
};

const image_upload_post: HandlerType = async (req, res, next) => {
  // console.log(req.fileUloadError);
  // console.log(req.file);

  if (req.fieldValidationError || req.fileUploadErrors || !req.file) {
    // let noFileMessageError: string = "";
    // if (!req.file) {
    //   noFileMessageError = "No file uploaded";
    // }
    req.fileUploadErrors = {}

    if(!req.file) {
    
      req.fileUploadErrors["image"] = {
        code: "REQUIRED_FILE",
        field: "image",
        message: "Missing file. Photo is required"
      } 
    }

    return res.render("pages/imageUpload", {
      title: "Upload Images",
      fieldErrors: req.fieldValidationError,
      fieldFileError: req.fileUploadErrors,
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
    console.log({uploadedImageTitle});

    const uploadedFolder = `photo-tagging-app/${uploadedImageTitle}`;

    const uploadedData = await imageStorageService.uploadImage(
      uploadedFolder,
      req.file
    );

    console.log({uploadedData})
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
