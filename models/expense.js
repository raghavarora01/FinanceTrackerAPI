import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
  Amount: {
    type: Number,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    required: true,
  },
  Payment_Method: {
    type: String,
    required: true,
  },
  Notes: {
    type: String,
    default: "",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Expense = mongoose.model("Expense", ExpenseSchema);
export default Expense;
