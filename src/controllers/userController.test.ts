import { Request, Response } from "express";
import { createUser, deleteUser, getUsers, updateUser } from "./userController";

jest.mock("../services/userService", () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => {
      return {
        getUsers: jest.fn().mockResolvedValue([
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
        ]),
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
    await getUsers(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith([
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
    ]);
  });

  it("should create a new user successfully", async () => {
    req.body = {
      nm_user: "José Souza",
      ds_email: "souzajose@email.com",
    };

    await createUser(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        nm_user: "José Souza",
        ds_email: "souzajose@email.com",
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
