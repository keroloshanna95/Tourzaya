import express from "express";
const router = express.Router();

import { uploadTourImages } from "../middlewares/imgMiddleware.js";
import { createTourValidator } from "../middlewares/tourValidationMiddleware.js";
import { getAllTours, addTour } from "../controllers/tourController.js";
import { protect, restrictTo } from "../auth/authMiddleware.js";

router
  .route("/tours")
  .get(protect, getAllTours)
  .post(
    protect,
    restrictTo("admin"),
    uploadTourImages,
    createTourValidator,
    addTour
  );

// router
//     .route('/tours/:id')
//     .get(getTour)
//     .patch(updateTour)
//     .delete(deleteTour)

export default router;
