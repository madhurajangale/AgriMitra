// controllers/cropController.js


import Crop from "../models/Crop.js";
import { storeProductOnChain } from "../blockchain/ProductChain.js";

// ➕ Add a new crop
export const addCrop = async (req, res) => {
  try {
    const {
      name,
      farmer,
      quantity,
      unit,
      market_price,
      delivery_charge,
      category = "Unknown",
    } = req.body;

    // 1️⃣ Validation
    if (!name || !farmer || !quantity || !unit || !market_price || !delivery_charge) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2️⃣ Save to MongoDB first
    const crop = new Crop({
      name,
      farmer,
      quantity,
      unit,
      market_price,
      delivery_charge,
      category,
      status: "ACTIVE", // optional
    });

    const savedCrop = await crop.save();

    // 3️⃣ Store immutable proof on blockchain
    const txHash = await storeProductOnChain({
      name,
      farmer,
      quantity,
      unit,
      market_price,
      delivery_charge,
      category,
    });

    // 4️⃣ Update crop with txHash
    savedCrop.txHash = txHash;
    await savedCrop.save();

    res.status(201).json({
      message: "Crop added & verified on blockchain",
      crop: savedCrop,
      txHash,
    });

  } catch (error) {
    console.error("Add crop error:", error);
    res.status(500).json({ message: "Failed to add crop" });
  }
};

// 📋 Get all crops
// export const getAllCrops = async (req, res) => {
//   try {
//     const crops = await Crop.find().sort({ createdAt: -1 });
//     res.status(200).json(crops);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
export const getAllCrops = async (req, res) => {
  try {
    const { email } = req.query; // Get the farmer email from query params

    if (!email) {
      return res.status(400).json({ message: "Farmer email is required." });
    }

    // Fetch crops where farmer field matches the email
    const crops = await Crop.find({ farmer: email }).sort({ createdAt: -1 });

    if (crops.length === 0) {
      return res.status(404).json({ message: "No crops found for this farmer." });
    }

    res.status(200).json(crops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
