import { Router } from 'express';
import { worksheetsController } from './worksheets.controller.js';

const router = Router();

// Public catalog routes
router.get('/', worksheetsController.listWorksheets);
router.get('/:id', worksheetsController.getWorksheet);

// Admin management routes
router.post('/', worksheetsController.addWorksheet);
router.put('/:id', worksheetsController.editWorksheet);

export default router;
