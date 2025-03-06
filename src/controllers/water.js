import { notFoundCardHandler } from '../middlewares/notFoundCardHandler.js';
import {
  addAmountWater,
  deleteAmountWater,
  getAmountWater,
  updateAmountWater,
} from '../services/water.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

export const addAmountWaterController = async (req, res) => {
  console.log(req.user);
  const userId = req.user._id;

  const { body } = req;
  const data = await addAmountWater(body, userId);
  res.json({
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
  res.status(204).send();
};

export const getAmountWaterDayController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);

  const userId = req.user._id;
  const data = await getAmountWater({ userId, page, perPage });
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
