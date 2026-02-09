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
    driver: {
      type: String,
      required: true,
    },
    startLocation: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    destPrice: {
      type: Number,
      required: true,
    },
    stops: {
      type: [stopSchema],
      required: true,
    },
    rideDate: {
      type: Date,
      required: true,
    },
    rideTime: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number, // remaining capacity in KG
      required: true,
    },
    status: {
      type: String,
      enum: ["Open", "Closed"],
      default: "Open",
    },

    // 🔥 Orders added ONLY after driver accepts
    orders: [
      {
        orderId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Order",
        },
        quantity: Number,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Ride", rideSchema);
