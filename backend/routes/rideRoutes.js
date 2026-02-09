import express from "express";
import { createRide, getAllRides, getAllRidesforadriver, assignOrdersToRide,
  acceptAssignOrders,
  rejectAssignOrders, requestAssignOrders } from "../controllers/rideController.js";

const router = express.Router();

router.post("/create", createRide);
router.get("/all", getAllRides);
router.get("/", getAllRidesforadriver);
router.post("/assign-orders", assignOrdersToRide);
router.post("/request-assign", requestAssignOrders);

router.post("/accept-assign", acceptAssignOrders);
router.post("/reject-assign", rejectAssignOrders);

export default router;
