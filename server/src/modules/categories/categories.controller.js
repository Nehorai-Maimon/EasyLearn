import { categoriesService } from './categories.service.js';

/**
 * Controller for category and subtopic endpoints
 */
export const categoriesController = {
  async listCategories(req, res, next) {
    try {
      const data = await categoriesService.getAllCategories();
      res.status(200).json({ success: true, count: data.length, data });
    } catch (err) {
      next(err);
    }
  },

  async getCategory(req, res, next) {
    try {
      const { id } = req.params;
      const data = await categoriesService.getCategoryById(id);
      if (!data) {
        return res.status(404).json({ success: false, message: `Category ${id} not found` });
      }
      res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },

  async addCategory(req, res, next) {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({ success: false, message: 'Category name is required' });
      }
      const data = await categoriesService.createCategory(req.body);
      res.status(201).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },

  async editCategory(req, res, next) {
    try {
      const { id } = req.params;
      const data = await categoriesService.updateCategory(id, req.body);
      if (!data) {
        return res.status(404).json({ success: false, message: `Category ${id} not found` });
      }
      res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },

  async removeCategory(req, res, next) {
    try {
      const { id } = req.params;
      const deleted = await categoriesService.deleteCategory(id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: `Category ${id} not found` });
      }
      res.status(200).json({ success: true, message: 'Category deleted successfully' });
    } catch (err) {
      next(err);
    }
  },

  async addSubtopic(req, res, next) {
    try {
      const { id } = req.params;
      const { subtopic } = req.body;
      if (!subtopic) {
        return res.status(400).json({ success: false, message: 'Subtopic name is required' });
      }
      const data = await categoriesService.addSubtopic(id, subtopic);
      if (!data) {
        return res.status(404).json({ success: false, message: `Category ${id} not found` });
      }
      res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },

  async removeSubtopic(req, res, next) {
    try {
      const { id, subtopicName } = req.params;
      const decodedSubtopic = decodeURIComponent(subtopicName);
      const data = await categoriesService.removeSubtopic(id, decodedSubtopic);
      if (!data) {
        return res.status(404).json({ success: false, message: `Category ${id} not found` });
      }
      res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }
};
