import { UserDTO } from "../interfaces/userDTO";
import { userRepository } from "../repositories/userRepository";

export default class UserService {
  async getUsers(): Promise<UserDTO[]> {
    try {
      const users: UserDTO[] = await userRepository.findAll();
      return users;
    } catch (error) {
      throw new Error(`Error getting users: ${error}`);
    }
  }

  async getUserById(id: number): Promise<UserDTO | null> {
    try {
      const user: UserDTO | null = await userRepository.findById(id);
      return user;
    } catch (error) {
      throw new Error(`Error getting user: ${error}`);
    }
  }

  async createUser(data: UserDTO): Promise<UserDTO> {
    try {
      const newUser = await userRepository.create(data);
      return newUser;
    } catch (error) {
      throw new Error(`Error creating user: ${error}`);
    }
  }

  async updateUser(id: number, data: Partial<UserDTO>): Promise<UserDTO> {
    try {
      const updatedUser = await userRepository.update(id, data);
      return updatedUser;
    } catch (error) {
      throw new Error(`Error updating user: ${error}`);
    }
  }

  async deleteUser(id: number): Promise<void> {
    try {
      await userRepository.delete(id);
    } catch (error) {
      throw new Error(`Error deleting user: ${error}`);
    }
  }
}
