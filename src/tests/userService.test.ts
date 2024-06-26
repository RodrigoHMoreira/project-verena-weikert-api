import { User } from "../interfaces/User";
import { userRepository } from "../repositories/userRepository";
import UserService from "../services/userService";

jest.mock("../repositories/userRepository", () => ({
  userRepository: {
    findAll: jest.fn(() => Promise.resolve([])),
    countAll: jest.fn(() => Promise.resolve()),
    findById: jest.fn(() => Promise.resolve({})),
    create: jest.fn((data: User) => Promise.resolve({ ...data, cd_user: 1 })),
    update: jest.fn((id: number, data: Partial<User>) =>
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
    const mockUsers: User[] = [
      {
        cd_user: 2,
        nm_user: "Maria Silva",
        ds_email: "silvamaria@email.com",
        nb_telephone: "(19) 9999-9999",
        url_image: "http://url...",
        hs_password: "",
      },
      {
        cd_user: 3,
        nm_user: "João Santos",
        ds_email: "snatosJoao@email.com",
        nb_telephone: "(19) 9999-9999",
        url_image: "http://url...",
        hs_password: "",
      },
    ];

    const page = 1;
    const limit = 10;
    const search = undefined;

    (userRepository.findAll as jest.Mock).mockResolvedValue(mockUsers);
    (userRepository.countAll as jest.Mock).mockResolvedValue(mockUsers.length);

    const userService = new UserService();
    const { items, totalPages } = await userService.getUsers(
      page,
      limit,
      search
    );

    expect(items).toEqual(mockUsers);
    expect(totalPages).toEqual(1);
    expect(userRepository.findAll).toHaveBeenCalledTimes(1);
    expect(userRepository.countAll).toHaveBeenCalledTimes(1);
  });

  it("should get user by Id successfully", async () => {
    const mockUser: User | null = {
      cd_user: 2,
      nm_user: "Maria Silva",
      ds_email: "silvamaria@email.com",
      nb_telephone: "(19) 9999-9999",
      url_image: "http://url...",
      hs_password: "",
    };

    (userRepository.findById as jest.Mock).mockResolvedValue(mockUser);

    const userService = new UserService();
    const users = await userService.getUserById(2);

    expect(users).toEqual(mockUser);
    expect(userRepository.findById).toHaveBeenCalledTimes(1);
  });

  it("should create a new user successfully", async () => {
    const userData: User = {
      nm_user: "José Souza",
      ds_email: "souzajose@email.com",
      nb_telephone: "(19) 9999-9999",
      url_image: "http://url...",
      hs_password: "5588",
    };
    const newUser: User = { ...userData, cd_user: 1 };

    (userRepository.create as jest.Mock).mockResolvedValue(newUser);

    const userService = new UserService();
    const createdUser = await userService.createUser(userData);

    expect(createdUser).toEqual(newUser);
    expect(userRepository.create).toHaveBeenCalledTimes(1);
    expect(userRepository.create).toHaveBeenCalledWith(userData);
  });

  it("should update an existing user successfully", async () => {
    const userId = 2;
    const updatedData: Partial<User> = {
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
