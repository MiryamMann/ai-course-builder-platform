import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      isAdmin: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const deleteUserById = async (userId: string) => {
  return prisma.user.delete({
    where: { id: userId },
  });
};

export const getUserStatistics = async () => {
  const totalUsers = await prisma.user.count();
  const totalPrompts = await prisma.prompt.count();
  const totalAdmins = await prisma.user.count({ where: { isAdmin: true } });

  return {
    totalUsers,
    totalPrompts,
    totalAdmins,
  };
};