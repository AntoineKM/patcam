// Import des dépendances
import dotenv from "dotenv-flow";
import fastify from "fastify";
import mongoose from "mongoose";
import NodeMediaServer from "node-media-server";

import routes from "./routes";
import { databaseUri } from "./services/mongodb";
import Log from "./utils/log";
import { name, version } from "../package.json";

// Chargement des fichiers de variables d'environnement
dotenv.config({
  silent: true,
});

// Configuration du serveur de streaming RTMP
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

// Configuration du serveur Fastify
const fastifyConfig = {
  logger: true,
};

// Fonction principale asynchrone
const main = async () => {
  // Affichage des fichiers de variables d'environnement chargés
  Log.wait("loading env files");
  dotenv
    .listDotenvFiles(".", {
      node_env: process.env.NODE_ENV,
    })
    .forEach((file: string) => Log.info(`loaded env from ${file}`));

  // Initialisation de l'application Fastify et du serveur de streaming NodeMediaServer
  const app = fastify(fastifyConfig);
  const nms = new NodeMediaServer(rmtpConfig);

  // Enregistrement des différentes routes de l'application
  app.get("/", async () => {
    return {
      name,
      version,
      repo: "https://github.com/AntoineKM/patcam",
    };
  });
  app.register(routes);

  try {
    // Démarrage du serveur de streaming RTMP
    nms.run();

    // Connexion à la base de données MongoDB
    Log.wait("connecting to mongodb...");
    await mongoose.connect(databaseUri);
    Log.event("connected to mongodb");

    // Démarrage du serveur Fastify
    const address = await app.listen(
      process.env.PORT || 8000,
      process.env.NODE_ENV === "production" ? "0.0.0.0" : "localhost"
    );
    Log.ready(`started server on ${address}`);
  } catch (err) {
    // Gestion des erreurs
    app.log.error(err);
    process.exit(1);
  }
};

// Appel de la fonction principale
main();
