// routes/deliveryRequestRoutes.js
import express from "express";
import {
  createDeliveryRequest,
  getAvailableDeliveriesForDriver,
  acceptDeliveryRequest,
  getRequestsForDriver,getAcceptedDeliveriesForDriver,markDeliveryAsDelivered
} from "../controllers/deliveryRequestController.js";

const router = express.Router();

// Farmer
router.post("/", createDeliveryRequest);
// Driver
router.get("/available", getAvailableDeliveriesForDriver);
router.put("/accept/:requestId", acceptDeliveryRequest);
router.get("/driver/:driverEmail",getRequestsForDriver);
router.get("/driver/accepted/:driverEmail", getAcceptedDeliveriesForDriver);
router.patch("/delivered/:id", markDeliveryAsDelivered);
export default router;
