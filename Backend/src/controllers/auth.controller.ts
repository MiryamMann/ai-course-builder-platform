import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import { logger } from '../utils/logger';

export const register = async (req: Request, res: Response) => {
  try {
    logger.info(`Register attempt: ${req.body.email}`);
    const result = await authService.register(req.body);
    logger.info(`User registered successfully: ${result.user.email || 'unknown'}`);
    res.status(201).json(result);
  } catch (error: any) {
    logger.error(`Register failed: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    logger.info(`Login attempt: ${req.body.email}`);
    const result = await authService.login(req.body);
    logger.info(`User logged in successfully: ${req.body.email}`);
    res.status(200).json(result);
  } catch (error: any) {
    if (error.code === 'USER_NOT_FOUND') {
      logger.warn(`Login failed: user not found (${req.body.email})`);
      res.status(404).json({ message: error.message });
    } else if (error.code === 'INVALID_PASSWORD') {
      logger.warn(`Login failed: invalid password for ${req.body.email}`);
      res.status(401).json({ message: error.message });
    } else {
      logger.error(`Login failed with unknown error: ${error.message}`);
      res.status(500).json({ message: 'Internal server error', detail: error.message });
    }
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    logger.info('Refresh token attempt');
    const result = await authService.refreshToken(req.body.refreshToken);
    logger.info('Token refreshed successfully');
    res.status(200).json(result);
  } catch (error: any) {
    logger.warn(`Refresh token failed: ${error.message}`);
    res.status(403).json({ message: error.message });
  }
};
