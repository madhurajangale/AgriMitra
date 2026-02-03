import express from "express";
const router = express.Router();
import Order from "../models/Order.js";

// ---------------------------------------------
// CREATE ORDER
// ---------------------------------------------
router.post("/create", async (req, res) => {
  try {
    const {
      customerName,
      mobileNumber,
      address,
      farmerId,
      farmerName,
      item,
      quantity,
      totalPrice,
    } = req.body;

    // Basic validation
    if (
      !customerName ||
      !mobileNumber ||
      !address ||
      !farmerId ||
      !farmerName ||
      !item ||
      !quantity ||
      !totalPrice
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newOrder = new Order({
      customerName,
      mobileNumber,
      address,
      farmerId,
      farmerName,
      item,
      quantity,
      totalPrice,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      message: "Order placed successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({
      message: "Failed to place order",
    });
  }
});

export default router;
