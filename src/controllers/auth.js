import { UsersCollection } from '../db/models/user.js';
import { registerUser, requestResetToken } from '../services/auth.js';
import { loginUser } from '../services/auth.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  await loginUser(req.body);

  // далі ми доповнемо цей контролер
};

export const requestResetEmailController = async (req, res) => {
  await requestResetToken(req.body.email);
  res.json({
    message: 'Reset password email was successfully sent!',
    status: 200,
    data: {},
  });
};

export const getRegisteredUserController = async (req, res) => {
  const userCount = await UsersCollection.countDocuments();
  res.json({
    message: `Total count of registered users are ${userCount} `,
    status: 200,
  });
};
