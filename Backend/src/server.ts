import express from 'express';
import authRoutes from './routes/auth.routes';
import { setupSwagger } from './swagger';


const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes); // <-- הנה זה

setupSwagger(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
export default app;