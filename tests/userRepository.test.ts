import { PrismaClient } from "@prisma/client";
import { UserRepository } from "../src/repositories/userRepository";
import { UserDTO } from "../src/interfaces/userDTO";

const prisma = new PrismaClient();
const userRepository = new UserRepository();

jest.mock("@prisma/client", () => {
  const mockPrisma = {
    users: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mockPrisma) };
});

describe("UserRepository", () => {
  let mockUser: UserDTO;
  let mockUsers: UserDTO[];

  beforeAll(() => {
    (mockUser = {
      cd_user: 2,
      nm_user: "Maria Silva",
      ds_email: "silvamaria@email.com",
      nb_telephone: "(19) 9999-9999",
      url_image: "http://url...",
      tp_user: "guest",
    }),
      (mockUsers = [
        {
          cd_user: 2,
          nm_user: "Maria Silva",
          ds_email: "silvamaria@email.com",
          nb_telephone: "(19) 9999-9999",
          url_image: "http://url...",
          tp_user: "guest",
        },
      ]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should find all users", async () => {
    (prisma.users.findMany as jest.Mock).mockResolvedValue(mockUsers);

    const users = await userRepository.findAll();

    expect(prisma.users.findMany).toHaveBeenCalledTimes(1);
    expect(users).toEqual(mockUsers);
  });

  it("should find user by id", async () => {
    (prisma.users.findUnique as jest.Mock).mockResolvedValue(mockUser);

    const users = await userRepository.findById(2);

    expect(prisma.users.findUnique).toHaveBeenCalledTimes(1);
    expect(users).toEqual(mockUser);
  });

  it("should create a new user", async () => {
    (prisma.users.create as jest.Mock).mockResolvedValue(mockUser);

    const newUser = await userRepository.create(mockUser);

    expect(newUser).toEqual({
      nm_user: newUser.nm_user,
      ds_email: newUser.ds_email,
      nb_telephone: newUser.nb_telephone,
      url_image: newUser.url_image,
      tp_user: newUser.tp_user,
    });

    expect(prisma.users.create).toHaveBeenCalledWith({
      data: {
        nm_user: mockUser.nm_user,
        ds_email: mockUser.ds_email,
        nb_telephone: mockUser.nb_telephone,
        url_image: mockUser.url_image,
        tp_user: mockUser.tp_user,
      },
    });
    expect(prisma.users.create).toHaveBeenCalledTimes(1);
  });

  it("should update an existing user", async () => {
    const updatedUser = { ...mockUser, nm_user: "José Santos" };
    (prisma.users.update as jest.Mock).mockResolvedValue(updatedUser);

    const result = await userRepository.update(
      mockUser.cd_user ? mockUser.cd_user : mockUsers.length + 1,
      {
        nm_user: "José Santos",
      }
    );

    expect(result).toEqual(updatedUser);
    expect(prisma.users.update).toHaveBeenCalledWith({
      where: { cd_user: mockUser.cd_user },
      data: { nm_user: "José Santos", ds_email: undefined },
    });
    expect(prisma.users.update).toHaveBeenCalledTimes(1);
  });

  it("should delete a user", async () => {
    (prisma.users.delete as jest.Mock).mockResolvedValue({});

    await userRepository.delete(
      mockUser.cd_user ? mockUser.cd_user : mockUsers.length + 1
    );

    expect(prisma.users.delete).toHaveBeenCalledWith({
      where: { cd_user: mockUser.cd_user },
    });
    expect(prisma.users.delete).toHaveBeenCalledTimes(1);
  });
});
