export const getAllToursData = async () => {
  const queryObj = {};

  if (req.query.minPrice || req.query.maxPrice) {
    queryObj.adultPrice = {};
    if (req.query.minPrice)
      queryObj.adultPrice.$gte = Number(req.query.minPrice);
    if (req.query.maxPrice)
      queryObj.adultPrice.$lte = Number(req.query.maxPrice);
  }

  if (req.query.duration) {
    const days = Number(req.query.duration);
    queryObj.$expr = {
      $eq: [
        { $subtract: ["$endDate", "$startDate"] },
        days * 24 * 60 * 60 * 1000,
      ],
    };
  }
  if (req.query.languages) {
    const langs = req.query.languages.split(","); 
    queryObj.languages = { $all: langs };
  }

  if (req.query.minRating) {
    queryObj.avgRating = { $gte: Number(req.query.minRating) };
  }
  const tours = await Tour.find()
    .populate("defaultTourGuide", "name email languages")
    .populate("tourGuides", "name email languages")
    .sort({ createdAt: -1 });
  return tours;
};

export const createNewTour = async (tourData) => {
  const newTour = await Tour.create(tourData);
  return newTour;
};
