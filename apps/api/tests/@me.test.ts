import { FastifyReply, FastifyRequest } from "fastify";
import { mocked } from "ts-jest/utils";

import UserModel from "../src/models/User";
import { get } from "../src/routes/v1/users/@me";
import { JWTUser } from "../src/types";
import { checkAuth } from "../src/utils/auth";

jest.mock("../src/models/User");
jest.mock("../src/utils/auth");

const mockedUserModel = mocked(UserModel);
const mockedCheckAuth = mocked(checkAuth);

describe("get", () => {
  let request: FastifyRequest;
  let reply: FastifyReply;

  beforeEach(() => {
    request = {} as FastifyRequest;
    reply = {} as FastifyReply;
  });

  it("should throw an error if user is not authenticated", async () => {
    mockedCheckAuth.mockResolvedValueOnce(null as unknown as JWTUser);

    await expect(get(request, reply)).rejects.toThrow("unauthorized");
  });

  it("should throw an error if user is not found", async () => {
    const jwtUser = { _id: "user_id" };
    mockedCheckAuth.mockResolvedValueOnce(jwtUser as unknown as JWTUser);
    mockedUserModel.findOne.mockResolvedValueOnce(null);

    await expect(get(request, reply)).rejects.toThrow("user not found");
  });
});
