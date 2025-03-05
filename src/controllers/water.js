import { addAmountWater } from '../services/water.js';

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
  res.json({
    status: 200,
    message: 'Sucsesfully  updated amount water',
    // data: data
  });
};

export const deleteAmountWaterController = async (req, res) => {
  res.status(204).send();
};

export const getAmountWaterDayController = async (req, res) => {
  res.json({
    status: 200,
    message: 'Sucsesfully found amount water of the day',
    // data: data
  });
};

export const getAmountWaterMonthController = async (req, res) => {
  res.json({
    status: 200,
    message: 'Sucsesfully found amount water of the month',
    // data: data
  });
};
