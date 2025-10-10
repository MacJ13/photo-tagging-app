import { Schema, model } from "mongoose";

const photoObjectSchema = new Schema({
  label: { type: String, required: true },
  boundingBox: {
    top: { type: Number, required: true },
    left: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
  },
  photo: { type: Schema.Types.ObjectId, ref: "photo", required: true },
  url: { type: String, required: true },
});

const PhotoObjectModel = model("photoObject", photoObjectSchema);
export default PhotoObjectModel;
