import { Schema, model } from "mongoose";

import { User } from "../types";

const userSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false, select: false },
  role: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});

const UserModel = model("user", userSchema);

export default UserModel;
