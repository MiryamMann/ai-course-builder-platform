import express from 'express';
import { getUserHistory } from '../controllers/user.controller';
import { authenticateJWT } from '../middlewares/authenticateJWT';
import { validateParams } from '../middlewares/validate';
import { UserIdParamSchema } from '../validations';

const router = express.Router();

const asyncHandler = (fn: any) =>
  (req: express.Request, res: express.Response, next: express.NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

/**
 * @openapi
 * /api/users/history/{userId}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     summary: Get prompt history for a specific user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: List of user prompts
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.get(
  '/history',
  authenticateJWT,
  asyncHandler(getUserHistory)
);


export default router;
