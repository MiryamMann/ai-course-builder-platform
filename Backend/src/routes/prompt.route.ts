import express from 'express';
import * as promptController from '../controllers/prompt.controller';
import { authenticateJWT } from '../middlewares/authenticateJWT';
import { validateBody, validateParams } from '../middlewares/validate';
import {
  CreatePromptSchema,
  PromptIdParamSchema,
  UserIdParamSchema,
} from '../validations';

const router = express.Router();

const asyncHandler = (fn: any) =>
  (req: express.Request, res: express.Response, next: express.NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

/**
 * @openapi
 * /api/prompts:
 *   post:
 *     ...
 */
router.post(
  '/',
  authenticateJWT,
  validateBody(CreatePromptSchema),
  asyncHandler(promptController.createPrompt)
);

/**
 * @openapi
 * /api/prompts:
 *   get:
 *     ...
 */
router.get(
  '/',
  authenticateJWT,
  asyncHandler(promptController.getAllPrompts)
);

/**
 * @openapi
 * /api/prompts/{id}:
 *   get:
 *     ...
 */
router.get(
  '/:id',
  authenticateJWT,
  validateParams(PromptIdParamSchema),
  asyncHandler(promptController.getPromptById)
);

/**
 * @openapi
 * /api/prompts/{id}:
 *   patch:
 *     ...
 */
router.patch(
  '/:id',
  authenticateJWT,
  validateParams(PromptIdParamSchema),
  validateBody(CreatePromptSchema),
  asyncHandler(promptController.updatePrompt)
);

/**
 * @openapi
 * /api/prompts/user/{userId}:
 *   get:
 *     ...
 */
router.get(
  '/user/:userId',
  authenticateJWT,
  validateParams(UserIdParamSchema),
  asyncHandler(promptController.getPromptsByUserId)
);

/**
 * @openapi
 * /api/prompts/{id}:
 *   delete:
 *     ...
 */
router.delete(
  '/:id',
  authenticateJWT,
  validateParams(PromptIdParamSchema),
  asyncHandler(promptController.deletePrompt)
);

export default router;
