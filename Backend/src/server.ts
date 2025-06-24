import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import categoryRoutes from './routes/category.route';
import promptRoutes from './routes/prompt.route';
// Make sure the file exists as 'admin.route.ts' in the routes folder.
// If the file is actually named 'admin.routes.ts', update the import as follows:
import adminRoute from './routes/admin.routes';
// Or, if the file is named differently, update the path accordingly.
import { authenticateJWT } from './middlewares/authenticateJWT';
import { setupSwagger } from './swagger';

const app = express();

// 1. CORS
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// 2. Middleware
app.use(express.json());

// 3. Routes
app.use('/api/auth', authRoutes); // פתוח
app.use('/api/categories', categoryRoutes); // פתוח
app.use('/api/prompts', authenticateJWT, promptRoutes); // מוגן
app.use('/api/admin', authenticateJWT, adminRoute); // מוגן, רק למנהלים

// 4. Health Check
app.get('/', (_, res) => {
  res.send({ message: 'AI Learning Platform is up!' });
});

// 5. Swagger
setupSwagger(app);

// 6. Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


export default app;
