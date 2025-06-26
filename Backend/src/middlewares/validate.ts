import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { z } from 'zod';


export const validateBody = (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        message: 'Validation failed',
        errors: result.error.flatten(),
      });
      return;
    }
    (req as any).validatedBody = result.data;
    next();
  };

export const validateQuery = (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
      res.status(400).json({
        message: 'Query validation failed',
        errors: result.error.flatten(),
      });
      return;
    }
    (req as any).validatedQuery = result.data;
    next();
  };

export const validateParams = (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.params);
    if (!result.success) {
      res.status(400).json({
        message: 'Params validation failed',
        errors: result.error.flatten(),
      });
      return;
    }
    (req as any).validatedParams = result.data;
    next();
  };
  export const PromptIdParamSchema = z.object({
  id: z.string().uuid('Invalid prompt ID'),
});

export const UserIdParamSchema = z.object({
  userId: z.string().uuid('Invalid user ID'),
});

