import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database.js";

const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: DataTypes.STRING,
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  transaction_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  remark: DataTypes.STRING,
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false, 
  },
}, {
  tableName: 'transactions',
  timestamps: true, 
});


export default Transaction;
