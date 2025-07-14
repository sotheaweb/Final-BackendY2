import * as sqlTransaction from "../repositories/sqlTransactionRepositories.js";

export const getAll = async (userId) => {
  return await sqlTransaction.getAllTransactions(userId);
};

export const create = async (data) => {
  return await sqlTransaction.createTransaction(data);
};

export const remove = async (id, userId) => {
  const existing = await sqlTransaction.getTransactionById(id);
  if (!existing) throw new Error("Transaction not found");

  if (existing.user_id !== userId) {
    throw new Error("Not authorized to delete this transaction");
  }
  return await sqlTransaction.deleteTransaction(id);
};
