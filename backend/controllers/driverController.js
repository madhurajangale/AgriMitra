import Driver from "../models/Driver.js";
import bcrypt from "bcryptjs";

export const registerDriver = async (req, res) => {
  try {
    const { name, email, password, address, numberOfVehicles, vehiclePlateNumbers } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required." });
    }

    // Check for existing driver
    const existingDriver = await Driver.findOne({ email });
    if (existingDriver) {
      return res.status(400).json({ message: "Driver already exists." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create driver
    const newDriver = await Driver.create({
      name,
      email,
      password: hashedPassword,
      address: address || "",
      numberOfVehicles: numberOfVehicles || 0,
      vehiclePlateNumbers: vehiclePlateNumbers || [],
    });

    res.status(201).json({
      message: "Driver registered successfully!",
      driver: {
        id: newDriver._id,
        name: newDriver.name,
        email: newDriver.email,
      },
    });
  } catch (error) {
    console.error("Driver registration error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const getDriver = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const driver = await Driver.findOne({ email });

    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    res.json(driver);
  } catch (error) {
    console.error("Error fetching driver:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
