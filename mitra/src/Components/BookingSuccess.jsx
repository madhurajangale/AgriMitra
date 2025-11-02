import React from "react";
import { CheckCircle } from "lucide-react";
import { COLOR_DARK_COFFEE } from "../constants/colors";

const BookingSuccess = ({ onBackToHome }) => (
  <div className="p-12 text-center">
    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
    <h2 className={`text-3xl font-bold text-[${COLOR_DARK_COFFEE}] mb-3`}>
      Booking Confirmed!
    </h2>
    <p className="text-gray-600 mb-6">
      Your delivery has been successfully booked. You will receive updates soon.
    </p>
    <button
      onClick={onBackToHome}
      className="px-6 py-3 bg-[#bd9476] text-white font-medium rounded-lg hover:bg-[#4f3d2a] transition"
    >
      Back to Home
    </button>
  </div>
);

export default BookingSuccess;
