import express, { json } from 'express';
import { sequelize } from './utils/database.js';
import cors from 'cors';
import transectionRuter from './routes/transectionRoute.js';
import userRouter from './routes/userRouter.js';
import User from './models/User.js';
import Transaction from './models/Transaction.js';


const app = express();
const PORT = 8180;
app.use(cors())

app.use(json())

//Transactions
app.use('/api/transaction', transectionRuter);

//User
app.use('/api/user', userRouter);


const startServer = async () =>{
    try{
        //Create table in database
        await sequelize.sync({force: false});
        console.log("✅ Database Create Table Success!");
        
        //Run Server
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error("❌ Error syncing database:", error); // ❗ Handle DB error safely
    }
}

startServer();