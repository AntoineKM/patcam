import { Schema, model } from "mongoose";

import { Camera } from "../types";

const cameraSchema = new Schema<Camera>({
  name: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});

const CameraModel = model("Camera", cameraSchema);

export default CameraModel;
