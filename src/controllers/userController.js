import * as userServices from "../services/userServices.js";
import catchAsync from "../utils/catchAsync.js";
import { sendToken } from "../utils/sendToken.js";

export const getProfile = catchAsync(async (req, res, next) => {
  const userId = req.user ? req.user._id : req.body.user;
  const user = await userServices.getProfileService(userId);
  res.status(200).json({ status: "success", data: { user } });
});

export const updateProfile = catchAsync(async (req, res, next) => {
  const userId = req.user ? req.user._id : req.body.user;
  const user = await userServices.updateProfileService(userId, req.body);
  res.status(200).json({ status: "success", data: { user } });
});

export const changePassword = catchAsync(async (req, res, next) => {
  const userId = req.user ? req.user._id : req.body.user;
  const { oldPassword, newPassword } = req.body;
  
  const user = await userServices.changePasswordService(userId, oldPassword, newPassword);
  
  sendToken(user, 200, res);
});
