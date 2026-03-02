import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Reservation must belong to a user"],
    },
    tour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tour",
      required: [true, "Reservation must belong to a tour"],
    },
    tourGuide: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TourGuide",
      },
    ],
    numberOfChildren: Number,
    numberOfAdults: Number,
    meals: Boolean,
    totalPrice: Number,
    phone: String,
    languages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Language",
      },
    ],
    companionNames: [String],
    receiptImgUrl: {
        type: String,
        required: [true, "Please upload the payment receipt image"],
    },
    paymentMethod: {
      type: String,
      enum: ["PayMob", "InstaPay"],
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Reservation", reservationSchema);
