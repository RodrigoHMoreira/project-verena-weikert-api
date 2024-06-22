import { Router } from "express";
import {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  getUserById,
} from "./controllers/userController";

const router = Router();

router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;
