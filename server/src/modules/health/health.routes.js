import { Router } from 'express';
import { getHealthStatus } from './health.controller.js';

const router = Router();

// GET /api/health - Public operational health check
router.get('/', getHealthStatus);

export default router;
