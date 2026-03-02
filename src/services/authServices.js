import User from "../models/userModel.js";

export const registerUser = async (user) => {
  const newUser = await User.create(user);
  return newUser;
};

export const loginUser = async (email) => {
  const user = await User.findOne({ email }).select("+password");
  return user;
};
