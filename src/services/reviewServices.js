import Review from "../models/reviewModel.js";
import AppError from "../utils/appError.js";

export const createReviewService = async (data) => {
  // Check if review already exists for this user and target
  const existingReview = await Review.findOne({ user: data.user, targetId: data.targetId });
  if (existingReview) {
    throw new AppError("You have already reviewed this", 400);
  }
  return await Review.create(data);
};

export const getReviewsService = async (targetId) => {
  return await Review.find({ targetId }).populate("user", "fullName");
};

export const deleteReviewService = async (id, userId) => {
  const review = await Review.findOneAndDelete({ _id: id, user: userId });
  if (!review) {
    throw new AppError("Review not found or you are not authorized to delete it", 404);
  }
  return review;
};
