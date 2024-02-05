import { Router } from "express";
import {
  addNewUser,
  deleteUser,
  getOneUser,
  getUsers,
  signIn,
} from "../controllers/userController.js";
import { authenticate, isAdmin } from "../middleware/authenticate.js";

export const userRoutes = Router();

userRoutes.post("/signup", addNewUser);
userRoutes.post("/login", signIn);
userRoutes.get("/", getUsers);
userRoutes.get("/one", getOneUser);
userRoutes.delete("/delete", authenticate, isAdmin, deleteUser);
