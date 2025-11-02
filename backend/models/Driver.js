import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
    address: {
    type: String,
    trim: true,
    default: "",
  },
  numberOfVehicles: {
    type: Number,
    default: 0,
    min: 0,
  },
  vehiclePlateNumbers: {
    type: [String],
    default: [],
  },
//   role: {
//     type: String,
//     default: "user", 
//   },
}, {
  timestamps: true,
});

const Driver = mongoose.model("Driver", driverSchema);
export default Driver;
