import { body, validationResult } from "express-validator";

export const createTourValidator = [
  body("title").trim().notEmpty().withMessage("Title is required"),

  body("description").trim().notEmpty(),

  body("startDate").isISO8601().withMessage("Invalid date"),
  body("endDate").isISO8601().withMessage("Invalid date"),
  body("refundDeadline").isISO8601().withMessage("Invalid date"),

  body("startLocation.city")
    .trim()
    .notEmpty()
    .withMessage("Start location city is required"),

  body("defaultTourGuide").isMongoId().withMessage("Invalid tour guide ID"),

  body("tourGuides")
    .isArray({ min: 1 })
    .withMessage("At least one tour guide is required"),
  body("tourGuides.*").isMongoId().withMessage("Invalid tour guide ID"),

  body("tourItinerary")
    .isArray({ min: 1 })
    .withMessage("Itinerary is required"),
  body("tourItinerary.*.city").notEmpty().withMessage("City is required"),
  body("tourItinerary.*.description").trim(),
  body("tourItinerary.*.daysSpent")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Days spent must be a positive integer"),

  body("adultPrice")
    .isFloat({ gt: 0 })
    .withMessage("Adult price must be a positive number"),
  body("childrenPrice")
    .isFloat({ gt: 0 })
    .withMessage("Children price must be a positive number"),
  body("mealPrice")
    .isFloat({ gt: 0 })
    .withMessage("Meal price must be a positive number"),
  body("discount")
    .isFloat({ min: 0 })
    .withMessage("Discount must be a positive number"),

  body("totalSeats")
    .isInt({ min: 1 })
    .withMessage("Total seats must be at least 1"),

  body("mainImage").notEmpty().withMessage("Main image is required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    next();
  },
];
