import dotenv from "dotenv-flow";
import fastify from "fastify";
import mongoose from "mongoose";
import NodeMediaServer from "node-media-server";

import routes from "./routes";
import { databaseUri } from "./services/mongodb";
import Log from "./utils/log";
import { name, version } from "../package.json";

dotenv.config({
  silent: true,
});

const rmtpConfig = {
  logType: 3,
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
  http: {
    mediaroot: "./media",
    port: 8000,
    allow_origin: "*",
  },
};

const fastifyConfig = {
  logger: true,
};

const main = async () => {
  Log.wait("loading env files");
  dotenv
    .listDotenvFiles(".", {
      node_env: process.env.NODE_ENV,
    })
    .forEach((file: string) => Log.info(`loaded env from ${file}`));

  const app = fastify(fastifyConfig);
  const nms = new NodeMediaServer(rmtpConfig);

  app.get("/", async () => {
    return {
      name,
      version,
      repo: "https://github.com/AntoineKM/patcam",
    };
  });
  app.register(routes);

  try {
    nms.run();
    Log.wait("connecting to mongodb...");
    await mongoose.connect(databaseUri);
    Log.event("connected to mongodb");

    const address = await app.listen(
      process.env.PORT || 8000,
      process.env.NODE_ENV === "production" ? "0.0.0.0" : "localhost"
    );
    Log.ready(`started server on ${address}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

main();
