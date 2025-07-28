import express from 'express';
import { getAnalystSummary } from '../controllers/analystController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const analystRouter = express.Router();

analystRouter.get('/', verifyToken, getAnalystSummary);

export default analystRouter;
