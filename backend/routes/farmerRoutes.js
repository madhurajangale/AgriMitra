import express from "express";
import { registerFarmer,getAllFarmers, getFarmer } from "../controllers/farmerController.js";

const router = express.Router();

router.post("/register", registerFarmer);
router.post("/login", getFarmer);
router.get("/get_all", getAllFarmers);

export default router;
