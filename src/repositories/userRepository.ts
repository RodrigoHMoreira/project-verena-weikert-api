import { PrismaClient } from "@prisma/client";
import { UserDTO } from "../interfaces/userDTO";

const prisma = new PrismaClient();

export class UserRepository {
  async findAll(): Promise<UserDTO[]> {
    const users = await prisma.users.findMany({});

    return users.map(
      (user) =>
        ({
          cd_user: user.cd_user,
          nm_user: user.nm_user,
          ds_email: user.ds_email,
        } as UserDTO)
    );
  }

  async create(data: UserDTO): Promise<UserDTO> {
    const newUser = await prisma.users.create({
      data: {
        nm_user: data.nm_user,
        ds_email: data.ds_email,
      },
    });

    return {
      nm_user: newUser.nm_user,
      ds_email: newUser.ds_email,
    };
  }

  async update(id: number, data: Partial<UserDTO>): Promise<UserDTO> {
    const updatedUser = await prisma.users.update({
      where: { cd_user: id },
      data: {
        nm_user: data.nm_user,
        ds_email: data.ds_email,
      },
    });

    return {
      cd_user: updatedUser.cd_user,
      nm_user: updatedUser.nm_user,
      ds_email: updatedUser.ds_email,
    } as UserDTO;
  }

  async delete(id: number): Promise<void> {
    await prisma.users.delete({ where: { cd_user: id } });
  }
}

export const userRepository = new UserRepository();
