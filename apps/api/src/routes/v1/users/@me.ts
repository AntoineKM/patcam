import { FastifyReply, FastifyRequest } from "fastify";

import UserModel from "../../../models/User";
import { chechAuth } from "../../../utils/auth";

export const get = async (request: FastifyRequest, _reply: FastifyReply) => {
  const jwtUser = await chechAuth(request);

  if (!jwtUser) {
    throw new Error("unauthorized");
  }

  const user = await UserModel.findOne({ _id: jwtUser._id });

  return { data: user };
};
