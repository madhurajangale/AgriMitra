import React, { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Home,
  MapPin,
  Building,
  Hash,
  Smartphone,
  CheckCircle,
} from "lucide-react";

export const CITY_COORDINATES = {
  Mumbai: { lat: 19.0760, lng: 72.8777 },
  Pune: { lat: 18.5204, lng: 73.8567 },
  Nashik: { lat: 19.9975, lng: 73.7898 },
  Nagpur: { lat: 21.1458, lng: 79.0882 },
  Aurangabad: { lat: 19.8762, lng: 75.3433 },
  Thane: { lat: 19.2183, lng: 72.9781 },
  "Navi Mumbai": { lat: 19.0330, lng: 73.0297 },
  Kolhapur: { lat: 16.7050, lng: 74.2433 },
  Solapur: { lat: 17.6599, lng: 75.9064 },
  Amravati: { lat: 20.9374, lng: 77.7796 },
  Nanded: { lat: 19.1383, lng: 77.3210 },
  Sangli: { lat: 16.8524, lng: 74.5815 },
  Jalgaon: { lat: 21.0077, lng: 75.5626 },
  Akola: { lat: 20.7002, lng: 77.0082 },
  Latur: { lat: 18.4088, lng: 76.5604 },
  Ahmednagar: { lat: 19.0952, lng: 74.7496 },
  Satara: { lat: 17.6805, lng: 74.0183 },
  Ratnagiri: { lat: 16.9902, lng: 73.3120 },
  Chandrapur: { lat: 19.9615, lng: 79.2961 },
  Wardha: { lat: 20.7453, lng: 78.6022 },
};

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
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type={type}
        id={id}
        value={formData[id]}
        onChange={handleChange}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bd9476] focus:border-[#bd9476] outline-none"
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
    quantity = 1,
    farmerName,
    farmerId,
    marketPrice = 0,
    farmerLat,
    farmerLng,
  } = orderData;

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

  useEffect(() => {
    console.log("Received orderData:", orderData);
    console.log("farmerLat:", farmerLat, "farmerLng:", farmerLng);
  }, [orderData, farmerLat, farmerLng]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const buildAddress = () => {
    const { roomNo, building, streetName, city, pincode } = formData;
    return `${roomNo}, ${building}, ${streetName}, ${city} - ${pincode}`;
  };

  const calculateDistanceKm = (lat1, lon1, lat2, lon2) => {
    const toRad = (deg) => (deg * Math.PI) / 180;
    const R = 6371;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;

    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  };

  const billingDetails = useMemo(() => {
    const customerCoords = CITY_COORDINATES[formData.city];

    const subtotal = Number(marketPrice) * Number(quantity);

    if (!customerCoords || farmerLat == null || farmerLng == null) {
      return {
        distance: 0,
        deliveryCharge: 0,
        subtotal,
        total: subtotal,
      };
    }

    const distance = calculateDistanceKm(
      Number(farmerLat),
      Number(farmerLng),
      customerCoords.lat,
      customerCoords.lng
    );

    const deliveryCharge = Math.round(30 + distance * 1.5);
    const total = subtotal + deliveryCharge;

    return {
      distance,
      deliveryCharge,
      subtotal,
      total,
    };
  }, [formData.city, farmerLat, farmerLng, marketPrice, quantity]);

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
          city: formData.city,
          farmerId,
          farmerName,
          item: productName,
          quantity,
          marketPrice,
          distanceKm: Number(billingDetails.distance.toFixed(2)),
          deliveryCharge: billingDetails.deliveryCharge,
          totalPrice: billingDetails.total,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmissionStatus("success");
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
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#f7f4f1]">
      <div className="w-full max-w-lg mx-auto">
        <div className="text-center mb-8">
          <MapPin className="w-10 h-10 mx-auto text-[#bd9476]" />
          <h1 className="text-3xl font-extrabold mt-2 text-[#4f3d2a]">
            Complete Your Order
          </h1>
        </div>

        <div className="p-6 rounded-2xl shadow-md mb-6 border border-gray-300 bg-[#efebe7]">
          <h2 className="text-xl font-bold mb-3 text-[#4f3d2a]">Order Summary</h2>
          <div className="space-y-2 text-gray-700">
            <p className="flex justify-between">
              <span>Product:</span>
              <span>{productName}</span>
            </p>
            <p className="flex justify-between">
              <span>Farmer:</span>
              <span>{farmerName}</span>
            </p>
            <p className="flex justify-between">
              <span>Quantity:</span>
              <span>{quantity}</span>
            </p>
            <p className="flex justify-between">
              <span>Market Price/unit:</span>
              <span>₹{Number(marketPrice).toFixed(2)}</span>
            </p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl border border-[#efebe7]">
          <h2 className="text-xl font-bold mb-6 text-center text-[#4f3d2a]">
            Delivery Address
          </h2>

          <form onSubmit={handleSubmit}>
            <FormInput id="name" label="Full Name" placeholder="John Doe" icon={Home} formData={formData} handleChange={handleChange} />
            <FormInput id="roomNo" label="Room/Apt No." placeholder="101" icon={Hash} formData={formData} handleChange={handleChange} />
            <FormInput id="building" label="Building/Society Name" placeholder="Green Meadows Society" icon={Building} formData={formData} handleChange={handleChange} />
            <FormInput id="streetName" label="Street/Area Name" placeholder="Near City Park" icon={MapPin} formData={formData} handleChange={handleChange} />

            <div className="mb-4">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <select
                id="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bd9476] focus:border-[#bd9476] outline-none"
                required
              >
                <option value="">Select City</option>
                {Object.keys(CITY_COORDINATES).map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <FormInput
              id="pincode"
              label="Pincode"
              placeholder="400001"
              icon={Hash}
              type="number"
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

            <div className="mt-6 rounded-xl border border-gray-200 bg-[#f9f6f3] p-4">
              <h3 className="text-lg font-bold text-[#4f3d2a] mb-3">Billing Details</h3>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{billingDetails.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Distance:</span>
                  <span>{billingDetails.distance.toFixed(2)} km</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charge:</span>
                  <span>₹{billingDetails.deliveryCharge.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t pt-2 text-xl font-bold text-[#4f3d2a]">
                  <span>Total:</span>
                  <span>₹{billingDetails.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-6 px-6 py-3 rounded-lg text-white font-medium shadow-md ${
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