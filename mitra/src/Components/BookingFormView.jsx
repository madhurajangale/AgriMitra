import React, { useState } from "react";
import { MapPin, DollarSign, Package } from "lucide-react";
import { COLOR_DARK_COFFEE, COLOR_LIGHT_BROWN } from "../constants/colors";

const BookingFormView = ({ selectedRide, onBookRide, isPlacingOrder }) => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    weight: "",
    address: "",
    pincode: "",
    price: selectedRide ? selectedRide.price : 0,
  });

  const locationData = {
    Maharashtra: {
      Pune: {
        PimpriChinchwad: ["Hinjewadi", "Wakad", "Ravet"],
        PuneCity: ["Kothrud", "Shivajinagar", "Viman Nagar"],
      },
      Mumbai: {
        MumbaiSuburban: ["Andheri", "Bandra", "Borivali"],
        MumbaiCity: ["Fort", "Colaba", "Marine Lines"],
      },
    },
    Gujarat: {
      Ahmedabad: {
        AhmedabadCity: ["Navrangpura", "Maninagar", "Satellite"],
      },
      Surat: {
        SuratDistrict: ["Adajan", "Vesu", "Katargam"],
      },
    },
  };

  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedArea, setSelectedArea] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedDistrict("");
    setSelectedCity("");
    setSelectedArea("");
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    setSelectedCity("");
    setSelectedArea("");
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setSelectedArea("");
  };

  const handleAreaChange = (e) => {
    setSelectedArea(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onBookRide({
      ...formData,
      state: selectedState,
      district: selectedDistrict,
      city: selectedCity,
      area: selectedArea,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 sm:p-12 max-w-3xl mx-auto bg-white rounded-xl shadow-lg">
      <h2 className={`text-3xl font-bold text-[${COLOR_DARK_COFFEE}] mb-6`}>Book Delivery</h2>

      {/* User Details */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
          <input
            type="text"
            name="Productname"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#bd9476]"
            placeholder="Enter product name"
          />
        </div>
        <div>
            
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quantity</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#bd9476]"
            placeholder="Enter weight"
          />
        </div>
      </div>

     

      {/* Location Dropdowns */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* State */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
          <select
            value={selectedState}
            onChange={handleStateChange}
            required
            className="w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-[#bd9476]"
          >
            <option value="">Select State</option>
            {Object.keys(locationData).map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        {/* District */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
          <select
            value={selectedDistrict}
            onChange={handleDistrictChange}
            disabled={!selectedState}
            required
            className="w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-[#bd9476] disabled:bg-gray-100"
          >
            <option value="">Select District</option>
            {selectedState &&
              Object.keys(locationData[selectedState]).map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
          </select>
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
          <select
            value={selectedCity}
            onChange={handleCityChange}
            disabled={!selectedDistrict}
            required
            className="w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-[#bd9476] disabled:bg-gray-100"
          >
            <option value="">Select City</option>
            {selectedDistrict &&
              Object.keys(locationData[selectedState][selectedDistrict]).map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
          </select>
        </div>

        {/* Area */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
          <select
            value={selectedArea}
            onChange={handleAreaChange}
            disabled={!selectedCity}
            required
            className="w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-[#bd9476] disabled:bg-gray-100"
          >
            <option value="">Select Area</option>
            {selectedCity &&
              locationData[selectedState][selectedDistrict][selectedCity].map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
          </select>
        </div>

        {/* Pincode */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
          <input
            type="number"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
            className="w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-[#bd9476]"
            placeholder="Enter Pincode"
          />
        </div>
      </div>

      {/* Address */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
        <div className="relative">
          <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#bd9476]"
            placeholder="House no., street name..."
          />
        </div>
      </div>

      {/* Price */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Est. Price</label>
        <div className="relative">
          <DollarSign className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            name="price"
            value={`₹${formData.price}`}
            readOnly
            className="w-full pl-10 pr-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed"
          />
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isPlacingOrder}
        className={`w-full py-3 text-white text-lg font-medium rounded-lg transition duration-200 ${
          isPlacingOrder ? "bg-gray-400" : "bg-[#bd9476] hover:bg-[#4f3d2a]"
        }`}
      >
        {isPlacingOrder ? "Booking..." : "Confirm Booking"}
      </button>
    </form>
  );
};

export default BookingFormView;
