import { userRepository } from "../repositories/userRepository";
import { UserDTO } from "../interfaces/userDTO";
import UserService from "./userService";

jest.mock("../repositories/userRepository", () => ({
  userRepository: {
    findAll: jest.fn(() => Promise.resolve([])),
    create: jest.fn((data: UserDTO) =>
      Promise.resolve({ ...data, cd_user: 1 })
    ),
    update: jest.fn((id: number, data: Partial<UserDTO>) =>
      Promise.resolve({ ...data, cd_user: id })
    ),
    delete: jest.fn((id: number) => Promise.resolve()),
  },
}));

describe("UserService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should get users successfully", async () => {
    const mockUsers: UserDTO[] = [
      {
        cd_user: 2,
        nm_user: "Maria Silva",
        ds_email: "silvamaria@email.com",
      },
      {
        cd_user: 3,
        nm_user: "João Santos",
        ds_email: "snatosJoao@email.com",
      },
    ];

    (userRepository.findAll as jest.Mock).mockResolvedValue(mockUsers);

    const userService = new UserService();
    const users = await userService.getUsers();

    expect(users).toEqual(mockUsers);
    expect(userRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it("should create a new user successfully", async () => {
    const userData: UserDTO = {
      nm_user: "José Souza",
      ds_email: "souzajose@email.com",
    };
    const newUser: UserDTO = { ...userData, cd_user: 1 };

    (userRepository.create as jest.Mock).mockResolvedValue(newUser);

    const userService = new UserService();
    const createdUser = await userService.createUser(userData);

    expect(createdUser).toEqual(newUser);
    expect(userRepository.create).toHaveBeenCalledTimes(1);
    expect(userRepository.create).toHaveBeenCalledWith(userData);
  });

  it("should update an existing user successfully", async () => {
    const userId = 2;
    const updatedData: Partial<UserDTO> = {
      cd_user: 2,
      nm_user: "Maria Silva",
      ds_email: "silvamaria@email.com",
    };

    const updatedUser = { ...updatedData, cd_user: userId };

    (userRepository.update as jest.Mock).mockResolvedValue(updatedUser);

    const userService = new UserService();
    const updatedUserResult = await userService.updateUser(userId, updatedData);

    expect(updatedUserResult).toEqual(updatedUser);
    expect(userRepository.update).toHaveBeenCalledTimes(1);
    expect(userRepository.update).toHaveBeenCalledWith(userId, updatedData);
  });

  it("should delete an existing user successfully", async () => {
    const userId = 3;

    (userRepository.delete as jest.Mock).mockResolvedValue(undefined);

    const userService = new UserService();
    await userService.deleteUser(userId);

    expect(userRepository.delete).toHaveBeenCalledTimes(1);
    expect(userRepository.delete).toHaveBeenCalledWith(userId);
  });
});
