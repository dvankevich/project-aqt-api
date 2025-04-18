import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { addWaterSchema, updateWaterSchema } from '../validation/water.js';
import {
  addAmountWaterController,
  deleteAmountWaterController,
  getAmountWaterDayController,
  getAmountWaterMonthController,
  updateAmountWaterController,
} from '../controllers/water.js';
import { authenticate } from '../middlewares/authenticate.js';
import { isValidCardId } from '../middlewares/isValidCardId.js';

const router = Router();
router.use(authenticate);

router.get('/day', ctrlWrapper(getAmountWaterDayController));
router.get('/month', ctrlWrapper(getAmountWaterMonthController));
router.post(
  '/',
  validateBody(addWaterSchema),
  ctrlWrapper(addAmountWaterController),
);
router.patch(
  '/:cardId',
  isValidCardId,
  validateBody(updateWaterSchema),
  ctrlWrapper(updateAmountWaterController),
);
router.delete(
  '/:cardId',
  isValidCardId,
  ctrlWrapper(deleteAmountWaterController),
);

export default router;
