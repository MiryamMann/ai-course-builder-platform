// scripts/addSubCategory.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function createSubCategory() {
  const categoryId = '2f26d655-e95b-445c-a947-0f0db9c42eaa'; // ← תעתיקי מ־DB שלך

  const subCategory = await prisma.subCategory.create({
    data: {
      name: 'Euclidean Geometry',
      category: {
        connect: { id: categoryId }
      }
    },
  });

  console.log('✔️ סאב קטגוריה נוספה:', subCategory);
}

createSubCategory()
  .catch((e) => {
    console.error('❌ שגיאה:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
