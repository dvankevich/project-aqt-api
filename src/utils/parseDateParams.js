import createHttpError from 'http-errors';
import moment from 'moment';

const parseDate = (date, minDate, currentDate) => {
  const isString = typeof date === 'string';
  if (!isString)
    throw createHttpError(400, 'Request error: Date should be a string');

  const isValidDate = moment(date).isValid();
  if (!isValidDate) {
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
  const { date } = query;

  const minDate = moment('1970-01-01').format('YYYY-MM-DD');
  const currentDate = moment().format('YYYY-MM-DD');

  const parsedDate = parseDate(date, minDate, currentDate);

  return {
    date: parsedDate,
  };
};

export const parseMonthParams = (query) => {
  const { month } = query;

  const minDate = moment('1970-01').format('YYYY-MM');
  const currentDate = moment().format('YYYY-MM');

  const parsedMonth = parseDate(month, minDate, currentDate);

  return {
    month: parsedMonth,
  };
};
