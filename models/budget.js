import mongoose from 'mongoose';

const BudgetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    enum: ['Food', 'Rent', 'Travel', 'Shopping', 'Bills', 'Entertainment', 'Others'],
    required: true
  },
  month: {
    type: String, // Format: '2025-07'
    required: true
  },
  limit: {
    type: Number,
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Budget', BudgetSchema);
