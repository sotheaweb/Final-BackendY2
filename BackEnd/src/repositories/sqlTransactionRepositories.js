import Transaction from "../models/Transaction.js";

export const getAllTransactions = async (userId) => {
  return await Transaction.findAll({
    where: { user_id: userId },
    order: [['transaction_date', 'DESC']],
  });
};

export const createTransaction = async (data) => {
  return await Transaction.create(data);
};

//update transaction
export const updateTransaction = async (id, updatedData) => {
  const transaction = await Transaction.findByPk(id);
  if (!transaction) return null;

  await transaction.update(updatedData);
  return transaction;
};


export const deleteTransaction = async (id) => {
  return await Transaction.destroy({ where: { id } });
};

export const getTransactionById = async (id) => {
  return await Transaction.findByPk(id);
};
