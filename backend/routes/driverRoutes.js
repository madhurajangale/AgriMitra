import express from "express";
import { registerDriver, getDriver, getAllDrivers } from "../controllers/driverController.js";

const router = express.Router();

router.post("/register", registerDriver);
router.post("/login", getDriver);
router.get("/", getAllDrivers);

export default router;
