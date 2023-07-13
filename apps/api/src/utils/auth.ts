// Import des dépendances
import { FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";

// Import des services et des types
import { SECRET_KEY } from "../services/app";
import { JWTUser, Role, User } from "../types";

// Fonction pour vérifier l'authentification de l'utilisateur
export const checkAuth = async (req: FastifyRequest): Promise<JWTUser> => {
  const authHeader = req.headers.authorization;

  // Vérification de la présence de l'en-tête d'authentification
  if (!authHeader) {
    throw new Error("unauthorized");
  }

  // Extraction du token du header d'authentification
  const token = authHeader.replace("Bearer ", "");

  // Vérification de la validité du token et récupération de l'utilisateur
  const user = checkTokenValidity(token);

  return user;
};

// Fonction pour vérifier la validité du token
export const checkTokenValidity = (token: string): JWTUser => {
  token = token.replace("Bearer ", "");
  try {
    // Vérification du token à l'aide de la clé secrète
    const user = jwt.verify(token, SECRET_KEY) as JWTUser;
    return user;
  } catch (_err) {
    throw new Error("invalid token");
  }
};

export const hasRole = (user: JWTUser, role: Role) => {
  if (user.role === role) {
    return true;
  } else {
    throw new Error("unauthorized");
  }
};

export const generateToken = (user: User) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    SECRET_KEY,
    { expiresIn: "30d" }
  );
};
