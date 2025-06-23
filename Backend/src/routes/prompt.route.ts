import express from 'express';
import * as promptController from '../controllers/prompt.controller';
import { authenticateJWT } from '../middlewares/authenticateJWT';

const router = express.Router();

// Utility to wrap async route handlers and forward errors to Express error handler
const asyncHandler = (fn: any) => (req: express.Request, res: express.Response, next: express.NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

/**
 * @openapi
 * /api/prompts:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Prompts
 *     summary: Create a new prompt
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - prompt
 *               - categoryId
 *               - subCategoryId
 *               - userId
 *             properties:
 *               prompt:
 *                 type: string
 *               categoryId:
 *                 type: string
 *               subCategoryId:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Prompt created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', authenticateJWT, asyncHandler(promptController.createPrompt));

/**
 * @openapi
 * /api/prompts:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Prompts
 *     summary: Get all prompts
 *     responses:
 *       200:
 *         description: List of all prompts
 */
router.get('/', authenticateJWT, asyncHandler(promptController.getAllPrompts));

/**
 * @openapi
 * /api/prompts/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Prompts
 *     summary: Get a specific prompt by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Prompt found
 *       404:
 *         description: Prompt not found
 */
router.get('/:id', authenticateJWT, asyncHandler(promptController.getPromptById));

/**
 * @openapi
 * /api/prompts/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Prompts
 *     summary: Delete a prompt by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Prompt deleted
 *       404:
 *         description: Prompt not found
 */
router.delete('/:id', authenticateJWT, asyncHandler(promptController.deletePrompt));

/**
 * @openapi
 * /api/prompts/{id}:
 *   patch:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Prompts
 *     summary: Update a prompt by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prompt:
 *                 type: string
 *               response:
 *                 type: string
 *     responses:
 *       200:
 *         description: Prompt updated
 *       404:
 *         description: Prompt not found
 */
router.patch('/:id', authenticateJWT, asyncHandler(promptController.updatePrompt));

/**
 * @openapi
 * /api/prompts/user/{userId}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Prompts
 *     summary: Get all prompts by a specific user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of user's prompts
 */
router.get('/user/:userId', authenticateJWT, asyncHandler(promptController.getPromptsByUserId));

export default router;