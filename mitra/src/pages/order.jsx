import React, { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import {
    Home,
    MapPin,
    Building,
    Hash,
    Mail,
    Smartphone,
    CheckCircle,
} from "lucide-react";

// The AddressForm component for collecting contact and address details.
const AddressForm = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Check if location.state exists before destructuring
    const orderData = location.state || {};
    const { productName, total } = orderData; // Assuming total is a number or string

    // 1. State for all form fields
    const [formData, setFormData] = useState({
        name: "",
        roomNo: "",
        building: "",
        streetName: "",
        city: "",
        pincode: "",
        mobileNumber: "",
    });
    // 2. State for form submission
    const [submissionStatus, setSubmissionStatus] = useState(null); // 'success', 'error', null
    const [loading, setLoading] = useState(false);

    // Constants for styling based on the provided Login component
    const primaryColor = "#bd9476"; // Brown/Tan
    const darkColor = "#4f3d2a"; // Dark Brown/Coffee
    const backgroundColor = "#f7f4f1"; // Off-white/Cream
    const cardBorderColor = "#efebe7";

    // 3. Handle input changes
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    // 4. Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setSubmissionStatus(null);
        alert("payment page")
        console.log("Form Data Submitted:", formData);
        console.log("Order Details:", { productName, total }); // Include order details in submission log

        // --- Simulate an API call / Submission Process ---
        setTimeout(() => {
            setLoading(false);
            // Simulate success for demonstration
            const isSuccess = Math.random() > 0.1; // 90% chance of success
            if (isSuccess) {
                setSubmissionStatus("success");
                // Optionally navigate after a successful order placement
                // navigate('/order-confirmation', { state: { orderId: 'ABC12345' } });

                // Optionally reset form
                setFormData({
                    name: "",
                    roomNo: "",
                    building: "",
                    streetName: "",
                    city: "",
                    pincode: "",
                    mobileNumber: "",
                });
            } else {
                setSubmissionStatus("error");
            }
        }, 1500);
        // --- End Simulation ---
    };

    // Utility component for a styled input field (kept the same)
    const FormInput = ({ id, label, type = "text", placeholder, icon: Icon, required = true, pattern = null, maxLength = null }) => (
        <div className="mb-4">
            <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700 mb-1"
            >
                {label}
            </label>
            <div className="relative">
                <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type={type}
                    id={id}
                    value={formData[id]}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[${primaryColor}] focus:border-[${primaryColor}] transition`}
                    placeholder={placeholder}
                    required={required}
                    pattern={pattern}
                    maxLength={maxLength}
                />
            </div>
        </div>
    );

    return (
        <div className={`min-h-screen flex items-center justify-center p-4 bg-[${backgroundColor}] font-sans`}>
            <div className="w-full max-w-lg mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <MapPin className={`w-10 h-10 mx-auto text-[${primaryColor}]`} />
                    <h1 className={`text-3xl font-extrabold text-[${darkColor}] mt-2`}>
                        Complete Your Order
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Review your order and enter delivery details.
                    </p>
                </div>

                {/* --- Order Summary Card (New Addition) --- */}
                <div className={`bg-[${cardBorderColor}] p-6 rounded-2xl shadow-md mb-6 border border-gray-300`}>
                    <h2 className={`text-xl font-bold mb-3 text-[${darkColor}] flex items-center`}>
                        Order Summary
                    </h2>
                    <div className="space-y-2 text-gray-700">
                        <p className="flex justify-between items-center text-lg">
                            <span className="font-semibold">Product:</span>
                            <span className="font-medium text-[${darkColor}] p-1 rounded">
                                **{productName || "N/A"}**
                            </span>
                        </p>
                        <p className="flex justify-between items-center text-lg border-t pt-2 border-gray-300">
                            <span className="font-semibold">Total Price:</span>
                            <span className="text-2xl font-extrabold text-green-700">
                                ₹{total ? total.toFixed(2) : "0.00"}
                            </span>
                        </p>
                    </div>
                </div>
                {/* --- End Order Summary Card --- */}


                {/* Form Card */}
                <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-[#efebe7] w-full">
                    <h2 className="text-xl font-bold mb-6 text-center text-[#4f3d2a]">
                        Delivery Address
                    </h2>
                    <form onSubmit={handleSubmit}>
                        {/* Name Input */}
                        <FormInput
                            id="name"
                            label="Full Name"
                            placeholder="John Doe"
                            icon={Home}
                        />

                        {/* Room No. Input */}
                        <FormInput
                            id="roomNo"
                            label="Room/Apt No."
                            placeholder="101"
                            icon={Hash}
                        />

                        {/* Building Name Input */}
                        <FormInput
                            id="building"
                            label="Building/Society Name"
                            placeholder="Green Meadows Society"
                            icon={Building}
                        />

                        {/* Street Name Input */}
                        <FormInput
                            id="streetName"
                            label="Street/Area Name"
                            placeholder="Near City Park, Main Road"
                            icon={MapPin}
                        />

                        <div className="flex space-x-4">
                            {/* City Input */}
                            <div className="flex-1">
                                <FormInput
                                    id="city"
                                    label="City"
                                    placeholder="Mumbai"
                                    icon={Mail}
                                />
                            </div>

                            {/* Pincode Input */}
                            <div className="flex-1">
                                <FormInput
                                    id="pincode"
                                    label="Pincode"
                                    placeholder="400001"
                                    icon={Hash}
                                    type="number"
                                    pattern="\d{6}"
                                    maxLength="6"
                                />
                            </div>
                        </div>

                        {/* Mobile Number Input */}
                        <FormInput
                            id="mobileNumber"
                            label="Mobile Number"
                            placeholder="9876543210"
                            icon={Smartphone}
                            type="tel"
                            pattern="\d{10}"
                            maxLength="10"
                        />

                        {/* Submission Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-md text-white mt-6 ${
                                loading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : `bg-[${darkColor}] hover:bg-black`
                            } transition duration-300 transform hover:scale-[1.01]`}
                        >
                            {loading ? "Placing Order..." : "Place Order"}
                        </button>
                    </form>

                    {/* Message Area */}
                    {submissionStatus === "success" && (
                        <p className="mt-4 text-center text-sm text-green-700 font-medium p-3 bg-green-50 rounded-lg border border-green-200 flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 mr-2" /> Ordered Successfully!
                        </p>
                    )}
                    {submissionStatus === "error" && (
                        <p className="mt-4 text-center text-sm text-red-700 font-medium p-3 bg-red-50 rounded-lg border border-red-200">
                            Failed to place order. Please try again.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddressForm;