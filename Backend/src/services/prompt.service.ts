import dotenv from 'dotenv';
import { OpenAI } from 'openai';
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const prompts: any[] = [];


export const createPrompt = async (data: any) => {
  const { prompt, categoryId, subcategoryId, userId } = data;

  // קריאה ל־OpenAI
  const gptRes = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo', // או 'gpt-4'
    messages: [{ role: 'user', content: prompt }],
  });

  const responseText = gptRes.choices[0]?.message?.content || 'No response';

  const newPrompt = {
    id: String(prompts.length + 1),
    prompt,
    categoryId,
    subcategoryId,
    userId,
    response: responseText,
    createdAt: new Date().toISOString(),
  };

  prompts.push(newPrompt);
  return newPrompt;
};

/**
 * מחזיר את כל הפרומפטים
 */
export const getAllPrompts = async () => prompts;

/**
 * לפי ID
 */
export const getPromptById = async (id: string) =>
  prompts.find((p) => p.id === id);

/**
 * מחיקת פרומפט
 */
export const deletePrompt = async (id: string) => {
  const idx = prompts.findIndex((p) => p.id === id);
  if (idx === -1) return false;
  prompts.splice(idx, 1);
  return true;
};

/**
 * עדכון פרומפט קיים
 */
export const updatePrompt = async (id: string, data: any) => {
  const idx = prompts.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  prompts[idx] = { ...prompts[idx], ...data };
  return prompts[idx];
};

/**
 * פרומפטים של יוזר לפי userId
 */
export const getPromptsByUserId = async (userId: string) =>
  prompts.filter((p) => p.userId === userId);
