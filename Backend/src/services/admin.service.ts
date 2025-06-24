import { PrismaClient, Prisma } from '@prisma/client';

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

// ✅ גרסה חדשה עם Pagination וחיפוש
interface PromptQueryParams {
  page: number;
  pageSize: number;
  search?: string;
}

export const getAllPromptsWithUserAndCategory = async ({
  page,
  pageSize,
  search,
}: PromptQueryParams) => {
  const skip = (page - 1) * pageSize;

  const whereClause = search
    ? {
        OR: [
          { prompt: { contains: search, mode: Prisma.QueryMode.insensitive } },
          { response: { contains: search, mode: Prisma.QueryMode.insensitive } },
          { user: { name: { contains: search, mode: Prisma.QueryMode.insensitive } } },
        ],
      }
    : {};

  const [prompts, total] = await Promise.all([
    prisma.prompt.findMany({
      where: whereClause,
      skip,
      take: pageSize,
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { name: true, id: true } },
        category: { select: { name: true } },
        subCategory: { select: { name: true } },
      },
    }),
    prisma.prompt.count({ where: whereClause }),
  ]);

  return {
    prompts,
    currentPage: page,
    totalPages: Math.ceil(total / pageSize),
    total,
  };
};
