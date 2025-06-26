import { Request, Response } from 'express';
import { getUserPromptHistory } from '../services/user.service';
import { logger } from '../utils/logger';
import { UserHistorySchema } from '../validations/index';

export const getUserHistory = async (req: Request, res: Response): Promise<void> => {
    try {
    const userId = req.user.id; 
  console.log('req.user:', req.user); // 🟢 הדפסה חשובה

    const history = await getUserPromptHistory(userId);
    res.json(history);
  } catch (error) {
    console.error('Error fetching user history:', error);
    res.status(500).json({ message: 'Failed to fetch history' });
  }
};
