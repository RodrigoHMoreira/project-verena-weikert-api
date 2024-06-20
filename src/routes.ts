import { Router } from "express";
import {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
} from "./controllers/userController";

const router = Router();

router.get("/users", getUsers);
router.post("/users", createUser);
router.put("/users/:id", deleteUser);
router.delete("/users/:id", updateUser);

export default router;
