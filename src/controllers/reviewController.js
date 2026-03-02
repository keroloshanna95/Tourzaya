import * as reviewServices from "../services/reviewServices.js";
import catchAsync from "../utils/catchAsync.js";

export const createReview = catchAsync(async (req, res, next) => {
  const userId = req.user ? req.user._id : req.body.user;
  req.body.user = userId;
  
  
  if (!req.body.targetId) req.body.targetId = req.params.tourId || req.params.guideId;
  if (!req.body.targetType) req.body.targetType = "Tour";

  const review = await reviewServices.createReviewService(req.body);
  res.status(201).json({ status: "success", data: { review } });
});

export const getReviews = catchAsync(async (req, res, next) => {
  const targetId = req.params.tourId || req.params.guideId || req.body.targetId;
  const reviews = await reviewServices.getReviewsService(targetId);
  res.status(200).json({ status: "success", results: reviews.length, data: { reviews } });
});

export const deleteReview = catchAsync(async (req, res, next) => {
  const userId = req.user ? req.user._id : req.body.user;
  await reviewServices.deleteReviewService(req.params.id, userId);
  res.status(204).json({ status: "success", data: null });
});
