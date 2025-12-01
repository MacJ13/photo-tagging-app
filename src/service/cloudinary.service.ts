import cloudinary from "../config/cloudinary.config";

const upload_stream = async (folder: string, file: Express.Multer.File) => {
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
          resolve(result);
        }
      }
    );
    stream.end(file.buffer);
  });
};

export default { upload_stream };
