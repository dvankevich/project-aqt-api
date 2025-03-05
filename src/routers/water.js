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

const router = Router();

router.get('/day', ctrlWrapper(getAmountWaterDayController));
router.get('/month', ctrlWrapper(getAmountWaterMonthController));
router.post(
  '/',
  validateBody(addWaterSchema),
  ctrlWrapper(addAmountWaterController),
);
router.patch(
  '/',
  validateBody(updateWaterSchema),
  ctrlWrapper(updateAmountWaterController),
);
router.delete('/', ctrlWrapper(deleteAmountWaterController));

export default router;
