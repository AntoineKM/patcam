import fastify from "fastify";
import NodeMediaServer from "node-media-server";

const rmtpConfig = {
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

const app = fastify(fastifyConfig);
const nms = new NodeMediaServer(rmtpConfig);

// Declare a route
app.get("/", async () => {
  return { hello: "world" };
});

// Run the server!
const main = async () => {
  try {
    nms.run();
    await app.listen({ port: 3000 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

main();
