import { Router } from 'express';
import { analyticsController } from './analytics.controller.js';

const router = Router();

// GET /api/analytics/heatmap - Topic views and demand heatmap
router.get('/heatmap', analyticsController.getHeatmap);

// GET /api/analytics/overview - Overall KPIs (earnings, downloads, active sheets)
router.get('/overview', analyticsController.getOverview);

// GET /api/analytics/top-worksheets - Top performing worksheets ranking
router.get('/top-worksheets', analyticsController.getTopWorksheets);

export default router;
