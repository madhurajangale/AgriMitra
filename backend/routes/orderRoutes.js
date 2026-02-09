import express from "express";
import {
  createOrder,
  getOrdersByFarmerName,
  getOrdersByFarmerEmail,
  getOrdersByCustomerEmail,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/create", createOrder);
router.get("/farmer/:farmerName", getOrdersByFarmerName);
router.get("/farmer/by-email/:email", getOrdersByFarmerEmail);
router.get("/customer/by-email/:email", getOrdersByCustomerEmail);

export default router;
