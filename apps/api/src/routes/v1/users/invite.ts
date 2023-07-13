import { FastifyReply, FastifyRequest } from "fastify";

import UserModel from "../../../models/User";
import { Role } from "../../../types";
import { checkAuth, hasRole } from "../../../utils/auth";

export const post = async (request: FastifyRequest, _reply: FastifyReply) => {
  const body = request.body as any;

  let email = body.email as string;

  if (email === undefined) {
    throw new Error("email is required");
  } else {
    email = email.trim();
  }

  const jwtUser = await checkAuth(request);

  if (!jwtUser || !hasRole(jwtUser, Role.SuperAdmin)) {
    throw new Error("unauthorized");
  }

  const userExists = await UserModel.findOne({ email });

  if (userExists) {
    throw new Error("user already exists");
  } else {
    const user = await UserModel.create({
      email,
      role: Role.Admin,
    });

    return { data: user };
  }
};
