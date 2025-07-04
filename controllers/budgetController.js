import Budget from '../models/budget.js';

export const setBudget = async (req, res) => {
  try {
    const { category, month, limit } = req.body;

    const userId = req.user.id; // from protect middleware

    if (!category || !month || !limit) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existing = await Budget.findOne({ userId, category, month });

    if (existing) {
      // Update existing budget
      existing.limit = limit;
      await existing.save();
      return res.status(200).json({ message: 'Budget updated', budget: existing });
    }

    const budget = await Budget.create({ userId, category, month, limit });
    res.status(201).json({ message: 'Budget set successfully', budget });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getBudgets = async (req, res) => {
  try {
    const userId = req.user.id;
    const { month } = req.query;
    const query = { userId };
    if (month) query.month = month;
    const budgets = await Budget.find(query);
    res.status(200).json(budgets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
