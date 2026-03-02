import Reservation from "../models/reservationModel.js";
import Tour from "../models/tourModel.js";
import AppError from "../utils/appError.js";

export const createReservationService = async (data) => {
  const tour = await Tour.findById(data.tour);
  if (!tour) throw new AppError("Tour not found", 404);

  // Example check for availability
  const totalPeople = (data.numberOfAdults || 0) + (data.numberOfChildren || 0);
  if (tour.availableSeats < totalPeople) {
    throw new AppError("Not enough available seats", 400);
  }

  const reservation = await Reservation.create(data);
  
  // Decrease available seats
  tour.availableSeats -= totalPeople;
  await tour.save();

  return reservation;
};

export const getMyReservationsService = async (userId) => {
  return await Reservation.find({ user: userId }).populate("tour");
};

export const cancelReservationService = async (id, userId) => {
  const reservation = await Reservation.findOne({ _id: id, user: userId });
  if (!reservation) throw new AppError("Reservation not found", 404);

  if (reservation.status === "cancelled") {
    throw new AppError("Reservation is already cancelled", 400);
  }

  reservation.status = "cancelled";
  await reservation.save();

  // Restore available seats
  const tour = await Tour.findById(reservation.tour);
  if (tour) {
    const totalPeople = (reservation.numberOfAdults || 0) + (reservation.numberOfChildren || 0);
    tour.availableSeats += totalPeople;
    await tour.save();
  }

  return reservation;
};

export const getAllReservationsService = async () => {
  return await Reservation.find()
    .populate("user", "fullName email")
    .populate("tour", "title");
};
