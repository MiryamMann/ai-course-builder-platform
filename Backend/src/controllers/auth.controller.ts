import { Request, Response } from 'express';
import * as authService from '../services/auth.service';

export const register = async (req: Request, res: Response) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = await authService.login(req.body);
    res.status(200).json(result);
  } catch (error: any) {
    if (error.code === 'USER_NOT_FOUND') {
      res.status(404).json({ message: error.message });
    } else if (error.code === 'INVALID_PASSWORD') {
      res.status(401).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal server error', detail: error.message });
    }
  }
};


export const refreshToken = async (req: Request, res: Response) => {
  try {
    const result = await authService.refreshToken(req.body.refreshToken);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(403).json({ message: error.message });
  }
};
