import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUserSchema,
  registerUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validation/auth.js';
import {
  getCountUsersController,
  infoUserController,
  loginUserController,
  logoutUserController,
  patchUserController,
  refreshUserSessionController,
  registerUserController,
  requestResetEmailController,
  resetPasswordController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post('/logout', ctrlWrapper(logoutUserController));

router.post(
  '/request-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);

router.post(
  '/reset-password',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

router.post('/refresh', ctrlWrapper(refreshUserSessionController));

router.get('/userinfo', authenticate, ctrlWrapper(infoUserController));

router.get('/count', ctrlWrapper(getCountUsersController));

router.patch(
  '/userinfo',
  authenticate,
  upload.single('photo'),
  ctrlWrapper(patchUserController),
);

router.patch(
  '/photo',
  authenticate,
  upload.single('photo'),
  ctrlWrapper(patchUserController),
);

export default router;
