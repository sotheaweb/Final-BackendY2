import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database.js";

const Transaction = sequelize.define('Transaction', {
  title: DataTypes.STRING,
  type: DataTypes.STRING,
  category: DataTypes.STRING,
  amount: DataTypes.FLOAT,
  transaction_date: DataTypes.DATE,
  remark: DataTypes.STRING,
}, {
  tableName: 'transactions',
  timestamps: false, // if your table doesn't have createdAt, updatedAt
});

export default Transaction;