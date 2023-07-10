import { FastifyReply, FastifyRequest } from "fastify";

import CameraModel from "../../../models/Camera";

export const post = async (request: FastifyRequest, _reply: FastifyReply) => {
  const body = request.body as any;

  let name = body.name as string;

  if (name === undefined) {
    throw new Error("name is required");
  } else {
    name = name.trim();
  }

  // TODO: check if the user is an admin

  const camera = await CameraModel.create({ name });

  return { data: camera };
};
