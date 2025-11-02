import React from 'react';
import { User, MapPin, Loader } from 'lucide-react';
import { COLOR_DARK_COFFEE, COLOR_LIGHT_BROWN } from '../constants/colors';

const DriverSelection = ({ drivers, isLoading, onSelectDriver }) => (
  <div className="p-8 sm:p-12 max-w-4xl mx-auto w-full">
    <h2 className={`text-3xl font-bold text-center text-[${COLOR_DARK_COFFEE}] mb-4`}>
      Select a Driver
    </h2>
    <p className="text-center text-gray-500 mb-10">
      View available drivers and their upcoming delivery routes.
    </p>

    {isLoading ? (
      <div className="flex items-center justify-center p-20 text-gray-500">
        <Loader className="w-6 h-6 animate-spin mr-3 text-[#bd9476]" /> Fetching drivers...
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {drivers.map((driver) => (
          <div
            key={driver.id}
            className="bg-white p-6 rounded-xl shadow-lg border-2 border-transparent hover:border-[#bd9476] transition duration-200 flex flex-col justify-between"
          >
            <div>
              <User className={`w-8 h-8 mb-3 text-[${COLOR_DARK_COFFEE}]`} />
              <h3 className={`text-xl font-semibold text-[${COLOR_DARK_COFFEE}]`}>{driver.name}</h3>
              <p className="text-sm text-gray-500 mt-1 flex items-center">
                <MapPin className="w-4 h-4 mr-1 text-gray-400" /> {driver.location}
              </p>
            </div>
            <button
              onClick={() => onSelectDriver(driver)}
              className="w-full mt-4 py-2 text-white text-sm font-medium rounded-lg transition duration-200 bg-[#bd9476] hover:bg-[#4f3d2a] shadow-md"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default DriverSelection;
