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

export interface UploadImageObjectResult {
  label: string;
  startX: number;
  endX: number;
  startY: number;
  endY: number;

  displayName: string;
  url: string;
  assetFolder: string;
  publicId: string;
  bytes: number;

  width: number;
  height: number;
}