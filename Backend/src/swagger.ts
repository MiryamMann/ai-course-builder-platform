import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

// טיפוס כללי שמחליף את Options (כי אין אותו בגרסאות החדשות)
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AI Learning Platform API',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/**/*.ts'], // ודאי שה־routes שלך נמצאים כאן
};

const swaggerSpec = swaggerJsdoc(options as any); // 'as any' כדי להימנע משגיאת טיפוס

export function setupSwagger(app: Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
