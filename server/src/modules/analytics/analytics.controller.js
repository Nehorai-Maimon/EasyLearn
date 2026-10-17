import { analyticsService } from './analytics.service.js';

/**
 * Controller for analytics & statistics endpoints
 */
export const analyticsController = {
  async getHeatmap(req, res, next) {
    try {
      const data = await analyticsService.getTopicHeatmap();
      res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },

  async getOverview(req, res, next) {
    try {
      const data = await analyticsService.getOverviewStats();
      res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },

  async getTopWorksheets(req, res, next) {
    try {
      const limit = Number(req.query.limit) || 5;
      const data = await analyticsService.getTopWorksheets(limit);
      res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }
};
