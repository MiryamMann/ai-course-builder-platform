import express from 'express';
import * as categoryController from '../controllers/category.controller';

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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   subCategories:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         categoryId:
 *                           type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
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
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Productivity
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', categoryController.createCategory);
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
 *         description: The ID of the category to add a subcategory to
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Time Management
 *     responses:
 *       201:
 *         description: Subcategory added successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Category not found
 */
router.post('/:categoryId/subcategories', categoryController.addSubCategory);
export default router;
