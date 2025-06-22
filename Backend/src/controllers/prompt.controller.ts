import { Request, Response } from 'express';
import * as promptService from '../services/prompt.service';

export const createPrompt = async (req: Request, res: Response) => {
  try {
    const result = await promptService.createPrompt(req.body);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
