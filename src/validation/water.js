import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

export const addWaterSchema = Joi.object({
  value: Joi.number().required().min(50).max(5000),
  date: Joi.string().required(),
  userId: Joi.string().custom((value, helper) => {
    if (value && !isValidObjectId(value)) {
      return helper.message('User id should be a valid mongo id');
    }
    return true;
  }),
});

export const updateWaterSchema = Joi.object({
  value: Joi.number().min(50).max(5000),
  date: Joi.string(),
});
