import Order from "../models/Order.js";
import Farmer from "../models/Farmer.js";
import User from "../models/User.js";

// ---------------------------------------------
// CREATE ORDER
// ---------------------------------------------
export const createOrder = async (req, res) => {
  console.log("reached");
  try {
    const {
      customerName,
      mobileNumber,
      address,
      farmerName,
      item,
      quantity,
      totalPrice,
    } = req.body;

    console.log(req.body);

    // 1️⃣ Validate fields
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

    // 2️⃣ Find farmer by name
    const farmer = await Farmer.findOne({ name: farmerName });

    if (!farmer) {
      return res.status(404).json({
        message: "Farmer not found",
      });
    }

    // 3️⃣ Create order
    const newOrder = new Order({
      customerName,
      mobileNumber,
      address,
      farmerId: farmer._id,
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
};

// ---------------------------------------------
// GET ORDERS BY FARMER NAME
// ---------------------------------------------
export const getOrdersByFarmerName = async (req, res) => {
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
};

// -------------------------------------------------
// GET ORDERS BY FARMER EMAIL
// -------------------------------------------------
export const getOrdersByFarmerEmail = async (req, res) => {
  try {
    const { email } = req.params;
    console.log("farmer email:", email);

    // 1️⃣ Find farmer
    const farmer = await Farmer.findOne({ email });

    if (!farmer) {
      return res.status(404).json({
        message: "Farmer not found",
      });
    }

    // 2️⃣ Find orders
    const orders = await Order.find({ farmerName: farmer.name })
      .sort({ createdAt: -1 });

    if (!orders.length) {
      return res.status(404).json({
        message: "No orders found for this farmer",
      });
    }

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
};

// -------------------------------------------------
// GET ORDERS BY CUSTOMER EMAIL
// -------------------------------------------------
export const getOrdersByCustomerEmail = async (req, res) => {
  try {
    const { email } = req.params;
    console.log("customer email:", email);

    // 1️⃣ Find customer
    const customer = await User.findOne({ email });

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    // 2️⃣ Find orders
    const orders = await Order.find({ customerName: customer.name })
      .sort({ createdAt: -1 });

    if (!orders.length) {
      return res.status(404).json({
        message: "No orders found for this customer",
      });
    }

    res.status(200).json({
      customer: {
        name: customer.name,
        email: customer.email,
      },
      orders,
    });
  } catch (error) {
    console.error("Error fetching customer orders:", error);
    res.status(500).json({
      message: "Failed to fetch customer orders",
    });
  }
};
