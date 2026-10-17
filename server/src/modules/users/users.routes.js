import { Router } from 'express';
import { usersController } from './users.controller.js';

const router = Router();

// User management endpoints
router.get('/', usersController.listUsers);
router.get('/profile', usersController.getCurrentProfile);
router.post('/', usersController.registerUser);

export default router;
