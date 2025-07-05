import express from 'express';
import authRoutes from './routes/auth.js';
import connectDB from './config/db.js';
import expenseRoute from './routes/expense.js';
import cookieParser from 'cookie-parser';
import bugetRoutes from './routes/budgetRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cookieParser()); 
app.use(cors({
  origin: 'https://finance-tracker-ui-ten.vercel.app',
  credentials: true,
}));

app.set('trust proxy', 1);
app.use('/auth', authRoutes);
app.use('/api', bugetRoutes);
app.use('/api', expenseRoute);
app.use('/api/reports', reportRoutes); 
const PORT = process.env.PORT || 8888;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
connectDB();
export default app;
