// controllers/category.controller.ts
import { Request, Response } from 'express';
import * as categoryService from '../services/category.service';

export const getAllCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getAllCategoriesWithSubCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await categoryService.getAllCategoriesWithSubCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = await categoryService.createCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const addSubCategory = async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const subCategoryData = req.body;
  try {
    const subCategory = await categoryService.addSubCategory(categoryId, subCategoryData);
    res.status(201).json(subCategory);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};
