import { Schema, model } from "mongoose";

// const photoObjectSchema = new Schema({
//   label: { type: String, required: true },
//   boundingBox: {
//     top: { type: Number, required: true },
//     left: { type: Number, required: true },
//     width: { type: Number, required: true },
//     height: { type: Number, required: true },
//   },
//   photo: { type: Schema.Types.ObjectId, ref: "photo", required: true },
//   url: { type: String, required: true },
// });

const photoObjectSchema = new Schema({
  label: { type: String, required: true },
  
  uploadedAt: {type: Date, default: Date.now },

  startX: {type: Number, required: true},
  endX: {type: Number, required: true},
  startY: {type: Number, required: true},
  endY: {type: Number, required: true},

  displayName: {type: String, required: true},
  url: { type: String, required: true },
  assetFolder: {type: String},
  publicId: {type: String},
  bytes: {type: Number},
  
  width: {type: Number},
  height: {type: Number},


  photo: {type: Schema.Types.ObjectId, ref: "photo", required: true},

  // boundingBox: {
  //   top: { type: Number, required: true },
  //   left: { type: Number, required: true },
  //   width: { type: Number, required: true },
  //   height: { type: Number, required: true },
  // },
});

const PhotoObjectModel = model("photoObject", photoObjectSchema);
export default PhotoObjectModel;
