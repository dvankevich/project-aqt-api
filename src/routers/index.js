import { Router } from 'express';
import authRouter from './user.js';
import waterRouter from './water.js';
import statsRoutes from './stats.js';

const router = Router();

router.use('/users', authRouter);
router.use('/water', waterRouter);

router.use('/stats', statsRoutes);
export default router;
