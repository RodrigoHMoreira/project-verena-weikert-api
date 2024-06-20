import { PrismaClient } from "@prisma/client";
import { UserRepository } from "./userRepository";
import { UserDTO } from "../interfaces/userDTO";

jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn(() => ({
    user: {
      findMany: jest.fn(() =>
        Promise.resolve([
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
        ])
      ),
      create: jest.fn((data: UserDTO) =>
        Promise.resolve({ ...data, cd_user: 1 })
      ),
      update: jest.fn(),
      delete: jest.fn(),
    },
  })),
}));

describe("UserRepository", () => {
  let prisma = new PrismaClient();
  let userRepository = new UserRepository();

  beforeEach(() => {
    jest.clearAllMocks();
    userRepository = new UserRepository();
  });

  it("should find all users", async () => {
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

    (prisma.user.findMany as jest.Mock).mockResolvedValue(mockUsers);

    const users = await userRepository.findAll();

    expect(users).toEqual(mockUsers);
  });
});
