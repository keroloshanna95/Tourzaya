import express from "express";
import * as reservationController from "../controllers/reservationController.js";

const router = express.Router();

router
  .route("/")
  .post(reservationController.createReservation)
  .get(reservationController.getAllReservations); // Usually restricted to admin

router
  .route("/my-bookings")
  .get(reservationController.getMyReservations);

router
  .route("/:id/cancel")
  .patch(reservationController.cancelReservation);

export default router;
