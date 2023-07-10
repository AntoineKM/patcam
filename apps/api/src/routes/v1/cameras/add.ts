import { FastifyReply, FastifyRequest } from "fastify";

import CameraModel from "../../../models/Camera";
import { chechAuth } from "../../../utils/auth";

export const post = async (request: FastifyRequest, _reply: FastifyReply) => {
  const body = request.body as any;

  let name = body.name as string;

  if (name === undefined) {
    throw new Error("name is required");
  } else {
    name = name.trim();
  }

  const jwtUser = await chechAuth(request);

  if (!jwtUser) {
    throw new Error("unauthorized");
  }

  const camera = await CameraModel.create({ name });

  return { data: camera };
};
