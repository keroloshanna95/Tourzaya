import * as adminServices from "../services/adminServices.js";
import catchAsync from "../utils/catchAsync.js";

export const getDashboardStats = catchAsync(async (req, res, next) => {
  const stats = await adminServices.getDashboardStatsService();
  res.status(200).json({ status: "success", data: { stats } });
});
