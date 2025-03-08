import { waterCollection } from '../db/models/water.js';
import { notFoundCardHandler } from '../middlewares/notFoundCardHandler.js';
import { paginationData } from '../utils/calculatePaginationData.js';

export const addAmountWater = async (data, userId) => {
  const card = await waterCollection.create({ ...data, userId });
  return card;
};

export const updateAmountWater = async (data, cardId, userId, options = {}) => {
  const response = await waterCollection.findOneAndUpdate(
    { _id: cardId, userId: userId },
    data,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );
  const card = response.value;
  const isNew = !response.lastErrorObject.updatedExisting;
  if (!card) {
    notFoundCardHandler();
  }

  return {
    card,
    isNew,
  };
};
export const deleteAmountWater = async (cardId, userId) => {
  const card = await waterCollection.findOneAndDelete({ _id: cardId, userId });
  return card;
};
export const getAmountWater = async ({ userId, page, perPage }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const cardsByUser = waterCollection.find({ userId: userId });
  const cardsQuery = waterCollection.find();

  const cardsCount = await waterCollection
    .find()
    .merge(cardsByUser)
    .merge(cardsQuery)
    .countDocuments();

  const cards = await cardsQuery.merge(cardsByUser).limit(limit).skip(skip);

  const paginData = paginationData(page, perPage, cardsCount);

  return { data: cards, ...paginData };
};

export const getAmountWaterDay = () => {};
export const getAmountWaterMonth = () => {};
