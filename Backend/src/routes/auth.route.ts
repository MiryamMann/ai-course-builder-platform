import express from 'express';
import * as authController from '../controllers/auth.controller';
import authorizeAdmin from '../middlewares/authorizeAdmin';
import { authenticateJWT } from '../middlewares/authenticateJWT';
import { validateBody } from '../middlewares/validate';
import { RegisterSchema, LoginSchema, RefreshTokenSchema } from '../validations';

const router = express.Router();

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Miryam Mann
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: mySecret123
 *               phone:
 *                 type: string
 *                 example: "0501234567"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
router.post('/register', validateBody(RegisterSchema), authController.register);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login an existing user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: mySecret123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Unauthorized
 */
router.post('/login', validateBody(LoginSchema), authController.login);

/**
 * @openapi
 * /api/auth/refresh-token:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Refresh access token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: eyJhbGciOiJIUz...
 *     responses:
 *       200:
 *         description: Token refreshed
 *       403:
 *         description: Invalid refresh token
 */
router.post('/refresh-token', validateBody(RefreshTokenSchema), authController.refreshToken);

router.get('/admin/secure-data', authenticateJWT, authorizeAdmin);

export default router;
