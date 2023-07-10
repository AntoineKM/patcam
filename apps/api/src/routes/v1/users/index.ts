import { FastifyReply, FastifyRequest } from "fastify";

import UserModel from "../../../models/User";

export const get = async (request: FastifyRequest, _reply: FastifyReply) => {
  const query = request.query as any;
  const limit = query.limit ? parseInt(query.limit as string, 10) : 10;
  const cursor = query.cursor ? parseInt(query.limit as string, 10) : 0;

  const users = await UserModel.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(cursor);

  return { data: users, limit, cursor };
};
