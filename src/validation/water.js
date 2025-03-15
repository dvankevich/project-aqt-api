import Joi from 'joi';
import { DateTime } from 'luxon';
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
  const parsedDate = DateTime.fromISO(value);
  if (!parsedDate.isValid) {
    return helper.message(
      'Date should be a valid date in the format YYYY-MM-DDTHH:mm',
    );
  }

  const minDate = DateTime.fromISO('1970-01-01');
  const localCurrentDateTime = DateTime.local();
  const zoneName = localCurrentDateTime.zoneName;
  const currentDate = localCurrentDateTime.setZone(zoneName).endOf('day');

  // .endOf('day');
  const currentDateInUTC = currentDate.toUTC();
  const parsedDateInUTC = parsedDate.toUTC();

  if (parsedDate < minDate || parsedDate > currentDate) {
    return helper.message(
      `Date should be between ${minDate.toFormat(
        'yyyy-MM-dd',
      )} and ${currentDate.toFormat(
        'yyyy-MM-dd',
      )}, localCurrentDateTime ${localCurrentDateTime.toFormat(
        'yyyy-MM-ddTH:mm',
      )}, currentDateInUTC ${currentDateInUTC.toFormat(
        'yyyy-MM-ddTH:mm',
      )} parsedDateInUTC ${parsedDateInUTC.toFormat(
        'yyyy-MM-ddTH:mm',
      )},parsedDate ${parsedDate.toFormat('yyyy-MM-ddTH:mm')} `,
    );
  }
  return true;
};
