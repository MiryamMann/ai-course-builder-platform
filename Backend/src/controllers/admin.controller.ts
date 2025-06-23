import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import { getAllUsers } from '../services/admin.service';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users', error: (err as Error).message });
  }
};

export const registerAdmin = async (req: Request, res: Response) => {
  try {
    const newUser = await authService.register({ ...req.body, isAdmin: true });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};

export const getDashboardData = async (req: Request, res: Response) => {
  try {
    // כאן תוכלי להביא נתונים לדשבורד (למשל מספר משתמשים, מספר פרומפטים וכו')
    res.json({
      message: 'Admin dashboard data loaded successfully.',
      stats: {
        usersCount: 42,
        promptsCount: 123,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load dashboard data', error });
  }
};
export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    // כאן תוכלי להוסיף לוגיקה למחיקת משתמש
    res.status(200).json({ message: `User with ID ${userId} deleted successfully.` });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user', error: (error as Error).message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const userData = req.body;
  try {
    // כאן תוכלי להוסיף לוגיקה לעדכון משתמש
    res.status(200).json({ message: `User with ID ${userId} updated successfully.`, userData });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user', error: (error as Error).message });
  }
};
export const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    // כאן תוכלי להוסיף לוגיקה להבאת משתמש לפי ID
    res.status(200).json({ message: `User with ID ${userId} fetched successfully.` });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user', error: (error as Error).message });
  }
};
export const getUserPrompts = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    // כאן תוכלי להוסיף לוגיקה להבאת פרומפטים של משתמש לפי ID
    res.status(200).json({ message: `Prompts for user with ID ${userId} fetched successfully.` });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user prompts', error: (error as Error).message });
  }
};
export const getUserHistory = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    // כאן תוכלי להוסיף לוגיקה להבאת היסטוריית פרומפטים של משתמש לפי ID
    res.status(200).json({ message: `History for user with ID ${userId} fetched successfully.` });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user history', error: (error as Error).message });
  }
};

