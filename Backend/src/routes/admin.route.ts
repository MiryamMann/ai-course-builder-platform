import express from 'express';
import authorizeAdmin from '../middlewares/authorizeAdmin';
import * as adminController from '../controllers/admin.controller';
import { authenticateJWT } from '../middlewares/authenticateJWT';
import { validateQuery } from '../middlewares/validate';
import { PaginationQuerySchema } from '../validations';

const router = express.Router();

router.get('/dashboard', authenticateJWT, authorizeAdmin, adminController.getDashboardData);
/**
 * @swagger
 * /admin/dashboard:
 *   get:
 *     summary: Get admin dashboard data
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /admin/prompts:
 *   get:
 *     summary: Get all prompts with pagination
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of prompts
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get(
  '/prompts',
  authenticateJWT,
  authorizeAdmin,
  validateQuery(PaginationQuerySchema),
  adminController.getAllPrompts
);
/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get('/users', authenticateJWT, authorizeAdmin, adminController.getUsers);

export default router;
