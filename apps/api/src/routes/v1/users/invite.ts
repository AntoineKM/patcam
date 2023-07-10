import { FastifyReply, FastifyRequest } from "fastify";

import UserModel from "../../../models/User";
import { Role } from "../../../types";

export const post = async (request: FastifyRequest, _reply: FastifyReply) => {
  const body = request.body as any;

  let email = body.email as string;

  if (email === undefined) {
    throw new Error("email is required");
  } else {
    email = email.trim();
  }

  // TODO: check if the user is a super admin

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
