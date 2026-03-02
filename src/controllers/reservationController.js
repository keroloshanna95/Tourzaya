import * as reservationServices from "../services/reservationServices.js";
import catchAsync from "../utils/catchAsync.js";

export const createReservation = catchAsync(async (req, res, next) => {
  
  const userId = req.user ? req.user._id : req.body.user;
  req.body.user = userId;

  const reservation = await reservationServices.createReservationService(req.body);
  res.status(201).json({ status: "success", data: { reservation } });
});

export const getMyReservations = catchAsync(async (req, res, next) => {
  const userId = req.user ? req.user._id : req.body.user;
  const reservations = await reservationServices.getMyReservationsService(userId);
  res.status(200).json({ status: "success", results: reservations.length, data: { reservations } });
});

export const cancelReservation = catchAsync(async (req, res, next) => {
  const userId = req.user ? req.user._id : req.body.user;
  const reservation = await reservationServices.cancelReservationService(req.params.id, userId);
  res.status(200).json({ status: "success", data: { reservation } });
});

export const getAllReservations = catchAsync(async (req, res, next) => {
  const reservations = await reservationServices.getAllReservationsService();
  res.status(200).json({ status: "success", results: reservations.length, data: { reservations } });
});
