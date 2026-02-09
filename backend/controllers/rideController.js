import Ride from "../models/Ride.js";
import Order from "../models/Order.js";
import DeliveryRequest from "../models/DeliveryRequest.js";

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

    // 1️⃣ Flatten orders with quantity
    const selectedOrders = Object.values(assignments).flat();

    if (selectedOrders.length === 0) {
      return res.status(400).json({
        message: "At least one order must be selected",
      });
    }

    // 2️⃣ Calculate total kg
    const totalKg = selectedOrders.reduce(
      (sum, o) => sum + Number(o.quantity),
      0
    );

    // 3️⃣ Find existing ride
    const ride = await Ride.findById(rideId);
    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }

    // 4️⃣ Check capacity
    if (totalKg > ride.capacity) {
      return res.status(400).json({
        message: `Capacity exceeded. Available: ${ride.capacity} kg`,
      });
    }

    // 5️⃣ Extract order IDs
    const orderIds = selectedOrders.map(o => o.orderId);

    // 6️⃣ Attach orders & reduce capacity
    ride.orders.push(...orderIds);
    ride.capacity -= totalKg;

    await ride.save();

    // 7️⃣ Update orders
    await Order.updateMany(
      { _id: { $in: orderIds } },
      {
        rideId,
        status: "assigned",
      }
    );

    res.status(200).json({
      message: "Orders assigned to ride successfully",
      remainingCapacity: ride.capacity,
      destPrice: ride.destPrice,
    });

  } catch (error) {
    console.error("Assign orders error:", error);
    res.status(500).json({
      message: "Error assigning orders",
      error: error.message,
    });
  }
};



export const requestAssignOrders = async (req, res) => {
  try {
    const { rideId, orders, farmerEmail, farmerName } = req.body;

    if (!rideId || !orders?.length || !farmerEmail || !farmerName) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    // Fetch ride details to include in delivery request
    const ride = await Ride.findById(rideId);
    if (!ride) {
      return res.status(404).json({
        message: "Ride not found",
      });
    }

    // create delivery request with route details
    const deliveryRequest = new DeliveryRequest({
      rideId,
      rideFrom: ride.startLocation,
      rideTo: ride.destination,
      rideDate: ride.rideDate,
      farmerEmail,
      farmerName,
      orders,
      status: "requested",
    });

    await deliveryRequest.save();

    res.status(201).json({
      message: "Delivery request sent to driver",
      deliveryRequest,
    });
  } catch (error) {
    console.error("Request assign error:", error);
    res.status(500).json({
      message: "Failed to create delivery request",
    });
  }
};

export const acceptAssignOrders = async (req, res) => {
  try {
    const { requestId } = req.body;

    const request = await DeliveryRequest.findById(requestId).populate("orders");
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    const ride = await Ride.findById(request.rideId);
    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }

    // calculate total kg from orders
    const totalKg = request.orders.reduce(
      (sum, o) => sum + o.quantity,
      0
    );

    if (totalKg > ride.capacity) {
      return res.status(400).json({
        message: `Capacity exceeded. Available ${ride.capacity} kg`,
      });
    }

    // attach orders
    ride.orders.push(...request.orders.map(o => o._id));
    ride.capacity -= totalKg;

    if (ride.capacity === 0) ride.status = "Closed";

    await ride.save();

    // update orders
    await Order.updateMany(
      { _id: { $in: request.orders.map(o => o._id) } },
      {
        rideId: ride._id,
        status: "confirmed",
      }
    );

    // update request
    request.status = "accepted";
    request.driverEmail = ride.driver;
    await request.save();

    res.status(200).json({
      message: "Delivery request accepted",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


export const rejectAssignOrders = async (req, res) => {
  try {
    const { requestId } = req.body;

    console.log("Rejecting request:", requestId);

    // Find the delivery request
    const request = await DeliveryRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({
        message: "Delivery request not found",
      });
    }

    console.log("Found request, orders:", request.orders);

    // Update order statuses to rejected (keep orders in DB, just change status)
    if (request.orders && request.orders.length > 0) {
      const updateResult = await Order.updateMany(
        { _id: { $in: request.orders } },
        { $set: { status: "rejected" } }
      );
      console.log("Order update result:", updateResult);
    }

    // Update delivery request status to rejected (do NOT delete it)
    request.status = "rejected";
    await request.save();
    
    console.log("Request status updated to rejected");

    res.status(200).json({
      message: "Assignment rejected successfully",
    });
  } catch (error) {
    console.error("Reject error:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};
