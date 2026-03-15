import express from "express";
import { updateCropRating} from "../controllers/ratingController.js";

const router = express.Router();

// Update rating
router.put("/crop/:farmer/:name/rating", updateCropRating);
// routes/ratingRoutes.js

router.get("/rate/crop/:farmer/:name", getCropRating);

export default router;