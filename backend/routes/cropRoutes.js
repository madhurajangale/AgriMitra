// routes/cropRoutes.js
import express from "express";
import { addCrop, getAllCrops } from "../controllers/cropController.js";
import Crop from "../models/Crop.js";
import Farmer from "../models/Farmer.js";
const router = express.Router();

// Add a new crop
router.post("/add", addCrop);

// Get all crops
router.get("/get_all", getAllCrops);

export default router;







// -------------------------------------------------
// UPDATE CROP DETAILS
// -------------------------------------------------
router.put("/update/:email/:cropName", async (req, res) => {
  try {
    const { email, cropName } = req.params;
    const { quantity, unit, market_price, delivery_charge } = req.body;

    // 1️⃣ Find farmer using email
    const farmer = await Farmer.findOne({ email });

    if (!farmer) {
      return res.status(404).json({
        message: "Farmer not found",
      });
    }

    const farmerName = farmer.name;
   console.log(farmerName)
   console.log(cropName)
    // 2️⃣ Find crop using farmer name + crop name
    const crop = await Crop.findOne({
      farmer: email,
      name: cropName,
    });

    if (!crop) {
      return res.status(404).json({
        message: "Crop not found for this farmer",
      });
    }

    // 3️⃣ Update fields (only if provided)
    crop.quantity = quantity ?? crop.quantity;
    crop.unit = unit ?? crop.unit;
    crop.market_price = market_price ?? crop.market_price;
    crop.delivery_charge = delivery_charge ?? crop.delivery_charge;

    // 4️⃣ Save updated crop
    const updatedCrop = await crop.save();

    res.status(200).json({
      message: "Crop updated successfully",
      crop: updatedCrop,
    });
  } catch (error) {
    console.error("Crop update error:", error);
    res.status(500).json({
      message: "Failed to update crop",
    });
  }
});