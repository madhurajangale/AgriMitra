// controllers/deliveryRequestController.js
import DeliveryRequest from "../models/DeliveryRequest.js";
import Order from "../models/Order.js";
import nodemailer from "nodemailer";
import User from "../models/User.js";
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

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "madhurajangle2004@gmail.com",
    pass: "tnos cjcx zmaz nusj",
  },
});

export const markDeliveryAsDelivered = async (req, res) => {
  try {
    const { id } = req.params;

    const delivery = await DeliveryRequest.findById(id).populate("orders");

    if (!delivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }

    // update delivery status
    delivery.status = "delivered";
    await delivery.save();

    // update orders
    await Order.updateMany(
      { _id: { $in: delivery.orders.map(o => o._id) } },
      { $set: { status: "delivered" } }
    );

for (const order of delivery.orders) {

  // find user by name
  const user = await User.findOne({ name: order.customerName });

  if (!user) {
    console.log("No user found for:", order.customerName);
    continue;
  }

  console.log("Sending mail to:", user.email);

  await transporter.sendMail({
    from: "madhurajangle2004@gmail.com",
    to: user.email,
    subject: "Order Delivered 🚚",
    html: `
      <h2>Order Delivered</h2>
      <p>Hello ${order.customerName},</p>
      <p>Your order for <b>${order.item}</b> has been delivered.</p>
      <p>Total: ₹${order.totalPrice}</p>
      <p>Thank you for ordering from our platform! Please rate the product which can help us improve. Feel free to provide your feedback!</p>
    `
  });

}

    res.json({ message: "Delivery completed and emails sent" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update delivery" });
  }
};