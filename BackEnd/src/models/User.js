import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database.js";

const User = sequelize.define('Users', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.TEXT,
    phone_number: DataTypes.TEXT,
    password: DataTypes.STRING
    },
    {
        timestamps: true,
    });

export default User;
