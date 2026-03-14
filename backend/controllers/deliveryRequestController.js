// controllers/deliveryRequestController.js
import DeliveryRequest from "../models/DeliveryRequest.js";
import Order from "../models/Order.js";
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

export const getRequestsForDriver = async (req, res) => {
  try {
    const { driverEmail } = req.params;

    const requests = await DeliveryRequest.find({
      status: "requested",
    })
      .populate({
        path: "rideId",
        match: { driver: driverEmail }, // only rides assigned to this driver
      })
      .populate("orders") // full order info
      .sort({ createdAt: -1 });

    // remove requests where rideId is null (not this driver)
    const filtered = requests.filter(r => r.rideId !== null);

    res.status(200).json(filtered);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch driver requests",
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


export const getAcceptedDeliveriesForDriver = async (req, res) => {
  try {
    const { driverEmail } = req.params;

    const deliveries = await DeliveryRequest.find({
      status: "accepted",
    })
      .populate({
        path: "rideId",
        match: { driver: driverEmail }, // only rides of this driver
      })
      .populate("orders")
      .sort({ createdAt: -1 });

    // remove deliveries not belonging to this driver
    const filtered = deliveries.filter(d => d.rideId !== null);

    res.status(200).json(filtered);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch accepted deliveries",
    });
  }
};

export const markDeliveryAsDelivered = async (req, res) => {
  try {
    const { id } = req.params;

    const delivery = await DeliveryRequest.findById(id);

    if (!delivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }

    // update delivery status
    delivery.status = "delivered";
    await delivery.save();

    // update all orders inside this delivery
    await Order.updateMany(
      { _id: { $in: delivery.orders } },
      { $set: { status: "delivered" } }
    );

    res.status(200).json({ message: "Delivery and orders updated" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update delivery status" });
  }
};