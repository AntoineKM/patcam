import bcrypt from "bcryptjs";
import { FastifyReply, FastifyRequest } from "fastify";

import UserModel from "../../../models/User";
import { Role } from "../../../types";
import { generateToken } from "../../../utils/auth";

export const post = async (request: FastifyRequest, _reply: FastifyReply) => {
  const body = request.body as any;

  let email = body.email as string;
  let password = body.password as string;

  if (email === undefined) {
    throw new Error("email is required");
  } else {
    email = email.trim();
  }

  if (password === undefined) {
    throw new Error("password is required");
  } else {
    password = password.trim();
    password = await bcrypt.hash(password, 12);
  }

  const userCount = await UserModel.countDocuments();

  if (userCount === 0) {
    const user = await UserModel.create({
      email,
      password,
      role: Role.SuperAdmin,
    });

    const token = generateToken(user);
    const { password: _password, ...userWithoutPassword } = user.toObject();

    return { data: { ...userWithoutPassword, token } };
  } else {
    const userExists = await UserModel.findOne({ email });

    if (userExists) {
      if (userExists.password) {
        const isMatch = await bcrypt.compare(password, userExists.password);

        if (!isMatch) {
          throw new Error("invalid password");
        }

        const token = generateToken(userExists);
        const { password: _password, ...userWithoutPassword } =
          userExists.toObject();

        return { data: { ...userWithoutPassword, token } };
      } else {
        userExists.password = password;
        await userExists.save();

        const token = generateToken(userExists);

        const { password: _password, ...userWithoutPassword } =
          await userExists.toObject();

        return { data: { ...userWithoutPassword, token } };
      }
    } else {
      throw new Error("you must be invited by a super admin");
    }
  }
};
