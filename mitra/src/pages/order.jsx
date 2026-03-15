import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Home,
  MapPin,
  Building,
  Hash,
  Smartphone,
  CheckCircle,
} from "lucide-react";

const FormInput = ({
  id,
  label,
  type = "text",
  placeholder,
  icon: Icon,
  required = true,
  pattern = null,
  maxLength = null,
  formData,
  handleChange,
}) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type={type}
        id={id}
        value={formData[id]}
        onChange={handleChange}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bd9476] focus:border-[#bd9476] transition outline-none"
        placeholder={placeholder}
        required={required}
        pattern={pattern}
        maxLength={maxLength}
      />
    </div>
  </div>
);

const AddressForm = () => {
  const location = useLocation();
  const orderData = location.state || {};

const {
  productName,
  quantity,
  total,
  farmerName,
} = orderData;

const farmerCity = localStorage.getItem("farmerLocation") || "";

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

  const primaryColor = "#bd9476";
  const darkColor = "#4f3d2a";
  const backgroundColor = "#f7f4f1";
  const cardBorderColor = "#efebe7";

  // JSON constant INSIDE this file only
  const CITY_COORDINATES = {
    Mumbai: { lat: 19.076, lng: 72.8777 },
    Pune: { lat: 18.5204, lng: 73.8567 },
    Nashik: { lat: 19.9975, lng: 73.7898 },
    Nagpur: { lat: 21.1458, lng: 79.0882 },
    Aurangabad: { lat: 19.8762, lng: 75.3433 },
    Kolhapur: { lat: 16.705, lng: 74.2433 },
    Solapur: { lat: 17.6599, lng: 75.9064 },
    Amravati: { lat: 20.9374, lng: 77.7796 },
    Satara: { lat: 17.6805, lng: 74.0183 },
    Sangli: { lat: 16.8524, lng: 74.5815 },
  };

  const DELIVERY_RATE_PER_KM = 4;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const buildAddress = () => {
    const { roomNo, building, streetName, city, pincode } = formData;
    return `${roomNo}, ${building}, ${streetName}, ${city} - ${pincode}`;
  };

  const toRadians = (value) => (value * Math.PI) / 180;

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const billingDetails = useMemo(() => {
    const baseTotal = Number(total) || 0;

    if (!farmerCity || !formData.city) {
      return {
        distance: 0,
        deliveryCharge: 0,
        finalTotal: baseTotal,
      };
    }

    const farmerCoords = CITY_COORDINATES[farmerCity];
    const customerCoords = CITY_COORDINATES[formData.city];

    if (!farmerCoords || !customerCoords) {
      return {
        distance: 0,
        deliveryCharge: 0,
        finalTotal: baseTotal,
      };
    }

    const distance = calculateDistance(
      farmerCoords.lat,
      farmerCoords.lng,
      customerCoords.lat,
      customerCoords.lng
    );

    const roundedDistance = Number(distance.toFixed(2));
    const deliveryCharge = Number((roundedDistance * DELIVERY_RATE_PER_KM).toFixed(2));
    const finalTotal = Number((baseTotal + deliveryCharge).toFixed(2));

    return {
      distance: roundedDistance,
      deliveryCharge,
      finalTotal,
    };
  }, [formData.city, farmerCity, total]);

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setSubmissionStatus(null);

  try {
    const roundedProductPrice = Math.round(Number(total) || 0);
    const roundedDistance = Math.round(Number(billingDetails.distance) || 0);
    const roundedDeliveryCharge = Math.round(Number(billingDetails.deliveryCharge) || 0);
    const roundedFinalTotal = Math.round(Number(billingDetails.finalTotal) || 0);

    const response = await fetch("http://localhost:5000/api/order/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerName: formData.name,
        mobileNumber: formData.mobileNumber,
        address: buildAddress(),
        customerCity: formData.city,
        farmerName,
        farmerCity,
        item: productName,
        quantity: Math.round(Number(quantity) || 0),
        productPrice: roundedProductPrice,
        distance: roundedDistance,
        deliveryCharge: roundedDeliveryCharge,
        totalPrice: roundedFinalTotal,
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
        <div className="text-center mb-8">
          <MapPin className="w-10 h-10 mx-auto" style={{ color: primaryColor }} />
          <h1 className="text-3xl font-extrabold mt-2" style={{ color: darkColor }}>
            Complete Your Order
          </h1>
          <p className="text-gray-500 mt-1">
            Review your order and enter delivery details.
          </p>
        </div>

        <div
          className="p-6 rounded-2xl shadow-md mb-6 border border-gray-300"
          style={{ backgroundColor: cardBorderColor }}
        >
          <h2 className="text-xl font-bold mb-3" style={{ color: darkColor }}>
            Order Summary
          </h2>

          <div className="space-y-2 text-gray-700">
            <p className="flex justify-between items-center text-lg">
              <span className="font-semibold">Product:</span>
              <span className="font-medium" style={{ color: darkColor }}>
                {productName || "N/A"}
              </span>
            </p>

            <p className="flex justify-between items-center text-lg">
              <span className="font-semibold">Farmer:</span>
              <span>{farmerName || "N/A"}</span>
            </p>

            <p className="flex justify-between items-center text-lg">
              <span className="font-semibold">Farmer City:</span>
              <span>{farmerCity || "N/A"}</span>
            </p>

            <p className="flex justify-between items-center text-lg">
              <span className="font-semibold">Customer City:</span>
              <span>{formData.city || "Select city"}</span>
            </p>

            <p className="flex justify-between items-center text-lg">
              <span className="font-semibold">Distance:</span>
              <span>{billingDetails.distance} km</span>
            </p>

            <p className="flex justify-between items-center text-lg">
              <span className="font-semibold">Product Total:</span>
              <span>₹{Number(total || 0).toFixed(2)}</span>
            </p>

            <p className="flex justify-between items-center text-lg">
              <span className="font-semibold">Delivery Charge:</span>
              <span>₹{billingDetails.deliveryCharge.toFixed(2)}</span>
            </p>

            <p className="flex justify-between items-center text-lg border-t pt-2 border-gray-300">
              <span className="font-semibold">Final Bill:</span>
              <span className="text-2xl font-extrabold text-green-700">
                ₹{billingDetails.finalTotal.toFixed(2)}
              </span>
            </p>
          </div>
        </div>

        <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-[#efebe7] w-full">
          <h2 className="text-xl font-bold mb-6 text-center text-[#4f3d2a]">
            Delivery Address
          </h2>

          <form onSubmit={handleSubmit}>
            <FormInput
              id="name"
              label="Full Name"
              placeholder="John Doe"
              icon={Home}
              formData={formData}
              handleChange={handleChange}
            />

            <FormInput
              id="roomNo"
              label="Room/Apt No."
              placeholder="101"
              icon={Hash}
              formData={formData}
              handleChange={handleChange}
            />

            <FormInput
              id="building"
              label="Building/Society Name"
              placeholder="Green Meadows Society"
              icon={Building}
              formData={formData}
              handleChange={handleChange}
            />

            <FormInput
              id="streetName"
              label="Street/Area Name"
              placeholder="Near City Park, Main Road"
              icon={MapPin}
              formData={formData}
              handleChange={handleChange}
            />

            <div className="mb-4">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  id="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bd9476] focus:border-[#bd9476] transition outline-none bg-white"
                >
                  <option value="">Select City</option>
                  {Object.keys(CITY_COORDINATES).map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <FormInput
              id="pincode"
              label="Pincode"
              placeholder="400001"
              icon={Hash}
              type="text"
              pattern="\d{6}"
              maxLength="6"
              formData={formData}
              handleChange={handleChange}
            />

            <FormInput
              id="mobileNumber"
              label="Mobile Number"
              placeholder="9876543210"
              icon={Smartphone}
              type="tel"
              pattern="\d{10}"
              maxLength="10"
              formData={formData}
              handleChange={handleChange}
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

          {submissionStatus === "success" && (
            <p className="mt-4 text-center text-sm text-green-700 font-medium p-3 bg-green-50 rounded-lg border border-green-200 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              Ordered Successfully!
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