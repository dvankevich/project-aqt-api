import createHttpError from 'http-errors';

export const notFoundCardHandler = (req, res, next) => {
  throw createHttpError(404, 'Card not found');
};
