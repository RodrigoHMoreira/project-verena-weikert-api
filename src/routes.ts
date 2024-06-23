import { Router } from "express";
import {
  createUser,
  deleteUser,
  login,
  updateUser,
} from "./controllers/authController";
import { getUsers, getUserById } from "./controllers/userController";
import { authMiddleware } from "./middlewares/authMiddlewares";

const router = Router();

router.post("/login", login);
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/users", authMiddleware, createUser);
router.put("/users/:id", authMiddleware, updateUser);
router.delete("/users/:id", authMiddleware, deleteUser);

export default router;
