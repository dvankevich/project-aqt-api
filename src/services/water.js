import { waterCollection } from '../db/models/water.js';
import { notFoundCardHandler } from '../middlewares/notFoundCardHandler.js';


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


export const getAmountWaterDay = async ({ date, userId }) => {
  const onlyDate = new Date(date).toISOString().slice(0, 10);

  const databyUser = await waterCollection.find({ userId: userId });

  const filteredData = databyUser.filter((item) => {
    const itemDate = new Date(item.date).toISOString().slice(0, 10);
    return itemDate === onlyDate;
  });

  return filteredData;
};

export const getAmountWaterMonth = async ({ month, userId }) => {
  const onlyMonth = new Date(month).toISOString().slice(0, 7);

  const databyUser = await waterCollection.find({ userId: userId });

  const filteredData = [];

  databyUser.forEach((item) => {
    const itemDate = new Date(item.date).toISOString().slice(0, 7);

    if (itemDate === onlyMonth) {
      filteredData.push(item);
    }
  });

  const dailyWaterAmount = {};

  filteredData.forEach((item) => {
    const day = new Date(item.date).toISOString().slice(0, 10);

    if (dailyWaterAmount[day]) {
      dailyWaterAmount[day] += item.value;
    } else {
      dailyWaterAmount[day] = item.value;
    }
  });

  return dailyWaterAmount;
};
