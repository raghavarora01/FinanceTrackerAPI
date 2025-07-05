import express from 'express';
import protect from '../middleware/authMiddleware.js';
import {
  getCurrentReport,
  getPastReports
} from '../controllers/reportController.js';

const app = express.Router();

app.get('/current', protect, getCurrentReport);

app.get('/history', protect, getPastReports);

export default app;
