import express from 'express';
import { getAllTransactions, createTransaction, deleteTransaction } from '../controllers/transectionController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const transectionRouter = express.Router();
transectionRouter.get('/', verifyToken, getAllTransactions);
transectionRouter.post('/create', verifyToken, createTransaction);
transectionRouter.delete('/:id', verifyToken,  deleteTransaction);

export default transectionRouter;
