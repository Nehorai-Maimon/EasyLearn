import { Router } from 'express';
import { worksheetsController } from './worksheets.controller.js';

const router = Router();

// Public catalog routes
router.get('/', worksheetsController.listWorksheets);
router.get('/:id', worksheetsController.getWorksheet);

// Admin management routes
router.post('/', worksheetsController.addWorksheet);
router.put('/reorder', worksheetsController.reorderWorksheets);
router.put('/:id', worksheetsController.editWorksheet);
router.delete('/:id', worksheetsController.removeWorksheet);

export default router;
