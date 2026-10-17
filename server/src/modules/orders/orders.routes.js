import { Router } from 'express';
import { ordersController } from './orders.controller.js';

const router = Router();

// Customer library retrieval ("הדפים שלי")
router.get('/my-library', ordersController.getLibrary);

// Customer checkout
router.post('/', ordersController.placeOrder);

export default router;
