import express from "express";
const router = express.Router();
import Order from "../models/Order.js";
import Farmer from "../models/Farmer.js";
// ---------------------------------------------
// CREATE ORDER
// ---------------------------------------------
router.post("/create", async (req, res) => {
  console.log("reached")
  try {
    const {
      customerName,
      mobileNumber,
      address,
      farmerName,   // ✅ from frontend
      item,
      quantity,
      totalPrice,
    } = req.body;
    console.log(req.body)
    // 1️⃣ Validate basic fields
    if (
      !customerName ||
      !mobileNumber ||
      !address ||
      !farmerName ||
      !item ||
      !quantity ||
      !totalPrice
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    
    // 2️⃣ Find farmer using email
    const farmer = await Farmer.findOne({ name: farmerName });
    
    if (!farmer) {
      return res.status(404).json({
        message: "Farmer not found",
      });
    }

    // 3️⃣ Create order using REAL farmer._id
    const newOrder = new Order({
      customerName,
      mobileNumber,
      address,
      farmerId: farmer._id,   // ✅ authoritative ID
      farmerName: farmer.name,
      item,
      quantity,
      totalPrice,
    });

    // 4️⃣ Save order
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



// ---------------------------------------------
// GET ORDERS BY FARMER NAME
// ---------------------------------------------
router.get("/farmer/:farmerName", async (req, res) => {
  try {
    const { farmerName } = req.params;

    const orders = await Order.find({ farmerName }).sort({ createdAt: -1 });

    if (!orders.length) {
      return res.status(404).json({
        message: "No orders found for this farmer",
      });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Fetch farmer orders error:", error);
    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
});
// -------------------------------------------------
// GET ORDERS BY FARMER EMAIL (email -> farmerId)
// -------------------------------------------------
router.get("/farmer/by-email/:email", async (req, res) => {
  try {
    const { email } = req.params;
    console.log("email:", email);

    // 1️⃣ Find farmer using email
    const farmer = await Farmer.findOne({ email });

    if (!farmer) {
      return res.status(404).json({
        message: "Farmer not found",
      });
    }

    const farmerName = farmer.name;

    // 2️⃣ Find orders using farmerName
    const orders = await Order.find({ farmerName })
      .sort({ createdAt: -1 });

    if (!orders.length) {
      return res.status(404).json({
        message: "No orders found for this farmer",
      });
    }

    // 3️⃣ Send response
    res.status(200).json({
      farmer: {
        name: farmer.name,
        email: farmer.email,
      },
      orders,
    });
  } catch (error) {
    console.error("Error fetching farmer orders:", error);
    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
});
