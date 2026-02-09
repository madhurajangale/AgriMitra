// models/DeliveryRequest.js
import mongoose from "mongoose";

const deliveryRequestSchema = new mongoose.Schema(
  {
    // Ride details (snapshot so it never breaks)
    rideId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ride",
      required: true,
    },

    rideFrom: String,
    rideTo: String,
    rideDate: Date,

    // Farmer who is booking
    farmerEmail: {
      type: String,
      required: true,
    },

    farmerName: {
      type: String,
      required: true,
    },

    // Orders included in this delivery
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true,
      },
    ],

    // Assigned driver (null until accepted)
    driverEmail: {
      type: String,
      default: null,
    },

    // Delivery status
    status: {
      type: String,
      enum: [
        "requested",
        "accepted",
        "picked_up",
        "in_transit",
        "delivered",
        "cancelled",
        "rejected",
      ],
      default: "requested",
    },
  },
  { timestamps: true }
);

export default mongoose.model("DeliveryRequest", deliveryRequestSchema);
