import { worksheetsService } from './worksheets.service.js';

/**
 * Controller for worksheet endpoints
 */
export const worksheetsController = {
  async listWorksheets(req, res, next) {
    try {
      const { grade, subject, subSubject, search } = req.query;
      const data = await worksheetsService.getAllWorksheets({ grade, subject, subSubject, search });
      res.status(200).json({ success: true, count: data.length, data });
    } catch (err) {
      next(err);
    }
  },

  async getWorksheet(req, res, next) {
    try {
      const { id } = req.params;
      const data = await worksheetsService.getWorksheetById(id);
      if (!data) {
        return res.status(404).json({ success: false, message: `Worksheet ${id} not found` });
      }
      res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },

  async addWorksheet(req, res, next) {
    try {
      const { title, grade, subject, price } = req.body;
      if (!title || !grade || !subject || price === undefined) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields: title, grade, subject, price'
        });
      }
      const data = await worksheetsService.createWorksheet(req.body);
      res.status(201).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },

  async editWorksheet(req, res, next) {
    try {
      const { id } = req.params;
      const data = await worksheetsService.updateWorksheet(id, req.body);
      if (!data) {
        return res.status(404).json({ success: false, message: `Worksheet ${id} not found` });
      }
      res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },

  async reorderWorksheets(req, res, next) {
    try {
      const { orderedIds } = req.body;
      if (!orderedIds || !Array.isArray(orderedIds)) {
        return res.status(400).json({ success: false, message: 'orderedIds array is required' });
      }
      const data = await worksheetsService.reorderWorksheets(orderedIds);
      res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },

  async removeWorksheet(req, res, next) {
    try {
      const { id } = req.params;
      const deleted = await worksheetsService.deleteWorksheet(id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: `Worksheet ${id} not found` });
      }
      res.status(200).json({ success: true, message: 'Worksheet deleted successfully' });
    } catch (err) {
      next(err);
    }
  }
};
