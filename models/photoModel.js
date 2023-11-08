import mongoose from "mongoose";

const { Schema } = mongoose;

const photoSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  descripiton: {
    type: String,
    required: true,
    trim: true,
  },
  uplodadedAt: {
    type: Date,
    default: Date.now,
  },
});

const Photo = mongoose.model("Photo", photoSchema);

export default Photo;
