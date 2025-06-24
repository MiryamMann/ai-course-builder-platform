import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';

dotenv.config();

const prisma = new PrismaClient();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// יצירת prompt חדש עם שליחה ל־GPT
export const createPrompt = async (data: {
  prompt: string;
  categoryId: string;
  subCategoryId: string;
  userId: string;
}) => {
  const { prompt, categoryId, subCategoryId, userId } = data;

  // שליפת שמות הקטגוריות
  const category = await prisma.category.findUnique({ where: { id: categoryId } });
  const subCategory = await prisma.subCategory.findUnique({ where: { id: subCategoryId } });

  // יצירת prompt עם הקשר ברור
  const fullPrompt = `נושא השיעור הוא: ${category?.name} > ${subCategory?.name}.
כתוב שיעור מפורט על: ${prompt}`;

  // שליחה ל־OpenAI
  const gptRes = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: fullPrompt }],
  });

  const responseText = gptRes.choices[0]?.message?.content || 'No response';

  // שמירה בדאטאבייס
  const newPrompt = await prisma.prompt.create({
    data: {
      prompt,
      categoryId,
      userId,
      response: responseText,
      subCategoryId,
    },
  });

  return newPrompt;
};

// כל הפרומפטים במערכת
export const getAllPrompts = async () => {
  return prisma.prompt.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: true,
      category: true,
      subCategory: true,
    },
  });
};

// פרומפט לפי מזהה
export const getPromptById = async (id: string) => {
  return prisma.prompt.findUnique({
    where: { id },
    include: {
      user: true,
      category: true,
      subCategory: true,
    },
  });
};

// מחיקת פרומפט
export const deletePrompt = async (id: string) => {
  try {
    await prisma.prompt.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
};

// עדכון prompt – רק את שדות התוכן
export const updatePrompt = async (
  id: string,
  data: Partial<{ prompt: string; response: string }>
) => {
  return prisma.prompt.update({
    where: { id },
    data,
  });
};

// כל הפרומפטים של יוזר מסוים
export const getPromptsByUserId = async (userId: string) => {
  return prisma.prompt.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    include: {
      category: true,
      subCategory: true,
    },
  });
};
