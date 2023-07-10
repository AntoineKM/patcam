import jwt from "jsonwebtoken";

import { SECRET_KEY } from "../services/app";
import { User } from "../types";

const generateToken = (user: User) => {
  return jwt.sign(
    {
      email: user.email,
      role: user.role,
    },
    SECRET_KEY,
    { expiresIn: "30d" }
  );
};

export default generateToken;
