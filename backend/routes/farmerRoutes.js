import express from "express";
import { registerFarmer,getFarmer } from "../controllers/farmerController.js";

const router = express.Router();

router.post("/register", registerFarmer);
router.post("/login", getFarmer);

export default router;
