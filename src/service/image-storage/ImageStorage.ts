// Interface / abstraction for image storage services
export interface UploadImageResult {
  publicId: string;
  url: string;
  width: number;
  height: number;
  assetFolder: string;
  displayName: string;
  bytes: number;
}

export interface ImageStorage {
  uploadImage(
    folder: string,
    file: Express.Multer.File
  ): Promise<UploadImageResult>;
}
