// Import des dépendances
import { Schema, model } from "mongoose";

// Import des types
import { User } from "../types";

// Définition du schéma utilisateur
const userSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false, select: false },
  role: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});

// Création du modèle utilisateur basé sur le schéma
const UserModel = model("user", userSchema);

// Export du modèle utilisateur
export default UserModel;
