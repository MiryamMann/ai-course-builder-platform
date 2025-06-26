import { Request, Response } from 'express';
import * as promptService from '../services/prompt.service';
import { AuthenticatedRequest } from '../middlewares/authenticateJWT';

export const createPrompt = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { prompt, categoryId, subCategoryId } = req.body;


    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized: user not found in request' });
    }

    const newPrompt = await promptService.createPrompt({
      prompt,
      categoryId,
      subCategoryId,
      userId: req.user.id
    });

    res.status(201).json(newPrompt);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const getAllPrompts = async (_req: Request, res: Response) => {
  try {
    const prompts = await promptService.getAllPrompts();
    res.json(prompts);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getPromptById = async (req: Request, res: Response) => {
  try {
    const prompt = await promptService.getPromptById(req.params.id);
    if (!prompt) {
      return res.status(404).json({ message: 'Prompt not found' });
    }
    res.json(prompt);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const deletePrompt = async (req: Request, res: Response) => {
  try {
    const deleted = await promptService.deletePrompt(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Prompt not found' });
    }
    res.json({ message: 'Prompt deleted' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const updatePrompt = async (req: Request, res: Response) => {
  try {
    const updated = await promptService.updatePrompt(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'Prompt not found' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getPromptsByUserId = async (req: Request, res: Response) => {
  try {
    const prompts = await promptService.getPromptsByUserId(req.params.userId);
    res.json(prompts);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};