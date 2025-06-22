import { PrismaClient } from '@prisma/client';
import OpenAI from 'openai';

const prisma = new PrismaClient();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export async function createPrompt(data: {
  userId: string;
  categoryId: string;
  subCategoryId: string;
  prompt: string;
}) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: data.prompt }],
  });

  const responseText = completion.choices[0].message.content || '';

  const saved = await prisma.prompt.create({
    data: {
      userId: data.userId,
      categoryId: data.categoryId,
      subCategoryId: data.subCategoryId,
      prompt: data.prompt,
      response: responseText,
    },
  });

  return saved;
}
