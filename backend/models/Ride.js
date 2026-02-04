import mongoose from "mongoose";

const stopSchema = new mongoose.Schema({
  stopName: {
    type: String,
    required: true,
  },
  pricePerKg: {
    type: Number,
    required: true,
  },
});

const rideSchema = new mongoose.Schema(
  {
    driver:{
      type: String,
      required: true,
    },
    startLocation: {
      type: String,
      required: true,
      trim: true,
    },
    destination: {
      type: String,
      required: true,
      trim: true,
    },
    destPrice: {
      type: Number,
      required: true,
    },
    stops: {
      type: [stopSchema], // array of stops
      validate: (v) => Array.isArray(v) && v.length > 0,
    },
    rideDate: {
      type: Date,
      required: true, // you can make it optional if not mandatory
    },
    rideTime: {
      type: String,
      required: true,
      trim: true,
      match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, // optional regex validation for HH:mm format
    },
    status: {
      type: String,
      enum: ["Open", "Closed"],
      default: "Open",
    },
    capacity: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

export default mongoose.model("Ride", rideSchema);
