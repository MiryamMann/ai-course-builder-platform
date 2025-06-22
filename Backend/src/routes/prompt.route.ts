import express from 'express';
import * as promptController from '../controllers/prompt.controller';

// Swagger imports
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const router = express.Router();

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'AI Learning Platform API',
    version: '1.0.0',
    description: 'API documentation for the AI Learning Platform',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/prompt.route.ts'], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(options);

// Swagger UI route
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /prompt:
 *   post:
 *     summary: Create a new prompt
 *     tags:
 *       - Prompt
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prompt:
 *                 type: string
 *                 example: "What is AI?"
 *     responses:
 *       200:
 *         description: Prompt created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', promptController.createPrompt);

export default router;