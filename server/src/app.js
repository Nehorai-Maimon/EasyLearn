import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import domain modules
import healthRouter from './modules/health/health.routes.js';
import usersRouter from './modules/users/users.routes.js';
import worksheetsRouter from './modules/worksheets/worksheets.routes.js';
import ordersRouter from './modules/orders/orders.routes.js';
import analyticsRouter from './modules/analytics/analytics.routes.js';
import categoriesRouter from './modules/categories/categories.routes.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

// Initialize Express server
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Modular API Endpoints
app.use('/api/health', healthRouter);
app.use('/api/users', usersRouter);
app.use('/api/worksheets', worksheetsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/categories', categoriesRouter);

// Centralized Error Handler
app.use(errorHandler);

export default app;
