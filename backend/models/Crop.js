// models/Crop.js
import mongoose from "mongoose";

const cropSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    farmer: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    market_price: {
      type: Number,
      required: true,
    },
    delivery_charge: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Crop = mongoose.model("Crop", cropSchema);
export default Crop;
