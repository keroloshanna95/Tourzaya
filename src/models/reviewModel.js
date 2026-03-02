import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    targetType: {
      type: String,
      enum: ["Tour", "TourGuide"],
      required: true,
    },

    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "targetType",
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Please provide a rating between 1 and 5"],
    },

    comment: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);


reviewSchema.index({ targetType: 1, targetId: 1 });


reviewSchema.index(
  { user: 1, targetType: 1, targetId: 1 },
  { unique: true }
);



reviewSchema.statics.calcAverageRatings = async function (targetId, targetType) {
  const stats = await this.aggregate([
    {
      $match: {
        targetId: new mongoose.Types.ObjectId(targetId.toString()),
        targetType,
      },
    },
    {
      $group: {
        _id: "$targetId",
        avgRating: { $avg: "$rating" },
        ratingCount: { $sum: 1 },
      },
    },
  ]);

  const updateData = stats.length
    ? {
        avgRating: Number(stats[0].avgRating.toFixed(1)), 
        ratingCount: stats[0].ratingCount,
      }
    : {
        avgRating: 0,
        ratingCount: 0,
      };

  if (targetType === "Tour") {
    const Tour = mongoose.model("Tour");
    await Tour.findByIdAndUpdate(targetId, updateData);
  }

  if (targetType === "TourGuide") {
    const TourGuide = mongoose.model("TourGuide");
    await TourGuide.findByIdAndUpdate(targetId, updateData);
  }
};



reviewSchema.post("save", async function () {
  await this.constructor.calcAverageRatings(this.targetId, this.targetType);
});


reviewSchema.pre(/^findOneAnd/, async function (next) {
  this._review = await this.findOne();
  next();
});


reviewSchema.post(/^findOneAnd/, async function () {
  if (this._review) {
    await this._review.constructor.calcAverageRatings(
      this._review.targetId,
      this._review.targetType
    );
  }
});

export default mongoose.model("Review", reviewSchema);
