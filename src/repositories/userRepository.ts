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
          nb_telephone: user.nb_telephone,
          url_image: user.url_image,
          tp_user: user.tp_user,
        } as UserDTO)
    );
  }

  async findById(id: number): Promise<UserDTO | null> {
    const user = await prisma.users.findUnique({
      where: {
        cd_user: id,
      },
    });

    if (!user) {
      throw Error("Usuário não encontrado");
    }

    return {
      cd_user: user.cd_user,
      nm_user: user.nm_user,
      ds_email: user.ds_email,
      nb_telephone: user.nb_telephone,
      url_image: user.url_image,
      tp_user: user.tp_user,
    };
  }

  async create(data: UserDTO): Promise<UserDTO> {
    const newUser = await prisma.users.create({
      data: {
        nm_user: data.nm_user,
        ds_email: data.ds_email,
        nb_telephone: data.nb_telephone,
        url_image: data.url_image,
        tp_user: data.tp_user,
      },
    });

    return {
      nm_user: newUser.nm_user,
      ds_email: newUser.ds_email,
      nb_telephone: newUser.nb_telephone,
      url_image: newUser.url_image,
      tp_user: newUser.tp_user,
    };
  }

  async update(id: number, data: Partial<UserDTO>): Promise<UserDTO> {
    const updatedUser = await prisma.users.update({
      where: { cd_user: id },
      data: {
        nm_user: data.nm_user,
        ds_email: data.ds_email,
        nb_telephone: data.nb_telephone,
        url_image: data.url_image,
        tp_user: data.tp_user,
      },
    });

    return {
      cd_user: updatedUser.cd_user,
      nm_user: updatedUser.nm_user,
      ds_email: updatedUser.ds_email,
      nb_telephone: updatedUser.nb_telephone,
      url_image: updatedUser.url_image,
      tp_user: updatedUser.tp_user,
    } as UserDTO;
  }

  async delete(id: number): Promise<void> {
    await prisma.users.delete({ where: { cd_user: id } });
  }
}

export const userRepository = new UserRepository();
