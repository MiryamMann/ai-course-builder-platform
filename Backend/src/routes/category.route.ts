import express from 'express';
import * as categoryController from '../controllers/category.controller';
import { validateBody, validateParams } from '../middlewares/validate';
import { CreateCategorySchema, CreateSubCategorySchema, CategoryIdParamSchema } from '../validations/index';

const router = express.Router();

/**
 * @openapi
 * /api/categories:
 *   get:
 *     tags:
 *       - Category
 *     summary: Get all categories with their subcategories
 *     responses:
 *       200:
 *         description: List of categories
 */
router.get('/', categoryController.getAllCategories);

/**
 * @openapi
 * /api/categories:
 *   post:
 *     tags:
 *       - Category
 *     summary: Create a new category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategory'
 *     responses:
 *       201:
 *         description: Category created successfully
 */
router.post('/', validateBody(CreateCategorySchema), categoryController.createCategory);

/**
 * @openapi
 * /api/categories/{categoryId}/subcategories:
 *   post:
 *     tags:
 *       - Category
 *     summary: Add a subcategory to a category
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSubCategory'
 *     responses:
 *       201:
 *         description: Subcategory added successfully
 */
router.post(
  '/:categoryId/subcategories',
  validateParams(CategoryIdParamSchema),
  validateBody(CreateSubCategorySchema),
  categoryController.addSubCategory
);

export default router;
