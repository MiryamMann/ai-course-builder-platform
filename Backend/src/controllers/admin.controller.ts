import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import { getAllUsers } from '../services/admin.service';
import { getAllPromptsWithUserAndCategory } from '../services/admin.service';
import { logger } from '../utils/logger';

export const getUsers = async (_req: Request, res: Response) => {
  try {
    logger.info('Fetching all users');
    const users = await getAllUsers();
    logger.info(`Fetched ${users.length} users`);
    res.status(200).json(users);
  } catch (err) {
    logger.error(`Failed to fetch users: ${(err as Error).message}`);
    res.status(500).json({ message: 'Failed to fetch users', error: (err as Error).message });
  }
};

export const registerAdmin = async (req: Request, res: Response) => {
  try {
    logger.info(`Registering new admin: ${req.body.email}`);
    const newUser = await authService.register({ ...req.body, isAdmin: true });
    logger.info(`Admin registered successfully: ${newUser.user.email}`);
    res.status(201).json(newUser);
  } catch (err) {
    logger.error(`Failed to register admin: ${(err as Error).message}`);
    res.status(400).json({ message: (err as Error).message });
  }
};

export const getDashboardData = async (_req: Request, res: Response) => {
  try {
    logger.info('Fetching admin dashboard data');
    res.json({
      message: 'Admin dashboard data loaded successfully.',
      stats: {
        usersCount: 42,
        promptsCount: 123,
      },
    });
  } catch (error) {
    logger.error(`Failed to load dashboard data: ${(error as Error).message}`);
    res.status(500).json({ message: 'Failed to load dashboard data', error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    logger.info(`Deleting user: ${userId}`);
    res.status(200).json({ message: `User with ID ${userId} deleted successfully.` });
  } catch (error) {
    logger.error(`Failed to delete user ${userId}: ${(error as Error).message}`);
    res.status(500).json({ message: 'Failed to delete user', error: (error as Error).message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const userData = req.body;
  try {
    logger.info(`Updating user: ${userId}`);
    res.status(200).json({ message: `User with ID ${userId} updated successfully.`, userData });
  } catch (error) {
    logger.error(`Failed to update user ${userId}: ${(error as Error).message}`);
    res.status(500).json({ message: 'Failed to update user', error: (error as Error).message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    logger.info(`Fetching user by ID: ${userId}`);
    res.status(200).json({ message: `User with ID ${userId} fetched successfully.` });
  } catch (error) {
    logger.error(`Failed to fetch user ${userId}: ${(error as Error).message}`);
    res.status(500).json({ message: 'Failed to fetch user', error: (error as Error).message });
  }
};

export const getUserPrompts = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    logger.info(`Fetching prompts for user ${userId}`);
    res.status(200).json({ message: `Prompts for user with ID ${userId} fetched successfully.` });
  } catch (error) {
    logger.error(`Failed to fetch prompts for user ${userId}: ${(error as Error).message}`);
    res.status(500).json({ message: 'Failed to fetch user prompts', error: (error as Error).message });
  }
};

export const getUserHistory = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    logger.info(`Fetching history for user ${userId}`);
    res.status(200).json({ message: `History for user with ID ${userId} fetched successfully.` });
  } catch (error) {
    logger.error(`Failed to fetch history for user ${userId}: ${(error as Error).message}`);
    res.status(500).json({ message: 'Failed to fetch user history', error: (error as Error).message });
  }
};

export const getAllPrompts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const search = (req.query.search as string) || '';

    logger.info(`Fetching prompts: page=${page}, pageSize=${pageSize}, search="${search}"`);

    const result = await getAllPromptsWithUserAndCategory({ page, pageSize, search });

    logger.info(`Fetched ${result.prompts.length} prompts`);
    res.status(200).json(result);
  } catch (error) {
    logger.error(`Failed to fetch prompts: ${(error as Error).message}`);
    res.status(500).json({ message: 'Failed to fetch prompts', error: (error as Error).message });
  }
};
