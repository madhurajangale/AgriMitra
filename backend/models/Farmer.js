import mongoose from "mongoose";

const farmerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

    password: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },

  crops: {
    type: [String], 
  },
}, {
  timestamps: true,
});

const Farmer = mongoose.model("Farmer", farmerSchema);
export default Farmer;
