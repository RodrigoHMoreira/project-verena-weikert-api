import { Request, Response } from "express";
import { User } from "../interfaces/User";
import UserService from "../services/userService";
const userService = new UserService();

export const getUsers = async (req: Request, res: Response) => {
  const { page = 1, limit = 6, search = "" } = req.query;

  try {
    const users: { items: User[]; totalPages: number } =
      await userService.getUsers(Number(page), Number(limit), String(search));

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch users: ${error}` });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user: User | null = await userService.getUserById(Number(id));

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch user: ${error}` });
  }
};
