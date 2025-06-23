import { Request, Response } from 'express';
import * as promptService from '../services/prompt.service';

export const createPrompt = async (req: Request, res: Response) => {
  try {
    const prompt = await promptService.createPrompt(req.body);
    res.status(201).json(prompt);
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