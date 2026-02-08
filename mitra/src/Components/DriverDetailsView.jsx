import React from 'react';
import { MapPin, Clock, DollarSign, Loader } from 'lucide-react';
import { COLOR_DARK_COFFEE } from '../constants/colors';

const DriverDetailsView = ({ driver, rides, isLoadingRides, onSelectRide }) => (
  <div className="p-8 sm:p-12 max-w-4xl mx-auto w-full">
    <h2 className={`text-3xl font-bold text-[${COLOR_DARK_COFFEE}] mb-2`}>
      {driver.name}'s Upcoming Rides
    </h2>
    <p className="text-gray-500 mb-8">Select an available ride to book your delivery.</p>

    {isLoadingRides ? (
      <div className="flex items-center justify-center p-20 text-gray-500">
        <Loader className="w-6 h-6 animate-spin mr-3 text-[#bd9476]" /> Fetching rides...
      </div>
    ) : (
      <div className="space-y-4">
        {rides.map((ride) => (
          <div
            key={ride.id}
            className="bg-white p-5 rounded-lg shadow-md border flex flex-col sm:flex-row justify-between sm:items-center"
          >
            <div className="mb-4 sm:mb-0">
              <p className="text-lg font-semibold text-gray-800 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-[#bd9476]" /> {ride.location}
              </p>
              <div className="flex space-x-4 text-sm text-gray-600 mt-2">
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1 text-gray-400" /> {ride.pickupAt}
                </span>
                <span className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-1 text-gray-400" /> Est. Price: ₹{ride.price}
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:items-end">
              <span
                className={`font-medium text-sm px-3 py-1 rounded-full ${
                  ride.status === 'Full' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                }`}
              >
                {ride.status}
              </span>
              <button
                disabled={ride.status === 'Full'}
                onClick={() => onSelectRide(ride)}
                className={`w-full sm:w-auto mt-3 py-2 px-5 text-white text-sm font-medium rounded-lg transition duration-200 shadow-md ${
                  ride.status === 'Full'
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[#bd9476] hover:bg-[#4f3d2a]'
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
