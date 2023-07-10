import jwt from "jsonwebtoken";

import { SECRET_KEY } from "../services/app";
import { User } from "../types";

const generateToken = (user: User) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    SECRET_KEY,
    { expiresIn: "30d" }
  );
};

export default generateToken;
