import { waterCollection } from '../db/models/water.js';

export const addAmountWater = async (data) => {
  const card = await waterCollection.create(data);
  return card;
};
export const updateAmountWater = async (data, cardId, options = {}) => {
  const response = await waterCollection.findByIdAndUpdate(
    { _id: cardId },
    data,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );
  const card = response.value;
  const isNew = !response.lastErrorObject.updatedExisting;

  return {
    card,
    isNew,
  };
};
export const deleteAmountWater = async (cardId) => {
  const card = await waterCollection.findByIdAndDelete({ _id: cardId });
  return card;
};
export const getAmountWater = async () => {
  const cards = await waterCollection.find();

  return cards;
};
export const getAmountWaterMonth = () => {};
