import { PrismaClient } from "@prisma/client";
import { UserDTO } from "../interfaces/userDTO";

const prisma = new PrismaClient();

export class UserRepository {
  async findAll(): Promise<UserDTO[]> {
    const users = await prisma.user.findMany({
      include: { tg_user: true },
    });

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
    const newUser = await prisma.user.create({
      data: {
        nm_user: data.nm_user,
        ds_email: data.ds_email,
      },
    });

    console.log(data, newUser);

    return {
      nm_user: newUser.nm_user,
      ds_email: newUser.ds_email,
    };
  }

  async update(id: number, data: Partial<UserDTO>): Promise<UserDTO> {
    const updatedUser = await prisma.user.update({
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
    await prisma.user.delete({ where: { cd_user: id } });
  }
}

export const userRepository = new UserRepository();
