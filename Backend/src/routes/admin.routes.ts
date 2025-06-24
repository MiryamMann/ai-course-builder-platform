import express from 'express';
import authorizeAdmin from '../middlewares/authorizeAdmin';
import * as adminController from '../controllers/admin.controller';
import { authenticateJWT } from '../middlewares/authenticateJWT';

const router = express.Router();

// הדשבורד של המנהל – רק לאחר אימות וזהות אדמין
router.get('/dashboard', authenticateJWT, authorizeAdmin, adminController.getDashboardData);
router.get('/prompts', authenticateJWT, authorizeAdmin, adminController.getAllPrompts);
router.get('/users', authenticateJWT, authorizeAdmin, adminController.getUsers);

export default router;
