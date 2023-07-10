import { FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";

import { SECRET_KEY } from "../services/app";
import { JWTUser, Role, User } from "../types";

export const chechAuth = async (req: FastifyRequest): Promise<JWTUser> => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error("unauthorized");
  }

  const token = authHeader.replace("Bearer ", "");

  const user = checkTokenValidity(token);

  return user;
};

export const checkTokenValidity = (token: string): JWTUser => {
  token = token.replace("Bearer ", "");
  try {
    const user = jwt.verify(token, SECRET_KEY) as JWTUser;
    return user;
  } catch (_err) {
    throw new Error("invalid token");
  }
};

export const hasRole = (user: JWTUser, role: Role) => {
  if (user.role === role) {
    return true;
  } else {
    throw new Error("unauthorized");
  }
};

export const generateToken = (user: User) => {
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
