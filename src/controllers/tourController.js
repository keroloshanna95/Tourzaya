import catchAsync from "../utils/catchAsync.js";
import { getAllToursData, createNewTour } from "../services/tourServices.js";

export const getAllTours = catchAsync(async (req, res, next) => {
  const tours = await getAllToursData();
  return res.status(200).json({
    success: "success",
    message: "Tours data fetched successfully",
    tours,
  });
});

export const addTour = catchAsync(async (req, res, next) => {
  const {
    title,
    description,
    startDate,
    endDate,
    refundDeadline,
    startLocation,
    defaultTourGuide,
    tourGuides,
    tourItinerary,
    adultPrice,
    childrenPrice,
    mealPrice,
    discount,
    totalSeats,
  } = req.body;

  const mainImage = req.files["mainImage"]?.[0]?.path;
  const images = req.files["images"]?.map(f => f.path) || [];

  const parsedTourItinerary = typeof tourItinerary === "string" ? JSON.parse(tourItinerary) : tourItinerary;
  const parsedTourGuides = typeof tourGuides === "string" ? JSON.parse(tourGuides) : tourGuides;

  const newTour = await createNewTour({
    title,
    description,
    startDate,
    endDate,
    refundDeadline,
    startLocation: typeof startLocation === "string" ? JSON.parse(startLocation) : startLocation,
    defaultTourGuide,
    tourGuides: parsedTourGuides,
    tourItinerary: parsedTourItinerary,
    adultPrice,
    childrenPrice,
    mealPrice,
    discount,
    totalSeats,
    mainImage,
    images
  });

  return res.status(201).json({
    success: true,
    message: "New tour added successfully",
    tour: newTour
  });
});
