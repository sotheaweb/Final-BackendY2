import express from 'express';
import { getAllImformation, create, deleteInfo } from '../controllers/transectionController.js';

const transectionRouter = express.Router();
transectionRouter.get('/', getAllImformation);
transectionRouter.post('/', create);
transectionRouter.delete('/:id', deleteInfo);

export default transectionRouter;
