import { ordersService } from './orders.service.js';

/**
 * Controller for order processing and customer personal library
 */
export const ordersController = {
  async getLibrary(req, res, next) {
    try {
      const { email } = req.query;
      const data = await ordersService.getCustomerLibrary(email);
      res.status(200).json({ success: true, count: data.length, data });
    } catch (err) {
      next(err);
    }
  },

  async placeOrder(req, res, next) {
    try {
      const { customerEmail, items } = req.body;
      if (!customerEmail || !items || !items.length) {
        return res.status(400).json({
          success: false,
          message: 'Customer email and at least one item are required'
        });
      }
      const data = await ordersService.createOrder(req.body);
      res.status(201).json({
        success: true,
        message: 'Order placed successfully',
        data
      });
    } catch (err) {
      next(err);
    }
  }
};
