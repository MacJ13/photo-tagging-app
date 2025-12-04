import PhotoModel from "../models/photo.model";
import { UploadImageResult } from "./image-storage/ImageStorage";

export const savePhotoInDB = async (
  title: string,
  image: UploadImageResult
) => {
  try {
    const photoModel = new PhotoModel({
      title,
      ...image,
    });

    await photoModel.save();
  } catch (err) {
    return new Error("something went wrong. Can not save photo in db");
  }
};

export const getAllMainImagesInDB = async () => {
  try {
    const allImages = await PhotoModel.find({}, "url title");
    return allImages;
  } catch (err) {
    return new Error("something went wrong. Can not get photos");
  }
};
