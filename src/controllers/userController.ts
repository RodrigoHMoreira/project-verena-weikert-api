import { Request, Response } from "express";
import { UserDTO } from "../interfaces/userDTO";
import UserService from "../services/userService";
const userService = new UserService();

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users: UserDTO[] = await userService.getUsers();

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const data: UserDTO = req.body;
    const newUser = await userService.createUser(data);

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
