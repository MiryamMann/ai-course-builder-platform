import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
export { UserIdParamSchema } from '../middlewares/validate'; 
export { PromptIdParamSchema } from '../middlewares/validate'; 

// 🧍‍♀️ USER
export const RegisterSchema = z.object({
  name: z.string().min(2, 'Name is too short'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
});

export const UserHistorySchema = z.object({
  userId: z.string().uuid(),
});

export const RefreshTokenSchema = z.object({
  refreshToken: z.string().min(10, 'Invalid refresh token'),
});

// 🧠 PROMPT
export const CreatePromptSchema = z.object({
  prompt: z.string().min(5, 'Prompt must be meaningful'),
  categoryId: z.string().uuid(),
  subCategoryId: z.string().uuid().optional(),
});

// 📂 CATEGORY
export const CreateCategorySchema = z.object({
  name: z.string().min(2, 'Category name too short'),
});

export const CreateSubCategorySchema = z.object({
  name: z.string().min(2, 'Subcategory name too short'),
});
export const CategoryIdParamSchema = z.object({
  categoryId: z.string().uuid('Invalid category ID'),
});

// 🔍 PAGINATION

export const PaginationQuerySchema = z.object({
  page: z.string().regex(/^\d+$/).transform(Number).default('1'),
  pageSize: z.string().regex(/^\d+$/).transform(Number).default('10'),
  search: z.string().optional().nullable().default(''),
});

export const validateQuery = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
      res.status(400).json({
        message: 'Query validation failed',
        errors: result.error.flatten(),
      });
      return; // חשוב!
    }

    req.query = result.data;
    next();
  };
};


// 🧾 Tipings for each
export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type CreatePromptInput = z.infer<typeof CreatePromptSchema>;
export type CreateCategoryInput = z.infer<typeof CreateCategorySchema>;
export type CreateSubCategoryInput = z.infer<typeof CreateSubCategorySchema>;
export type PaginationQuery = z.infer<typeof PaginationQuerySchema>;
