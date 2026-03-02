import Reservation from "../models/reservationModel.js";
import User from "../models/userModel.js";
import Tour from "../models/tourModel.js";

export const getDashboardStatsService = async () => {
  const totalUsers = await User.countDocuments();
  const activeTours = await Tour.countDocuments({ status: "active" });
  
  // Aggregation for total revenue from confirmed reservations (using totalPrice)
  const revenueStats = await Reservation.aggregate([
    { $match: { status: "confirmed" } },
    { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } }
  ]);

  const totalRevenue = revenueStats[0]?.totalRevenue || 0;

  return { totalUsers, activeTours, totalRevenue };
};
