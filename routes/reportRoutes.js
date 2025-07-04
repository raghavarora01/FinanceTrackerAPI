import express from 'express';
import protect from '../middleware/authMiddleware.js';
import {
  getCurrentReport,
  getPastReports
} from '../controllers/reportController.js';

const app = express.Router();

// 📊 Get current month's dashboard report
app.get('/current', protect, getCurrentReport);

// 📅 Get past 3 months' summary reports
app.get('/history', protect, getPastReports);

export default app;
