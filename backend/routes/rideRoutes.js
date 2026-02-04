import express from "express";
import { createRide, getAllRides, getAllRidesforadriver, assignOrdersToRide } from "../controllers/rideController.js";

const router = express.Router();

router.post("/create", createRide);
router.get("/all", getAllRides);
router.get("/", getAllRidesforadriver);
router.post("/assign-orders", assignOrdersToRide);

export default router;
