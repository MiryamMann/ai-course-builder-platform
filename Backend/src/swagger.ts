import { Express } from 'express';

export function setupSwagger(app: Express) {
  if (process.env.NODE_ENV !== 'production') {
    const swaggerJsdoc = require('swagger-jsdoc');
    const swaggerUi = require('swagger-ui-express');

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
      apis: ['./src/**/*.ts'],
    };

    const swaggerSpec = swaggerJsdoc(options);

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log('✅ Swagger is running at /api-docs');
  }
}
