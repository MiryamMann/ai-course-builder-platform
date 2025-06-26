import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUserPromptHistory = async (userId: string) => {
  return prisma.prompt.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
};
