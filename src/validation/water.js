import Joi from 'joi';
import moment from 'moment';
import { isValidObjectId } from 'mongoose';

export const addWaterSchema = Joi.object({
  value: Joi.number().required().min(50).max(5000),
  date: Joi.string()
    .required()
    .custom((value, helper) => {
      return validateDate(value, helper);
    }),
  userId: Joi.string().custom((value, helper) => {
    if (value && !isValidObjectId(value)) {
      return helper.message('User id should be a valid mongo id');
    }
    return true;
  }),
});

export const updateWaterSchema = Joi.object({
  value: Joi.number().min(50).max(5000),
  date: Joi.string().custom((value, helper) => {
    return validateDate(value, helper);
  }),
});

const validateDate = (value, helper) => {
  const isValidDate = moment(value).isValid();
  if (!isValidDate) {
    return helper.message(
      'Date should be a valid date in the format YYYY-MM-DDTHH:mm',
    );
  }
  const parsedDate = moment(value);
  const minDate = moment('1970-01-01');
  const currentDate = moment();

  if (parsedDate.isBefore(minDate) || parsedDate.isAfter(currentDate)) {
    return helper.message(
      `Date should be between ${minDate.format(
        'YYYY-MM-DD',
      )} and ${currentDate.format('YYYY-MM-DD')}`,
    );
  }
  return true;
};
