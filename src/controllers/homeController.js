import { getHomePageData } from "../services/homeService.js";
import  catchAsync  from "../utils/catchAsync.js";

export const getHomePage = catchAsync(async (req, res, next) => {
  const data = await getHomePageData();
    res.status(200).json({
      success: 'success',
      message: "Home page data fetched successfully",
      data,
    });
  }
);
