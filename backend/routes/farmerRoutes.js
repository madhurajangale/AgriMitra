import express from "express";
import { registerFarmer } from "../controllers/farmerController.js";

const router = express.Router();

router.post("/register", registerFarmer);
// router.get("/", getUser);

export default router;
