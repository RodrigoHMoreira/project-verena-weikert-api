import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import UserService from "../services/userService";
import { UserDTO } from "../interfaces/userDTO";

const userService = new UserService();
const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
  try {
    const data: UserDTO = req.body;
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(data.hs_password, salt);
    const newUser = await userService.createUser({
      ...data,
      hs_password: hashedPassword,
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const data: Partial<UserDTO> = req.body;
    const updatedUser = await userService.updateUser(Number(id), data);

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: `Failed to update user: ${error}` });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await userService.deleteUser(Number(id));

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { ds_email, hs_password } = req.body;

  try {
    const user = await prisma.users.findUnique({ where: { ds_email } });

    if (!user) {
      return res.status(400).send({ error: "Invalid e-mail." });
    }

    const validPassword = await bcrypt.compare(hs_password, user.hs_password);
    if (!validPassword) {
      return res.status(400).send({ error: "Invalid password." });
    }

    const token = jwt.sign({ id: user.cd_user }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    res.send({ token });
  } catch (error) {
    res.status(500).send(error);
  }
};
