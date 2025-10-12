// controllers/cropController.js
import Crop from "../models/Crop.js";

// ➕ Add a new crop
export const addCrop = async (req, res) => {
  try {
    const { name, farmer, quantity, unit, market_price, delivery_charge } = req.body;

    if (!name || !farmer || !quantity || !unit || !market_price || !delivery_charge) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const crop = new Crop({
      name,
      farmer,
      quantity,
      unit,
      market_price,
      delivery_charge,
    });

    await crop.save();
    res.status(201).json({ message: "Crop added successfully", crop });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📋 Get all crops
export const getAllCrops = async (req, res) => {
  try {
    const crops = await Crop.find().sort({ createdAt: -1 });
    res.status(200).json(crops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
