import { usersService } from './users.service.js';

/**
 * Controller handling user-related HTTP endpoints
 */
export const usersController = {
  async listUsers(req, res, next) {
    try {
      const users = await usersService.getAllUsers();
      res.status(200).json({ success: true, count: users.length, data: users });
    } catch (err) {
      next(err);
    }
  },

  async getCurrentProfile(req, res, next) {
    try {
      const email = req.query.email || 'teacher@school.edu.il';
      const user = await usersService.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      res.status(200).json({ success: true, data: user });
    } catch (err) {
      next(err);
    }
  },

  async registerUser(req, res, next) {
    try {
      const { email, name, role } = req.body;
      if (!email || !name) {
        return res.status(400).json({ success: false, message: 'Email and name are required' });
      }
      const created = await usersService.createUser({ email, name, role });
      res.status(201).json({ success: true, data: created });
    } catch (err) {
      next(err);
    }
  }
};
