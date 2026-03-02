import mongoose, { get } from "mongoose";

const tourGuideSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please enter your full name"],
      get: capitalizeFirstLetter,
    },
    
    age: {
      type: Number,
      require : [true, "Please enter your age"],
    },
    
    nationalIdImg: {
      type: String,
      required: [true, "Please upload Tourguide national ID"],
    },

    bio: String,

    avatar: {
      type: String,
      required: [true, "Please upload Tourguide profile image"],
    },
    languages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Language",
        required: [true, "Please enter at least one language"],
      },
    ],
    avgRating: {
      type: Number,
      default: 0,
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
    
    numberOfTours: Number,
    yearsOfExperience: Number,

    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

function capitalizeFirstLetter(v) {
  return v.charAt(0).toUpperCase() + v.substring(1);
}

export default mongoose.model("TourGuide", tourGuideSchema);
