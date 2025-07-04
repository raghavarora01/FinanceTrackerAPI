
// import Expense from "../models/expense.js";
// import Budget from "../models/budget.js";

// // 🔹 Add a new expense
// //  const addDetails = async (req, res) => {
// //   try {
// //     const { Amount, Category, Date, Payment_Method, Notes } = req.body;

// //     if (!Amount || !Category || !Date || !Payment_Method) {
// //       return res.status(400).json({ message: 'All required fields must be filled' });
// //     }

// //     const expense = await Expense.create({
// //       Amount,
// //       Category,
// //       Date,
// //       Payment_Method,
// //       Notes,
// //       userId: req.user.id, // 👈 associate with logged-in user
// //     });

// //     res.status(201).json({
// //       message: 'Details added successfully',
// //       expense,
// //     });
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// const addDetails = async (req, res) => {
//   try {
//     const { Amount, Category, Date: dateInput, Payment_Method, Notes } = req.body;

//     if (!Amount || !Category || !dateInput || !Payment_Method) {
//       return res.status(400).json({ message: "All required fields must be filled" });
//     }

//     const parsedDate = new Date(dateInput);
//     if (isNaN(parsedDate)) {
//       return res.status(400).json({ message: "Invalid date format" });
//     }

//     const expense = await Expense.create({
//       Amount,
//       Category,
//       Date: parsedDate,
//       Payment_Method,
//       Notes,
//       userId: req.user.id,
//     });

//     // 🗓️ Extract YYYY-MM for budget month
//     const currentMonth = parsedDate.toISOString().slice(0, 7);

//     // 🔍 Find matching budget
//     const budget = await Budget.findOne({
//       userId: req.user.id,
//       category: Category,
//       month: currentMonth,
//     });

//     let warning = null;
//     let spent = 0;
//     let percent = 0;

//     if (budget) {
//       const expenses = await Expense.aggregate([
//         {
//           $match: {
//             userId: req.user.id,
//             Category: Category,
//             Date: {
//               $gte: new Date(`${currentMonth}-01T00:00:00Z`),
//               $lte: new Date(`${currentMonth}-31T23:59:59Z`),
//             },
//           },
//         },
//         {
//           $group: {
//             _id: null,
//             total: { $sum: "$Amount" },
//           },
//         },
//       ]);

//       spent = expenses[0]?.total || 0;
//       percent = (spent / budget.limit) * 100;

//       // 🪵 Debug Logs
//       console.log("📊 Budget limit:", budget.limit);
//       console.log("💸 Total spent:", spent);
//       console.log("📈 Percent used:", percent.toFixed(2));

//       // ⚠️ Warning logic
//       if (percent >= 100) {
//         warning = `⚠️ You have exceeded your ₹${budget.limit} budget for ${Category}.`;
//       } else if (percent >= 80) {
//         warning = `⚠️ You have used ${percent.toFixed(2)}% of your ₹${budget.limit} budget for ${Category}.`;
//       }
//     }

//     res.status(201).json({
//       message: "Details added successfully",
//       expense,
//       ...(warning && {
//         warning,
//         budgetLimit: budget?.limit,
//         totalSpent: spent,
//         percentUsed: percent.toFixed(2),
//       }),
//     });
//   } catch (err) {
//     console.error("🚨 Error adding expense:", err.message);
//     res.status(500).json({ message: err.message });
//   }
// };



// // 🔹 Get all expenses for the logged-in user
//  const getDetails = async (req, res) => {
//   try {
//     const expenses = await Expense.find({ userId: req.user.id }); // 👈 only this user's data
//     res.status(200).json(expenses);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
// const updateExpense = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updates = req.body;

//     const expense = await Expense.findOne({ _id: id, userId: req.user.id });
//     if (!expense) {
//       return res.status(404).json({ message: 'Expense not found or unauthorized' });
//     }

//     Object.assign(expense, updates);
//     await expense.save();

//     res.status(200).json({ message: 'Expense updated successfully', expense });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


// const deleteExpense = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const expense = await Expense.findOneAndDelete({ _id: id, userId: req.user.id });
//     if (!expense) {
//       return res.status(404).json({ message: 'Expense not found or unauthorized' });
//     }

//     res.status(200).json({ message: 'Expense deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


// export default {
//   addDetails,
//   getDetails,
//   updateExpense,
//   deleteExpense,
// };



// import Expense from "../models/expense.js";
// import Budget from "../models/budget.js";

// // 🔹 Add a new expense
// const addDetails = async (req, res) => {
//   try {
//     const { Amount, Category, Date: dateInput, Payment_Method, Notes } = req.body;

//     if (!Amount || !Category || !dateInput || !Payment_Method) {
//       return res.status(400).json({ message: "All required fields must be filled" });
//     }

//     const parsedDate = new Date(dateInput);
//     if (isNaN(parsedDate)) {
//       return res.status(400).json({ message: "Invalid date format" });
//     }

//     const expense = await Expense.create({
//       Amount,
//       Category,
//       Date: parsedDate,
//       Payment_Method,
//       Notes,
//       userId: req.user.id,
//     });

//     // 🗓️ Extract YYYY-MM for matching budget
//     const currentMonth = parsedDate.toISOString().slice(0, 7);

//     // 🔍 Find matching budget document
//     const budget = await Budget.findOne({
//       userId: req.user.id,
//       category: Category,
//       month: currentMonth,
//     });

//     let warning = null;
//     let spent = 0;
//     let percent = 0;

//     if (budget) {
//       const expenses = await Expense.aggregate([
//         {
//           $match: {
//             userId: expense.userId,
//             Category,
//             Date: {
//               $gte: new Date(`${currentMonth}-01T00:00:00.000Z`),
//               $lte: new Date(`${currentMonth}-31T23:59:59.999Z`)
//             }
//           }
//         },
//         {
//           $group: {
//             _id: null,
//             total: { $sum: "$Amount" }
//           }
//         }
//       ]);

//       spent = expenses[0]?.total || 0;
//       percent = (spent / budget.limit) * 100;

//       // 🪵 Debug Logs (optional)
//       console.log("📊 Budget limit:", budget.limit);
//       console.log("💸 Total spent:", spent);
//       console.log("📈 Percent used:", percent.toFixed(2));

//       // ⚠️ Alert logic
//       if (percent >= 100) {
//         warning = `⚠️ You have exceeded your ₹${budget.limit} budget for ${Category}.`;
//       } else if (percent >= 80) {
//         warning = `⚠️ You have used ${percent.toFixed(2)}% of your ₹${budget.limit} budget for ${Category}.`;
//       }
//     }

//     res.status(201).json({
//       message: "Details added successfully",
//       expense,
//       ...(warning && {
//         warning,
//         budgetLimit: budget?.limit,
//         totalSpent: spent,
//         percentUsed: percent.toFixed(2),
//       }),
//     });
//   } catch (err) {
//     console.error("🚨 Error adding expense:", err.message);
//     res.status(500).json({ message: err.message });
//   }
// };

// // 🔹 Get all expenses
// const getDetails = async (req, res) => {
//   try {
//     const expenses = await Expense.find({ userId: req.user.id });
//     res.status(200).json(expenses);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // 🔹 Update expense
// const updateExpense = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updates = req.body;

//     const expense = await Expense.findOne({ _id: id, userId: req.user.id });
//     if (!expense) {
//       return res.status(404).json({ message: 'Expense not found or unauthorized' });
//     }

//     Object.assign(expense, updates);
//     await expense.save();

//     res.status(200).json({ message: 'Expense updated successfully', expense });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // 🔹 Delete expense
// const deleteExpense = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const expense = await Expense.findOneAndDelete({ _id: id, userId: req.user.id });
//     if (!expense) {
//       return res.status(404).json({ message: 'Expense not found or unauthorized' });
//     }

//     res.status(200).json({ message: 'Expense deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// export default {
//   addDetails,
//   getDetails,
//   updateExpense,
//   deleteExpense,
// };



import Expense from "../models/expense.js";
import Budget from "../models/budget.js";
import { syncSummaryToPostgres } from "./reportController.js"; // 🔄 Sync to SQL

// 🔹 Add a new expense
const addDetails = async (req, res) => {
  try {
    const { Amount, Category, Date: dateInput, Payment_Method, Notes } = req.body;

    if (!Amount || !Category || !dateInput || !Payment_Method) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const parsedDate = new Date(dateInput);
    if (isNaN(parsedDate)) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    const expense = await Expense.create({
      Amount,
      Category,
      Date: parsedDate,
      Payment_Method,
      Notes,
      userId: req.user.id,
    });

    // 🗓️ Extract YYYY-MM for matching budget
    const currentMonth = parsedDate.toISOString().slice(0, 7);

    // 🔍 Find matching budget document
    const budget = await Budget.findOne({
      userId: req.user.id,
      category: Category,
      month: currentMonth,
    });

    let warning = null;
    let spent = 0;
    let percent = 0;

    if (budget) {
      const expenses = await Expense.aggregate([
        {
          $match: {
            userId: expense.userId,
            Category,
            Date: {
              $gte: new Date(`${currentMonth}-01T00:00:00.000Z`),
              $lte: new Date(`${currentMonth}-31T23:59:59.999Z`)
            }
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$Amount" }
          }
        }
      ]);

      spent = expenses[0]?.total || 0;
      percent = (spent / budget.limit) * 100;

      if (percent >= 100) {
        warning = `⚠️ You have exceeded your ₹${budget.limit} budget for ${Category}.`;
      } else if (percent >= 80) {
        warning = `⚠️ You have used ${percent.toFixed(2)}% of your ₹${budget.limit} budget for ${Category}.`;
      }
    }

    // 🔄 Sync to SQL
    await syncSummaryToPostgres(req.user.id);

    res.status(201).json({
      message: "Details added successfully",
      expense,
      ...(warning && {
        warning,
        budgetLimit: budget?.limit,
        totalSpent: spent,
        percentUsed: percent.toFixed(2),
      }),
    });
  } catch (err) {
    console.error("🚨 Error adding expense:", err.message);
    res.status(500).json({ message: err.message });
  }
};

// 🔹 Get all expenses
const getDetails = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id });
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔹 Update expense
const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const expense = await Expense.findOne({ _id: id, userId: req.user.id });
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found or unauthorized' });
    }

    Object.assign(expense, updates);
    await expense.save();

    // 🔄 Sync to SQL
    await syncSummaryToPostgres(req.user.id);

    res.status(200).json({ message: 'Expense updated successfully', expense });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔹 Delete expense
const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found or unauthorized' });
    }

    // 🔄 Sync to SQL
    await syncSummaryToPostgres(req.user.id);

    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default {
  addDetails,
  getDetails,
  updateExpense,
  deleteExpense,
};
