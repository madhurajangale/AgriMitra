// Customer
// Farmer
// Item
//Quantity
//status
//total price
//address
//mobile number

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    // Customer details
    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    mobileNumber: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    // Farmer details
    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farmer",
      required: true,
    },

    farmerName: {
      type: String,
      required: true,
    },

    // Item details
    item: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    // Order status
    status: {
      type: String,
      enum: ["pending", "confirmed", "delivered", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

module.exports = mongoose.model("Order", orderSchema);
