import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidCardId = (req, res, next) => {
  const { cardId } = req.params;
  if (!isValidObjectId(cardId)) {
    throw createHttpError(
      400,
      'Bad Request. The provided Card ID is not valid',
    );
  }
  next();
};
