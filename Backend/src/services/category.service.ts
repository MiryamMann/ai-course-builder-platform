import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getAllCategories() {
  return prisma.category.findMany({ include: { subCategories: true } });
}

export async function createCategory(data: { name: string }) {
  return prisma.category.create({ data });
}
