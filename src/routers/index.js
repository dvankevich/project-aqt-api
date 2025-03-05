import { Router } from 'express';
import authRouter from './user.js';

const router = Router();

router.use('/users', authRouter);

export default router;
