import { Router } from 'express';
import usersRouter from './user.js';
import authRouter from './auth.js';
import waterRouter from './water.js';

const router = Router();

router.use('/users', usersRouter);
router.use('/water', waterRouter);
router.use('/auth', authRouter);

export default router;
