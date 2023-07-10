import dotenv from "dotenv-flow";

dotenv.config({
  silent: true,
});

export const SECRET_KEY = process.env.SECRET_KEY || "secretKey";
