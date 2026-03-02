import mongoose from "mongoose";

const languageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the language name"],
      unique: [true, "Language already exists"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Language", languageSchema);
