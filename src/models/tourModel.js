import mongoose from "mongoose";


const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter the tour title"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please enter the tour description"],
      trim: true,
    }, 
    startDate: {
      type: Date,
      required: [true, "Please enter the tour start date"],
    },
    endDate: {
      type: Date,
      required: [true, "Please enter the tour end date"],
    },
    refundDeadline: {
      type: Date,
      required: [true, "Please enter the refund deadline date"],
    },
    startLocation: {
      city: {
        type: String,
        required: [true, "Please enter the start city"],
      },
      description: String,
    },
    defaultTourGuide: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TourGuide",
    },
    tourGuides: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TourGuide",
      },
    ],
    tourItinerary: [
      {
        city: {
          type: String,
          required: [true, "Please enter the city name"],
        },
        description: String,
        daysSpent: Number,
      },
    ],
    adultPrice: {
      type: Number,
      required: [true, "Please enter the adult price"],
    },
    childrenPrice: {
      type: Number,
      required: [true, "Please enter the children price"],  
    },
    mealPrice: {
      type: Number,
      required: [true, "Please enter the meal price"],
    },
    discount: {
      type: Number,
      default: 0,
    },
    totalSeats: {
      type: Number,
      required: [true, "Please enter the total number of seats"],
    },
    availableSeats: {
      type: Number,
      default: function () { return this.totalSeats; },
    },
    mainImage : {
      type: String,
      required: [true, "Please provide the main image URL"]
    },
    images: [String],
    status: {
      type: String,
      enum: ["active", "inactive", "pending"],
      default: "inactive"
    },
    avgRating: {
      type: Number,
      default: 0,
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

tourSchema.virtual("Days").get(function () {
  if (!this.startDate || !this.endDate) return 0;

  const diff = this.endDate - this.startDate;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
});

tourSchema.virtual("Nights").get(function () {
  if (!this.startDate || !this.endDate) return 0;
  return this.Days - 1;
});

tourSchema.virtual("languages").get(function () {
  const guides = [];

  if (this.defaultTourGuide) guides.push(this.defaultTourGuide);
  if (this.tourGuides?.length) guides.push(...this.tourGuides);

  const langsSet = new Set();

  guides.forEach(guide => {
    if (guide.languages?.length) {
      guide.languages.forEach(lang => langsSet.add(lang));
    }
  });

  return Array.from(langsSet);
});

tourSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.id;
    return ret;
  }
});
tourSchema.set("toObject", {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.id; 
    return ret;
  }
});

export default mongoose.model("Tour", tourSchema);
