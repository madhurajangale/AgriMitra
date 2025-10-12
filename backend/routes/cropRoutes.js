// routes/cropRoutes.js
import express from "express";
import { addCrop, getAllCrops } from "../controllers/cropController.js";

const router = express.Router();

// Add a new crop
router.post("/add", addCrop);

// Get all crops
router.get("/get_all", getAllCrops);

export default router;
