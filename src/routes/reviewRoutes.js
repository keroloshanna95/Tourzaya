import express from "express";
import * as reviewController from "../controllers/reviewController.js";

const router = express.Router({ mergeParams: true }); // e.g., /tours/:tourId/reviews

router
  .route("/")
  .get(reviewController.getReviews)
  .post(reviewController.createReview);

router
  .route("/:id")
  .delete(reviewController.deleteReview);

export default router;
