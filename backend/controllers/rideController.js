import Ride from "../models/Ride.js";
import Order from "../models/Order.js";

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



// Fetch all drivers along with their rides
// controllers/rideController.js
export const getAllRidesforadriver = async (req, res) => {
  try {
    const { driver } = req.query; // ✅ now works with ?driver=email
    const filter = driver ? { driver } : {};
    const rides = await Ride.find(filter);
    res.status(200).json(rides);
  } catch (error) {
    res.status(500).json({ message: "Error fetching rides", error });
  }
};

export const assignOrdersToRide = async (req, res) => {
  try {
    const { rideId, assignments } = req.body;

    if (!rideId || !assignments || Object.keys(assignments).length === 0) {
      return res.status(400).json({
        message: "rideId and assignments are required",
      });
    }

    // Flatten assignments object to get all order IDs
    const orderIds = Object.values(assignments).flat();

    if (orderIds.length === 0) {
      return res.status(400).json({
        message: "At least one order must be selected",
      });
    }

    const ride = await Ride.findById(rideId);
    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }

    // attach orders to ride
    ride.orders = orderIds;
    await ride.save();

    // update orders
    await Order.updateMany(
      { _id: { $in: orderIds } },
      {
        rideId,
        status: "assigned",
      }
    );

    res.status(200).json({
      message: "Orders assigned to ride successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error assigning orders",
      error,
    });
  }
};


