import { Request, Response } from "express";
import {
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/authController";
import { getUserById, getUsers } from "../controllers/userController";

import jwt from "jsonwebtoken";

jest.mock("../services/userService", () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => {
      return {
        getUsers: jest.fn().mockResolvedValue({
          items: [
            {
              cd_user: 1,
              nm_user: "Maria Silva",
              ds_email: "silvamaria@email.com",
            },
            {
              cd_user: 2,
              nm_user: "João Santos",
              ds_email: "snatosJoao@email.com",
            },
          ],
          totalPages: 1,
        }),
        getUserById: jest.fn().mockResolvedValue({
          cd_user: 2,
          nm_user: "João Santos",
          ds_email: "snatosJoao@email.com",
        }),
        createUser: jest
          .fn()
          .mockImplementation((data) =>
            Promise.resolve({ ...data, cd_user: 3 })
          ),
        updateUser: jest
          .fn()
          .mockImplementation((id, data) =>
            Promise.resolve({ ...data, cd_user: id })
          ),
        deleteUser: jest.fn().mockResolvedValue(undefined),
      };
    }),
  };
});

describe("User Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  it("should get users successfully", async () => {
    (req.query = { page: "1", limit: "10", search: "John" }),
      await getUsers(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith({
      items: [
        {
          cd_user: 1,
          ds_email: "silvamaria@email.com",
          nm_user: "Maria Silva",
        },
        {
          cd_user: 2,
          ds_email: "snatosJoao@email.com",
          nm_user: "João Santos",
        },
      ],
      totalPages: 1,
    });
  });

  it("should get user by Id successfully", async () => {
    req.params = { id: "1" };

    await getUserById(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith({
      cd_user: 2,
      nm_user: "João Santos",
      ds_email: "snatosJoao@email.com",
    });
  });

  it("should create a new user successfully", async () => {
    req.body = {
      ds_email: "bruno.souza@example.com",
      hs_password: "123",
    };

    const token = jwt.sign({ user_id: "someUserId" }, process.env.JWT_SECRET!);
    req.headers = { Authorization: `Bearer ${token}` };

    await createUser(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        ds_email: "bruno.souza@example.com",
      })
    );
  });

  it("should update an existing user successfully", async () => {
    req.params = { id: "1" };
    req.body = {
      nm_user: "Ana Maria Silva",
      ds_email: "silvamariaanaemail@example.com",
    };

    await updateUser(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        nm_user: "Ana Maria Silva",
        ds_email: "silvamariaanaemail@example.com",
      })
    );
  });

  it("should delete an existing user successfully", async () => {
    req.params = { id: "1" };

    await deleteUser(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith({
      message: "User deleted successfully",
    });
  });
});
