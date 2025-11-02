import express from "express";
import { createRide, getAllRides,getAllRidesforadriver } from "../controllers/rideController.js";

const router = express.Router();

router.post("/create", createRide);
router.get("/all", getAllRides);
router.get("/", getAllRidesforadriver);

export default router;
