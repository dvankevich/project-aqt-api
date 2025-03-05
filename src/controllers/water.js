import { notFoundCardHandler } from '../middlewares/notFoundCardHandler.js';
import {
  addAmountWater,
  deleteAmountWater,
  getAmountWater,
  updateAmountWater,
} from '../services/water.js';

export const addAmountWaterController = async (req, res) => {
  const { body } = req;
  const data = await addAmountWater(body);
  res.json({
    status: 201,
    message: 'Sucsesfully add amount water',
    data: data,
  });
};

export const updateAmountWaterController = async (req, res) => {
  const { cardId } = req.params;
  console.log(cardId);

  const { body } = req;
  const data = await updateAmountWater(body, cardId);
  res.json({
    status: 200,
    message: 'Sucsesfully updated amount water',
    data: data.card,
  });
};

export const deleteAmountWaterController = async (req, res) => {
  const { cardId } = req.params;

  const card = await deleteAmountWater(cardId);
  if (!card) {
    notFoundCardHandler();
  }
  res.status(204).send();
};

export const getAmountWaterDayController = async (req, res) => {
  const data = await getAmountWater();
  res.json({
    status: 200,
    message: 'Sucsesfully found amount water of the day',
    data: data,
  });
};

export const getAmountWaterMonthController = async (req, res) => {
  res.json({
    status: 200,
    message: 'Sucsesfully found amount water of the month',
    // data: data
  });
};
