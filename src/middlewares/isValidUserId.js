import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidUserId = (req, res, next) => {
  const { userId } = req.params;
  console.log('userId from isValidUserId', userId);

  if (!isValidObjectId(userId)) {
    throw createHttpError(400, 'Bad Request');
  }

  next();
};
