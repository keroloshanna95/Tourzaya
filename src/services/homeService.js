import Tour from '../models/tourModel.js';
import TourGuide from '../models/tourGuideModel.js';
import Review from '../models/reviewModel.js';
import User from '../models/userModel.js';

const getTopTours = async(limit = 6) => {
  return await Tour.find({ isFeatured: true })
    .sort({ avgRating: -1 })
    .limit(limit)
    .select("title description adultPrice Days Nights mainImage -_id");
}

async function getTopGuides(limit = 3) {
  return await TourGuide.find({ isFeatured: true })
    .sort({ avgRating: -1 })
    .limit(limit)
    .select('fullName avgRating ratingCount numberOfTours -_id');
    
}

async function getTopReviews(limit = 5) {
  const reviews = await Review.find({ targetType: 'Tour' })
  .sort({ createdAt: -1 })
  .limit(limit)
  .select('rating comment user targetId')
  .populate({
    path: 'user',
    select: 'fullName city country -_id',
  })
  .populate({
    path: 'targetId',
    select: 'title -_id',
  });

const topReviews = reviews.map(r => ({
  rating: r.rating,
  comment: r.comment,
  user: r.user,
  tourTitle: r.targetId?.title,
}));

return topReviews;

};

export async function getHomePageData() {
  const [featuredTours, topGuides, topReviews] = await Promise.all([
    getTopTours(6),
    getTopGuides(3),
    getTopReviews(5),
  ]);

  return {
    featuredTours,
    topGuides,
    topReviews,
  };
}
