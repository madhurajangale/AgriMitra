import React from 'react';
import { useState, useEffect } from 'react';
import { ChevronRight, Calendar, Clock, MapPin } from 'lucide-react';

export default function DriverHistory() {
  const [activeRides, setActiveRides] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("user")) || { email: "driver@agrimitra.com" };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/ride/all");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const rides = await response.json();

        const filteredAndSorted = rides
          .filter((ride) => ride.driver === currentUser.email)
          .sort((a, b) => new Date(a.rideDate) - new Date(b.rideDate));

        setActiveRides(filteredAndSorted);
      } catch (err) {
        console.error("Error fetching rides:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRides();
  }, [currentUser.email]);

  if (loading) return <div className="p-8 text-center font-bold text-gray-500">Loading History...</div>;

  return (
    <div className="w-full bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#fdfaf8] border-b border-gray-100">
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Route</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date & Time</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Stops/Rates</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Earnings</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {activeRides.map((ride) => (
              <tr key={ride._id} className="hover:bg-gray-50/50 transition-colors group">
                {/* Route Column */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2 text-[#4f3d2a] font-black text-lg">
                    <span>{ride.startLocation}</span>
                    <ChevronRight className="w-4 h-4 text-[#bd9476] opacity-40" />
                    <span>{ride.destination}</span>
                  </div>
                </td>

                {/* Date & Time Column */}
                <td className="px-6 py-5">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center text-sm font-bold text-gray-700">
                      <Calendar className="w-3.5 h-3.5 mr-2 text-[#bd9476] opacity-70" />
                      {new Date(ride.rideDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </div>
                    <div className="flex items-center text-xs font-bold text-gray-500">
                      <Clock className="w-3.5 h-3.5 mr-2 text-[#bd9476] opacity-70" />
                      {ride.rideTime}
                    </div>
                  </div>
                </td>

                {/* Stops Column */}
                <td className="px-6 py-5">
                  {ride.stops?.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {ride.stops.slice(0, 2).map((stop, idx) => (
                        <span key={idx} className="inline-flex items-center px-2 py-1 rounded-md bg-[#fdfaf8] border border-[#bd9476]/10 text-[10px] font-black text-[#bd9476]">
                          {stop.stopName}: ₹{stop.pricePerKg}/kg
                        </span>
                      ))}
                      {ride.stops.length > 2 && <span className="text-[10px] font-bold text-gray-400">+{ride.stops.length - 2} more</span>}
                    </div>
                  ) : (
                    <span className="text-xs text-gray-300 italic">Direct Route</span>
                  )}
                </td>

                {/* Price Column */}
                <td className="px-6 py-5 text-right">
                  <div className="text-xl font-black text-[#bd9476]">
                    <span className="text-sm font-bold opacity-60 mr-0.5">₹</span>
                    {ride.destPrice || 0}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {activeRides.length === 0 && (
          <div className="p-10 text-center text-gray-400 font-bold">
            No ride history found for this driver.
          </div>
        )}
      </div>
    </div>
  );
}