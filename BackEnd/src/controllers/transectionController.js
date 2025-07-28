import * as transactionService from "../services/transactionService.js";

// Get All Transactions for logged-in user
export const getAllTransactions = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await transactionService.getAll(userId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions", error });
  }
};

// Create Transaction
export const createTransaction = async (req, res) => {
  try {
    const dataWithUser = {
      ...req.body,
      user_id: req.user.id, // add user ID from token
    };

    const newData = await transactionService.create(dataWithUser);
    res.status(201).json(newData);
  } catch (error) {
    res.status(400).json({ message: "Failed to create transaction", error });
  }
};

//Update transaction
export const updateTransaction = async (req, res) => {
  try {
    const updated = await transactionService.update(
      req.params.id,
      req.body,
      req.user.id
    );

    res.json({ message: "Transaction updated successfully", transaction: updated });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Delete Transaction (you can also restrict to the same user's transaction)
export const deleteTransaction = async (req, res) => {
  try {
    await transactionService.remove(req.params.id, req.user.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: "Transaction not found", error });
  }
};
