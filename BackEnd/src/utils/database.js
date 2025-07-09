import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,       // correct: database name
    process.env.DB_USER,       // correct: database user
    process.env.DB_PASS || "", // correct: database password
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        port: process.env.PORT,
        logging: false,        // optional: disables SQL logging in console
    }
);

export { sequelize };
