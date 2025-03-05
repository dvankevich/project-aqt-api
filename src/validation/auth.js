import Joi from 'joi';

export const registerUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
