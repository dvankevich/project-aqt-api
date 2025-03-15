import createHttpError from 'http-errors';
import { DateTime } from 'luxon';

const parseDate = (date, minDate, currentDate) => {
  const isString = typeof date === 'string';
  if (!isString)
    throw createHttpError(400, 'Request error: Date should be a string');

  const parsedDate = DateTime.fromISO(date);
  if (!parsedDate.isValid) {
    throw createHttpError(400, 'Request error: parameter has an invalid value');
  }

  if (date < minDate || date > currentDate) {
    throw createHttpError(
      400,
      `Date should be between ${minDate} and ${currentDate}`,
    );
  }

  return date;
};

export const parseDateParams = (query) => {
  let { date } = query;
  console.log(date);

  const minDate = DateTime.fromISO('1970-01-01').toFormat('yyyy-MM-dd');
  const currentDate = DateTime.local().toFormat('yyyy-MM-dd');

  if (!date) {
    date = currentDate;
  }
  const parsedDate = parseDate(date, minDate, currentDate);

  return {
    date: parsedDate,
  };
};

export const parseMonthParams = (query) => {
  let { month } = query;

  const minDate = DateTime.fromISO('1970-01').toFormat('yyyy-MM');
  const currentDate = DateTime.local().toFormat('yyyy-MM');

  if (!month) {
    month = currentDate;
  }

  const parsedMonth = parseDate(month, minDate, currentDate);

  return {
    month: parsedMonth,
  };
};
