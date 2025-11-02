import express from "express";
import { createRide, getAllRides } from "../controllers/rideController.js";

const router = express.Router();

router.post("/create", createRide);
router.get("/all", getAllRides);

export default router;
