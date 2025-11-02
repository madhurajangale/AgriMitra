import React from "react";
import { MapPin, Clock, Calendar, Loader, Route } from "lucide-react";
import { COLOR_DARK_COFFEE } from "../constants/colors";

const DriverDetailsView = ({ driver, rides, isLoadingRides, onSelectRide }) => (
  <div className="p-8 sm:p-12 max-w-4xl mx-auto w-full">
    <h2 className={`text-3xl font-bold text-[${COLOR_DARK_COFFEE}] mb-2`}>
      {driver.name || "Driver"}'s Available Rides
    </h2>
    <p className="text-gray-500 mb-8">
      Select a ride to book your delivery slot with this driver.
    </p>

    {isLoadingRides ? (
      <div className="flex items-center justify-center p-20 text-gray-500">
        <Loader className="w-6 h-6 animate-spin mr-3 text-[#bd9476]" />
        Fetching rides...
      </div>
    ) : rides.length === 0 ? (
      <div className="text-center text-gray-500 py-12">
        No rides found for this driver.
      </div>
    ) : (
      <div className="space-y-4">
        {rides.map((ride) => (
          <div
            key={ride._id}
            className="bg-white p-5 rounded-lg shadow-md border flex flex-col sm:flex-row justify-between sm:items-center"
          >
            {/* Left Section */}
            <div className="mb-4 sm:mb-0">
              <p className="text-lg font-semibold text-gray-800 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-[#bd9476]" />
                {ride.startLocation} ➜ {ride.destination}
              </p>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                  {new Date(ride.rideDate).toLocaleDateString()}
                </span>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1 text-gray-400" />
                  {ride.rideTime}
                </span>
                <span className="flex items-center">
                  <Route className="w-4 h-4 mr-1 text-gray-400" />
                  {ride.stops?.length || 0} stops
                </span>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex flex-col sm:items-end">
              <span
                className={`font-medium text-sm px-3 py-1 rounded-full ${
                  ride.status === "Closed"
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {ride.status}
              </span>

              <button
                disabled={ride.status === "Closed"}
                onClick={() => onSelectRide(ride)}
                className={`w-full sm:w-auto mt-3 py-2 px-5 text-white text-sm font-medium rounded-lg transition duration-200 shadow-md ${
                  ride.status === "Closed"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#bd9476] hover:bg-[#4f3d2a]"
                }`}
              >
                Select
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default DriverDetailsView;
