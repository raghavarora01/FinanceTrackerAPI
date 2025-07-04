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
  origin: 'http://localhost:3000',
  credentials: true,
}));
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
// import express from 'express';
// import dotenv from 'dotenv';
// import cookieParser from 'cookie-parser';

// import connectDB from './config/db.js';
// // import connectPostgres from './config/postgres.js'; // 🟡 Optional: if you want to test Postgres connection on startup

// import authRoutes from './routes/auth.js';
// import expenseRoutes from './routes/expense.js';
// import budgetRoutes from './routes/budgetRoutes.js';
// import reportRoutes from './routes/reportRoutes.js'; // 🆕 Added for dashboard

// dotenv.config(); // Load .env

// const app = express();
// const PORT = process.env.PORT || 8888;

// // 🔧 Middleware
// app.use(express.json());
// app.use(cookieParser());

// // 📦 Routes
// app.use('/auth', authRoutes);
// app.use('/api/expenses', expenseRoutes);
// app.use('/api/budgets', budgetRoutes);
// app.use('/api/reports', reportRoutes); // 🆕 Dashboard routes

// // 🚀 Start server
// app.listen(PORT, () => {
//   console.log(`✅ Server running on port ${PORT}`);
// });

// // 🔌 Connect to Databases
// connectDB();        // MongoDB
//   // PostgreSQL
