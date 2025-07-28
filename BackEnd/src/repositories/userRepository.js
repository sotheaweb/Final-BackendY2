import User from "../models/User.js";

export const createUser = async (userData) => {
  return await User.create(userData);
};

export const findUserByUsername = async (username) => {
  return await User.findOne({ where: { username } });
};
