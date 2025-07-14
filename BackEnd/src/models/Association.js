import Transaction from "./Transaction.js";
import User from "./User.js";

User.hasMany(Transaction, {foreignKey: "user_id"});
Transaction.belongsTo(User, {foreignKey: "user_id"});

export{
    User, Transaction
}