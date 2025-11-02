import express from "express";
import { registerDriver, getDriver } from "../controllers/driverController.js";

const router = express.Router();

router.post("/register", registerDriver);
router.post("/login", getDriver);

export default router;
