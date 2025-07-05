import { Pool } from 'pg';
import mongoose from 'mongoose';
import Expense from '../models/expense.js';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export const syncSummaryToPostgres = async (userId) => {
  try {
    const now = new Date();
    const currentMonth = now.toISOString().slice(0, 7);

    const start = new Date(`${currentMonth}-01T00:00:00Z`);
    const end = new Date(`${currentMonth}-31T23:59:59Z`);

    const expenses = await Expense.find({
      userId: new mongoose.Types.ObjectId(userId),
      Date: { $gte: start, $lte: end },
    });

    const totalSpent = expenses.reduce((acc, e) => acc + e.Amount, 0);

    const categoryMap = {};
    const paymentMap = {};
    for (let exp of expenses) {
      categoryMap[exp.Category] = (categoryMap[exp.Category] || 0) + exp.Amount;
      paymentMap[exp.Payment_Method] = (paymentMap[exp.Payment_Method] || 0) + 1;
    }

    const topCategory = Object.entries(categoryMap).sort((a, b) => b[1] - a[1])[0]?.[0] || null;
    const topPayments = Object.entries(paymentMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([method]) => method);

    const overbudgetCategories = [];

    await pool.query(
      `INSERT INTO monthly_reports (user_id, month, total_spent, top_category, top_payment_methods, overbudget_categories)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (user_id, month)
       DO UPDATE SET total_spent = $3, top_category = $4, top_payment_methods = $5, overbudget_categories = $6;`,
      [
        userId,
        currentMonth,
        totalSpent,
        topCategory,
        topPayments,
        overbudgetCategories,
      ]
    );
  } catch (err) {
    console.error('Postgres sync failed:', err.message);
  }
};

export const getCurrentReport = async (req, res) => {
  try {
    const userId = req.user.id;
    const currentMonth = new Date().toISOString().slice(0, 7);

    const { rows } = await pool.query(
      'SELECT * FROM monthly_reports WHERE user_id = $1 AND month = $2',
      [userId, currentMonth]
    );

    res.status(200).json(rows[0] || {});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPastReports = async (req, res) => {
  try {
    const userId = req.user.id;
    const { rows } = await pool.query(
      `SELECT * FROM monthly_reports
       WHERE user_id = $1
       ORDER BY month DESC
       LIMIT 3`,
      [userId]
    );

    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
