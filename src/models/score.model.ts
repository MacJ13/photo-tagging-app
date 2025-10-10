import { Schema, model } from "mongoose";

const ScoreSchema = new Schema({
  username: { type: String, required: true },
  gameTimeLength: { type: Number, required: true }, // in milliseconds
  gameDate: { type: Date, required: true },
  photo: { type: Schema.Types.ObjectId, ref: "photo", required: true },
});

const ScoreModel = model("score", ScoreSchema);
export default ScoreModel;
