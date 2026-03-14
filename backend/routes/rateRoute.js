import express from "express";
import { updateCropRating} from "../controllers/ratingController.js";

const router = express.Router();

// Update rating
router.put("/crop/:farmer/:name/rating", updateCropRating);

// Get rating
// router.get("/crop/:farmer/:name/rating", getCropRating);

export default router;