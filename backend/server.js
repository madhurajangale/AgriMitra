import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import farmerRoutes from "./routes/farmerRoutes.js"
import cropRoutes from "./routes/cropRoutes.js";
import driverRoutes from "./routes/driverRoutes.js";
import rideRoutes from "./routes/rideRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import deliveryRequestRoutes from "./routes/deliveryRequestRoutes.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/customer", userRoutes);
app.use("/api/farmer", farmerRoutes);
app.use("/api/crops", cropRoutes);
app.use("/api/driver", driverRoutes);
app.use("/api/ride", rideRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/delivery-requests", deliveryRequestRoutes);

mongoose.connect(process.env.MONGO_URI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
