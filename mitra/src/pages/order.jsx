import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, MapPin, Building, Hash, Mail, Smartphone, CheckCircle } from "lucide-react";

// ----------------------------------------------------------------------
// ✅ FIX: Define FormInput OUTSIDE the main component
// ----------------------------------------------------------------------
const FormInput = ({
    id,
    label,
    type = "text",
    placeholder,
    icon: Icon,
    required = true,
    pattern = null,
    maxLength = null,
    formData, // Pass formData and handleChange as props
    handleChange,
    primaryColor, // Pass color constants as props
}) => (
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
                // Use the primaryColor variable from props
                className={`w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[${primaryColor}] focus:border-[${primaryColor}] transition outline-none`}
                placeholder={placeholder}
                required={required}
                pattern={pattern}
                maxLength={maxLength}
            />
        </div>
    </div>
);

// ----------------------------------------------------------------------
// AddressForm Component
// ----------------------------------------------------------------------
const AddressForm = () => {
    const location = useLocation();
    const navigate = useNavigate();

const orderData = location.state || {};

const {
  productName,
  quantity,
  total,
  farmerId,
  farmerName,
} = orderData;

console.log(productName)
    const [formData, setFormData] = useState({
        name: "",
        roomNo: "",
        building: "",
        streetName: "",
        city: "",
        pincode: "",
        mobileNumber: "",
    });

    const [submissionStatus, setSubmissionStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    // Colors (Define once)
    const primaryColor = "#bd9476";
    const darkColor = "#4f3d2a";
    const backgroundColor = "#f7f4f1";
    const cardBorderColor = "#efebe7";

    // Handle input change
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const buildAddress = () => {
  const { roomNo, building, streetName, city, pincode } = formData;
  return `${roomNo}, ${building}, ${streetName}, ${city} - ${pincode}`;
};

    // Handle submit (rest of the logic remains the same)
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     setLoading(true);
    //     setSubmissionStatus(null);
    //     alert("Payment page");

    //     console.log("Form Data Submitted:", formData);
    //     console.log("Order Details:", { productName, total });

    //     setTimeout(() => {
    //         setLoading(false);
    //         const isSuccess = Math.random() > 0.1;
    //         if (isSuccess) {
    //             setSubmissionStatus("success");
    //             setFormData({ /* reset */ });
    //         } else {
    //             setSubmissionStatus("error");
    //         }
    //     }, 1500);
    // };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setSubmissionStatus(null);

  try {
    const response = await fetch("http://localhost:5000/api/order/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerName: formData.name,
        mobileNumber: formData.mobileNumber,
        address: buildAddress(),

        farmerId,
        farmerName,

        item: productName,
        quantity,
        totalPrice: total,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setSubmissionStatus("success");
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
      console.error(data.message);
    }
  } catch (error) {
    console.error("Order error:", error);
    setSubmissionStatus("error");
  } finally {
    setLoading(false);
  }
};


    return (
        <div
            className="min-h-screen flex items-center justify-center p-4 font-sans"
            style={{ backgroundColor }}
        >
            <div className="w-full max-w-lg mx-auto">
                {/* Header and Order Summary (remains the same) */}
                {/* ... (omitted for brevity) ... */}

                <div className="text-center mb-8">
                    <MapPin className="w-10 h-10 mx-auto" style={{ color: primaryColor }} />
                    <h1 className="text-3xl font-extrabold mt-2" style={{ color: darkColor }}>
                        Complete Your Order
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Review your order and enter delivery details.
                    </p>
                </div>

                {/* Order Summary */}
                <div
                    className="p-6 rounded-2xl shadow-md mb-6 border border-gray-300"
                    style={{ backgroundColor: cardBorderColor }}
                >
                    <h2 className="text-xl font-bold mb-3 flex items-center" style={{ color: darkColor }}>
                        Order Summary
                    </h2>
                    <div className="space-y-2 text-gray-700">
                        <p className="flex justify-between items-center text-lg">
                            <span className="font-semibold">Product:</span>
                            <span className="font-medium" style={{ color: darkColor }}>
                                {productName || "N/A"}
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


                {/* Form */}
                <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-[#efebe7] w-full">
                    <h2 className="text-xl font-bold mb-6 text-center text-[#4f3d2a]">
                        Delivery Address
                    </h2>
                    <form onSubmit={handleSubmit}>
                        {/* ---------------------------------------------------------------------- */}
                        {/* CHANGES: Pass formData, handleChange, and primaryColor as props */}
                        {/* ---------------------------------------------------------------------- */}
                        <FormInput id="name" label="Full Name" placeholder="John Doe" icon={Home} formData={formData} handleChange={handleChange} primaryColor={primaryColor} />
                        <FormInput id="roomNo" label="Room/Apt No." placeholder="101" icon={Hash} formData={formData} handleChange={handleChange} primaryColor={primaryColor} />
                        <FormInput
                            id="building"
                            label="Building/Society Name"
                            placeholder="Green Meadows Society"
                            icon={Building}
                            formData={formData} handleChange={handleChange} primaryColor={primaryColor}
                        />
                        <FormInput
                            id="streetName"
                            label="Street/Area Name"
                            placeholder="Near City Park, Main Road"
                            icon={MapPin}
                            formData={formData} handleChange={handleChange} primaryColor={primaryColor}
                        />

                        <div className="flex space-x-4">
                            <div className="flex-1">
                                <FormInput id="city" label="City" placeholder="Mumbai" icon={Mail} formData={formData} handleChange={handleChange} primaryColor={primaryColor} />
                            </div>
                            <div className="flex-1">
                                <FormInput
                                    id="pincode"
                                    label="Pincode"
                                    placeholder="400001"
                                    icon={Hash}
                                    type="number"
                                    pattern="\d{6}"
                                    maxLength="6"
                                    formData={formData} handleChange={handleChange} primaryColor={primaryColor}
                                />
                            </div>
                        </div>

                        <FormInput
                            id="mobileNumber"
                            label="Mobile Number"
                            placeholder="9876543210"
                            icon={Smartphone}
                            type="tel"
                            pattern="\d{10}"
                            maxLength="10"
                            formData={formData} handleChange={handleChange} primaryColor={primaryColor}
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg shadow-md text-white mt-6 transition duration-300 transform hover:scale-[1.01] ${
                                loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#4f3d2a] hover:bg-black"
                            }`}
                        >
                            {loading ? "Placing Order..." : "Place Order"}
                        </button>
                    </form>

                    {/* Message Area (remains the same) */}
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