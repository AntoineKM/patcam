// Import des dépendances
import { FastifyReply, FastifyRequest } from "fastify";

// Import du modèle utilisateur et de la fonction de vérification de l'authentification
import UserModel from "../../../models/User";
import { checkAuth } from "../../../utils/auth";

// Fonction pour gérer la requête GET
export const get = async (request: FastifyRequest, _reply: FastifyReply) => {
  // Vérification de l'authentification de l'utilisateur
  const jwtUser = await checkAuth(request);

  // Vérification de la présence de l'utilisateur
  if (!jwtUser) {
    throw new Error("unauthorized");
  }

  // Recherche de l'utilisateur dans la base de données
  const user = await UserModel.findOne({ _id: jwtUser._id });

  // Vérification de la présence de l'utilisateur
  if (!user) {
    throw new Error("user not found");
  }

  // Renvoi des données utilisateur
  return { data: user };
};
