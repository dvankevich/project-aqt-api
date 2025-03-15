import { notFoundCardHandler } from '../middlewares/notFoundCardHandler.js';
import {
  addAmountWater,
  deleteAmountWater,
  getAmountWaterDay,
  getAmountWaterMonth,
  updateAmountWater,
} from '../services/water.js';
import { parseDateParams, parseMonthParams } from '../utils/parseDateParams.js';

export const addAmountWaterController = async (req, res) => {
  const userId = req.user._id;

  const { body } = req;
  const data = await addAmountWater(body, userId);
  res.status(201).json({
    status: 201,
    message: 'Sucsesfully add amount water',
    data: data,
  });
};

export const updateAmountWaterController = async (req, res) => {
  const userId = req.user._id;
  const { cardId } = req.params;
  const { body } = req;
  const data = await updateAmountWater(body, cardId, userId);

  res.json({
    status: 200,
    message: 'Sucsesfully updated amount water',
    data: data.card,
  });
};

export const deleteAmountWaterController = async (req, res) => {
  const userId = req.user._id;
  const { cardId } = req.params;

  const card = await deleteAmountWater(cardId, userId);

  if (!card) {
    notFoundCardHandler();
  }
  res.json({
    status: 204,
    message: 'Sucsesfully deleted amount water',
    data: card,
  });
};

export const getAmountWaterDayController = async (req, res) => {
  const { date } = parseDateParams(req.query);
  const userId = req.user._id;

  const data = await getAmountWaterDay({ date, userId });
  res.json({
    status: 200,
    message: 'Sucsesfully found amount water of the day',
    data: data,
  });
};

export const getAmountWaterMonthController = async (req, res) => {
  const { month } = parseMonthParams(req.query);
  const userId = req.user._id;

  const data = await getAmountWaterMonth({ userId, month });
  res.json({
    status: 200,
    message: 'Sucsesfully found amount water of the month',
    data: data,
  });
};
