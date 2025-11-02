import React, { useState } from "react";
import { PlusCircle, Trash2 } from "lucide-react";

const CreateRideForm = ({ onClose, onSubmit }) => {
  const [rideData, setRideData] = useState({
    startLocation: "",
    destination: "",
    stops: [{ stopName: "", pricePerKg: "" }], // at least one intermediate stop
    status: "Open",
  });

  // Update ride data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRideData({ ...rideData, [name]: value });
  };

  // Update a specific stop
  const handleStopChange = (index, field, value) => {
    const newStops = [...rideData.stops];
    newStops[index][field] = value;
    setRideData({ ...rideData, stops: newStops });
  };

  // Add a new intermediate stop
  const addStop = () => {
    setRideData({ ...rideData, stops: [...rideData.stops, { stopName: "", pricePerKg: "" }] });
  };

  // Remove a stop
  const removeStop = (index) => {
    const newStops = rideData.stops.filter((_, i) => i !== index);
    setRideData({ ...rideData, stops: newStops });
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(rideData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl overflow-y-auto max-h-[90vh]"
      >
        <h2 className="text-2xl font-bold text-[#4f3d2a] mb-6">Create New Ride</h2>

        {/* Start Location */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">Start Location</label>
          <input
            type="text"
            name="startLocation"
            value={rideData.startLocation}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#bd9476]"
          />
        </div>

        {/* Destination */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">Destination</label>
          <input
            type="text"
            name="destination"
            value={rideData.destination}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#bd9476]"
          />
        </div>

        {/* Intermediate Stops */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-2">Intermediate Stops</label>
          {rideData.stops.map((stop, index) => (
            <div key={index} className="flex gap-2 mb-2 items-center">
              <input
                type="text"
                placeholder="Stop Name"
                value={stop.stopName}
                onChange={(e) => handleStopChange(index, "stopName", e.target.value)}
                required
                className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#bd9476]"
              />
              <input
                type="number"
                placeholder="Price/kg"
                value={stop.pricePerKg}
                onChange={(e) => handleStopChange(index, "pricePerKg", e.target.value)}
                required
                className="w-28 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#bd9476]"
              />
              {rideData.stops.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeStop(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addStop}
            className="mt-2 flex items-center text-[#bd9476] hover:text-[#4f3d2a] font-medium"
          >
            <PlusCircle className="w-5 h-5 mr-1" /> Add Stop
          </button>
        </div>

        {/* Status */}
        <div className="mb-6">
          <label className="block font-medium text-gray-700 mb-1">Ride Status</label>
          <select
            name="status"
            value={rideData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#bd9476]"
          >
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-[#bd9476] text-white hover:bg-[#4f3d2a] transition"
          >
            Create Ride
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRideForm;
