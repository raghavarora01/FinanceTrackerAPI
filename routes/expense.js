import express from 'express';
import protect from '../middleware/authMiddleware.js';
import expenseRoutes from '../controllers/expenseController.js';
const app = express();
app.post('/expense', protect, expenseRoutes.addDetails);
app.get('/expense', protect, expenseRoutes.getDetails);
app.put('/expense/:id', protect, expenseRoutes.updateExpense);
app.delete('/expense/:id', protect, expenseRoutes.deleteExpense);
export default app;