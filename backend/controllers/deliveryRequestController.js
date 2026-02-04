// controllers/deliveryRequestController.js
import DeliveryRequest from "../models/DeliveryRequest.js";

export const createDeliveryRequest = async (req, res) => {
  try {
    const {
      rideId,
      rideFrom,
      rideTo,
      rideDate,
      farmerEmail,
      farmerName,
      orders, // array of ORDER IDs
    } = req.body;

    if (!orders || orders.length === 0) {
      return res.status(400).json({
        message: "At least one order must be selected",
      });
    }

    const deliveryRequest = new DeliveryRequest({
      rideId,
      rideFrom,
      rideTo,
      rideDate,
      farmerEmail,
      farmerName,
      orders,
    });

    await deliveryRequest.save();

    res.status(201).json({
      message: "Delivery request created successfully",
      deliveryRequest,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create delivery request",
    });
  }
};

export const getAvailableDeliveriesForDriver = async (req, res) => {
  try {
    const requests = await DeliveryRequest.find({
      status: "requested",
    })
      .populate("orders") // FULL ORDER DETAILS
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch delivery requests",
    });
  }
};

export const acceptDeliveryRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { driverEmail } = req.body;

    const request = await DeliveryRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.driverEmail = driverEmail;
    request.status = "accepted";

    await request.save();

    res.json({
      message: "Delivery request accepted",
      request,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to accept delivery",
    });
  }
};
