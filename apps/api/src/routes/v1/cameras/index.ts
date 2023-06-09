import { FastifyReply, FastifyRequest } from "fastify";

import CameraModel from "../../../models/Camera";
import { checkAuth } from "../../../utils/auth";

export const get = async (request: FastifyRequest, _reply: FastifyReply) => {
  const query = request.query as any;
  const limit = query.limit ? parseInt(query.limit as string, 10) : 10;
  const cursor = query.cursor ? parseInt(query.limit as string, 10) : 0;

  const jwtUser = await checkAuth(request);

  if (!jwtUser) {
    throw new Error("unauthorized");
  }

  const cameras = await CameraModel.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(cursor);

  return { data: cameras, limit, cursor };
};
