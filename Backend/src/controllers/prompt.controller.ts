import { Request, Response } from 'express';
import * as promptService from '../services/prompt.service';
import { AuthenticatedRequest } from '../middlewares/authenticateJWT';

// Logger
const log = (action: string, detail?: any) => {
  console.log(`[PromptController] ${action}`, detail ?? '');
};

export const createPrompt = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { prompt, categoryId, subCategoryId } = req.body;
    console.log('prompt:', prompt);
    console.log('categoryId:', categoryId);
    console.log('subCategoryId:', subCategoryId);
    console.log('userId:', req.user?.id);
    console.log('BODY:', req.body);
    if (!req.user) {
      log('Unauthorized access to createPrompt');
      return res.status(401).json({ message: 'Unauthorized: user not found in request' });
    }

    const newPrompt = await promptService.createPrompt({
      prompt,
      categoryId,
      subCategoryId,
      userId: req.user.id
    });

    log('Prompt created successfully', newPrompt.id);
    res.status(201).json(newPrompt);
  } catch (error) {
    log('Error in createPrompt', error);
    res.status(400).json({ message: (error as Error).message });
  }
};

export const getAllPrompts = async (_req: Request, res: Response) => {
  try {
    const prompts = await promptService.getAllPrompts();
    log('Fetched all prompts');
    res.json(prompts);
  } catch (error) {
    log('Error in getAllPrompts', error);
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getPromptById = async (req: Request, res: Response) => {
  try {
    const prompt = await promptService.getPromptById(req.params.id);
    if (!prompt) {
      log(`Prompt not found: ${req.params.id}`);
      return res.status(404).json({ message: 'Prompt not found' });
    }
    log(`Fetched prompt by ID: ${req.params.id}`);
    res.json(prompt);
  } catch (error) {
    log('Error in getPromptById', error);
    res.status(500).json({ message: (error as Error).message });
  }
};

export const deletePrompt = async (req: Request, res: Response) => {
  try {
    const deleted = await promptService.deletePrompt(req.params.id);
    if (!deleted) {
      log(`Prompt not found to delete: ${req.params.id}`);
      return res.status(404).json({ message: 'Prompt not found' });
    }
    log(`Prompt deleted: ${req.params.id}`);
    res.json({ message: 'Prompt deleted' });
  } catch (error) {
    log('Error in deletePrompt', error);
    res.status(500).json({ message: (error as Error).message });
  }
};

export const updatePrompt = async (req: Request, res: Response) => {
  try {
    const updated = await promptService.updatePrompt(req.params.id, req.body);
    if (!updated) {
      log(`Prompt not found to update: ${req.params.id}`);
      return res.status(404).json({ message: 'Prompt not found' });
    }
    log(`Prompt updated: ${req.params.id}`);
    res.json(updated);
  } catch (error) {
    log('Error in updatePrompt', error);
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getPromptsByUserId = async (req: Request, res: Response) => {
  try {
    const prompts = await promptService.getPromptsByUserId(req.params.userId);
    log(`Fetched prompts for userId: ${req.params.userId}`);
    res.json(prompts);
  } catch (error) {
    log('Error in getPromptsByUserId', error);
    res.status(500).json({ message: (error as Error).message });
  }
};
