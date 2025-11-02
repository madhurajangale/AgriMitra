import Ride from "../models/Ride.js";

export const createRide = async (req, res) => {
  try {
    console.log("reached")
    const ride = new Ride(req.body);
    await ride.save();
    res.status(201).json({ message: "Ride created successfully", ride });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating ride", error });
  }
};

export const getAllRides = async (req, res) => {
  try {
    const rides = await Ride.find();
    res.status(200).json(rides);
  } catch (error) {
    res.status(500).json({ message: "Error fetching rides", error });
  }
};
