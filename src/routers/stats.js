import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getRegisteredUserController } from '../controllers/auth.js';

const router = Router();

router.get(
  '/public/registered-users',
  ctrlWrapper(getRegisteredUserController),
);

export default router;
