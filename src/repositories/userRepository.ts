import { PrismaClient } from "@prisma/client";
import { User } from "../interfaces/User";

const prisma = new PrismaClient();

export class UserRepository {
  async findAll(skip: number, take: number, search?: string): Promise<User[]> {
    try {
      const users = await prisma.users.findMany({
        skip: skip,
        take: take,
        where: {
          OR: [
            { nm_user: { contains: search && search.toLowerCase() } },
            { ds_email: { contains: search && search.toLowerCase() } },
            { nb_telephone: { contains: search && search.toLowerCase() } },
          ],
        },
      });

      return users;
    } catch (error) {
      console.error(`Error in UserRepository.findAll: ${error}`);
      throw new Error(`Failed to fetch users: ${error}`);
    }
  }

  async countAll(search?: string): Promise<number> {
    const lowercaseSearch = search?.toLowerCase();

    return prisma.users.count({
      where: {
        nm_user: { contains: lowercaseSearch },
        ds_email: { contains: lowercaseSearch },
        nb_telephone: { contains: lowercaseSearch },
      },
    });
  }

  async findById(id: number): Promise<User | null> {
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
      hs_password: user.hs_password,
    };
  }

  async create(data: User): Promise<User> {
    const newUser = await prisma.users.create({
      data: {
        nm_user: data.nm_user,
        ds_email: data.ds_email,
        nb_telephone: data.nb_telephone,
        url_image: data.url_image,
        hs_password: data.hs_password,
      },
    });

    return {
      nm_user: newUser.nm_user,
      ds_email: newUser.ds_email,
      nb_telephone: newUser.nb_telephone,
      url_image: newUser.url_image,
      hs_password: newUser.hs_password,
    };
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    const updatedUser = await prisma.users.update({
      where: { cd_user: id },
      data: {
        nm_user: data.nm_user,
        ds_email: data.ds_email,
        nb_telephone: data.nb_telephone,
        url_image: data.url_image,
        hs_password: data.hs_password,
      },
    });

    return {
      cd_user: updatedUser.cd_user,
      nm_user: updatedUser.nm_user,
      ds_email: updatedUser.ds_email,
      nb_telephone: updatedUser.nb_telephone,
      url_image: updatedUser.url_image,
      hs_password: updatedUser.hs_password,
    } as User;
  }

  async delete(id: number): Promise<void> {
    await prisma.users.delete({ where: { cd_user: id } });
  }
}

export const userRepository = new UserRepository();
