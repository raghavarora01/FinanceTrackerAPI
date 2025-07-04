import express from 'express';
import { setBudget, getBudgets } from '../controllers/budgetController.js';
import protect from '../middleware/authMiddleware.js';

const app = express.Router();

app.post('/budget', protect, setBudget); // Set or update budget
app.get('/budget', protect, getBudgets); // Get budgets

export default app;
