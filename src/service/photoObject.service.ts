import PhotoObjectModel from "../models/photoObject.model";
import { UploadImageObjectResult } from "./image-storage/ImageStorage";

export const savePhotoObjectsInDB = async (photoId: string, photoObjectsData:UploadImageObjectResult[]) => {

    try {
        const photoObjectModels = photoObjectsData.map( (objData) => { 

            return new PhotoObjectModel ({
                photo: photoId,
                ...objData
            });
        });

        await Promise.all( photoObjectModels.map( async (model) => await model.save() ) );

        
    }   catch(err) {
        return new Error("something went wrong. Can not save photo objects in db");
    }

}