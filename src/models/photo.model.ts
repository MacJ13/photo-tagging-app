import { Schema, model } from "mongoose";

const PhotoSchema = new Schema({
  url: { type: String, required: true },
  title: { type: String, required: true },
  objects: [{ type: Schema.Types.ObjectId, ref: "photoObject" }],
  uploadedAt: { type: Date, default: Date.now },
});

const PhotoModel = model("photo", PhotoSchema);
export default PhotoModel;
