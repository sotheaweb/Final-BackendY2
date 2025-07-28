import { Op } from 'sequelize';
import Transaction from '../models/Transaction.js';

export const getMonthlySummary = async (userId, month) => {
  const [year, monthStr] = month.split('-');
  const startDate = new Date(`${year}-${monthStr}-01`);
  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + 1);

  const transactions = await Transaction.findAll({
    where: {
      user_id: userId,
      transaction_date: {
        [Op.gte]: startDate,
        [Op.lt]: endDate,
      },
    },
  });

  let totalIncome = 0;
  let totalExpense = 0;
  const incomeBreakdown = {};
  const expenseBreakdown = {};
  const cashFlow = {};

  transactions.forEach(tx => {
    const amount = parseFloat(tx.amount);
    const day = new Date(tx.transaction_date).getDate();

    if (!cashFlow[day]) cashFlow[day] = 0;

    if (tx.type === 'income') {
      totalIncome += amount;
      incomeBreakdown[tx.category] = (incomeBreakdown[tx.category] || 0) + amount;
      cashFlow[day] += amount;
    } else if (tx.type === 'expense') {
      totalExpense += amount;
      expenseBreakdown[tx.category] = (expenseBreakdown[tx.category] || 0) + amount;
      cashFlow[day] -= amount;
    }
  });

  return {
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense,
    incomeBreakdown,
    expenseBreakdown,
    cashFlow,
  };
};
