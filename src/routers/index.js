import { Router } from 'express';
import usersRouter from './user.js';
import authRouter from './auth.js';
import waterRouter from './water.js';
import statsRoutes from './stats.js';

const router = Router();

router.use('/users', usersRouter);
router.use('/water', waterRouter);
router.use('/stats', statsRoutes);

router.use('/auth', authRouter);

export default router;
