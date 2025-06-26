import { Request, Response } from 'express';
import * as categoryService from '../services/category.service';
import { logger } from '../utils/logger';

export const getAllCategories = async (_req: Request, res: Response) => {
  try {
    logger.info('Fetching all categories');
    const categories = await categoryService.getAllCategories();
    logger.info(`Fetched ${categories.length} categories`);
    res.json(categories);
  } catch (error) {
    logger.error(`Failed to fetch categories: ${(error as Error).message}`);
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getAllCategoriesWithSubCategories = async (_req: Request, res: Response) => {
  try {
    logger.info('Fetching all categories with subcategories');
    const categories = await categoryService.getAllCategoriesWithSubCategories();
    logger.info(`Fetched ${categories.length} categories (with subcategories)`);
    res.json(categories);
  } catch (error) {
    logger.error(`Failed to fetch categories with subcategories: ${(error as Error).message}`);
    res.status(500).json({ message: (error as Error).message });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    logger.info(`Creating category with data: ${JSON.stringify(req.body)}`);
    const category = await categoryService.createCategory(req.body);
    logger.info(`Category created successfully: ${category.id}`);
    res.status(201).json(category);
  } catch (error) {
    logger.error(`Failed to create category: ${(error as Error).message}`);
    res.status(400).json({ message: (error as Error).message });
  }
};

export const addSubCategory = async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const subCategoryData = req.body;

  try {
    logger.info(`Adding subcategory to category ${categoryId}, data: ${JSON.stringify(subCategoryData)}`);
    const subCategory = await categoryService.addSubCategory(categoryId, subCategoryData);
    logger.info(`Subcategory added successfully to category ${categoryId}`);
    res.status(201).json(subCategory);
  } catch (error) {
    logger.error(`Failed to add subcategory to category ${categoryId}: ${(error as Error).message}`);
    res.status(400).json({ message: (error as Error).message });
  }
};
