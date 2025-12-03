import { UploadApiResponse } from "cloudinary";
import cloudinary from "../../config/cloudinary.config";
import { ImageStorage, UploadImageResult } from "./ImageStorage";

export class CloudinaryStorage implements ImageStorage {
  public async uploadImage(
    folder: string,
    file: Express.Multer.File
  ): Promise<UploadImageResult> {
    return await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: folder,
          resource_type: "image",
          public_id: file.originalname,
        },
        async (error, result) => {
          if (error) {
            reject(error);
          } else {
            // console.log({result})

            const apiResult = result as UploadApiResponse;
            const uploadResult: UploadImageResult = {
              publicId: apiResult.public_id,
              url: apiResult.secure_url,
              width: apiResult.width,
              height: apiResult.height,
              assetFolder: apiResult.asset_folder,
              displayName: apiResult.display_name,
              bytes: apiResult.bytes,
            };
            resolve(uploadResult);
          }
        }
      );
      stream.end(file.buffer);
    });
  }
}
