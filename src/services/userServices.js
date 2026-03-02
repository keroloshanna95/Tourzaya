import User from "../models/userModel.js";
import AppError from "../utils/appError.js";

export const getProfileService = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError("User not found", 404);
  return user;
};

export const updateProfileService = async (userId, data) => {
  // Prevent password update from this route
  if (data.password) {
    throw new AppError("This route is not for password updates", 400);
  }
  
  return await User.findByIdAndUpdate(userId, data, {
    new: true,
    runValidators: true,
  });
};

export const changePasswordService = async (userId, oldPassword, newPassword) => {
  const user = await User.findById(userId).select("+password");
  if (!user) throw new AppError("User not found", 404);

  if (!(await user.correctPassword(oldPassword, user.password))) {
    throw new AppError("Incorrect old password", 401);
  }

  user.password = newPassword;
  await user.save();
  return user;
};
