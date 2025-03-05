import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

export const addWaterSchema = Joi.object({
  volume: Joi.number().required(),
  date: Joi.string().required(),
  userId: Joi.string().custom((value, helper) => {
    if (value && !isValidObjectId(value)) {
      return helper.message('User id should be a valid mongo id');
    }
    return true;
  }),
});

export const updateWaterSchema = Joi.object({
  volume: Joi.number(),
  date: Joi.string(),
});
