import User from "../models/Farmer.js";
import bcrypt from "bcryptjs";
import Crop from "../models/Crop.js";
import Farmer from "../models/Farmer.js";
export const registerFarmer = async (req, res) => {
  try {
    const { name, email, password,role,location } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword , role, location});
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




export const getFarmer = async (req, res) => {
  try {
    const { email } = req.body; 

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





export const getAllFarmers = async (req, res) => {
  try {
    const { location, name } = req.query;

    if (!location || !name) {
      return res.status(400).json({ message: "Location and crop name are required." });
    }

    // Step 1: Find all farmers from the same location
    const farmers = await Farmer.find({ location });
    const farmerMap = {}; // store email → name
    const farmerEmails = farmers.map(f => {
      farmerMap[f.email] = f.name;
      return f.email;
    });

    // Step 2: Find all crops with same name & farmer email in that location
    const crops = await Crop.find({
      name,
      farmer: { $in: farmerEmails },
    }).sort({ createdAt: -1 });

    // Step 3: Attach farmer name to each crop
    const cropsWithFarmer = crops.map(crop => ({
      ...crop._doc,
      farmerName: farmerMap[crop.farmer] || "Unknown Farmer",
    }));

    // Step 4: Send response
    if (cropsWithFarmer.length === 0) {
      return res.status(404).json({ message: "No crops found in this location." });
    }

    res.status(200).json(cropsWithFarmer);
  } catch (error) {
    console.error("Error fetching crops:", error);
    res.status(500).json({ message: "Server error while fetching crops." });
  }
};

