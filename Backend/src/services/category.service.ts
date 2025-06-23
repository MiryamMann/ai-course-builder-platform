import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getAllCategories() {
  return prisma.category.findMany({ include: { subCategories: true } });
}

export async function createCategory(data: { name: string }) {
  return prisma.category.create({ data });
}
export async function addSubCategory(categoryId: string, subCategoryData: { name: string }) {
  // Check if subcategory with the same name already exists for this category
  const existing = await prisma.subCategory.findFirst({
    where: {
      name: subCategoryData.name,
      categoryId: categoryId,
    },
  });

  if (existing) {
    throw new Error('Subcategory with this name already exists in the category.');
  }

  return prisma.subCategory.create({
    data: {
      ...subCategoryData,
      category: { connect: { id: categoryId } }
    }
  });
}
export async function getAllCategoriesWithSubCategories() {
  return prisma.category.findMany({
    include: {
      subCategories: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
}
