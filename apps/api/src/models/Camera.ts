import { Schema, model } from "mongoose";

const cameraSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
});

const Camera = model("Camera", cameraSchema);

export default Camera;
