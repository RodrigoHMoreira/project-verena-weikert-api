import { UserDTO } from "../interfaces/userDTO";
import { userRepository } from "../repositories/userRepository";

export default class UserService {
  async getUsers(
    page: number,
    limit: number,
    search?: string
  ): Promise<{ items: UserDTO[]; totalPages: number }> {
    try {
      const offset = (page - 1) * limit;
      const users = await userRepository.findAll(offset, limit, search);

      const totalCount = await userRepository.countAll(search);
      const totalPages = Math.ceil(totalCount / limit);

      return { items: users, totalPages };
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
