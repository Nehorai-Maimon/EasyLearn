import { Router } from 'express';
import { categoriesController } from './categories.controller.js';

const router = Router();

// Category CRUD
router.get('/', categoriesController.listCategories);
router.get('/:id', categoriesController.getCategory);
router.post('/', categoriesController.addCategory);
router.put('/:id', categoriesController.editCategory);
router.delete('/:id', categoriesController.removeCategory);

// Subtopics endpoints
router.post('/:id/subtopics', categoriesController.addSubtopic);
router.delete('/:id/subtopics/:subtopicName', categoriesController.removeSubtopic);

export default router;
