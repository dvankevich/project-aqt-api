import Joi from 'joi';

export const registerUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const requestResetEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});

<<<<<<< HEAD
export const loginWithGoogleOAuthSchema = Joi.object({
  code: Joi.string().required(),
=======
export const resetPasswordSchema = Joi.object({
  password: Joi.string().required(),
  token: Joi.string().required(),
>>>>>>> main
});
