import Transaction from '../models/Transaction.js';

export async function getImformation() {
  try {
    const results = await Transaction.findAll();  // SELECT * FROM transactions
    return results;
  } catch (error) {
    console.error("Cannot get data:", error);
    throw error;
  }
}

export async function create(insert) {
  try {
    const transaction = await Transaction.create(insert); // Insert new record
    return transaction;  // returns the whole inserted instance, including id
  } catch (error) {
    console.error("Create error:", error);
    throw error;
  }
}

export async function deleteInfo(id) {
  try {
    const result = await Transaction.destroy({  // Delete record by id
      where: { id }
    });
    return result; // Returns number of rows deleted (0 or 1)
  } catch (error) {
    console.error("Error delete info:", error);
    throw error;
  }
}
