import React, { useEffect, useState, useMemo } from "react";
import BookingFormView from "../Components/BookingFormView";
import BookingSuccess from "../Components/BookingSuccess";
import { fetchDrivers, fetchDriverRides } from "../api/deliveryApi";

const Chat = () => {
  const [allRides, setAllRides] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRide, setSelectedRide] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const colors = {
    primary: "#8B4513",
    border: "#EADDCA",
    bg: "#FDFCFB",
    text: "#5D4037"
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const drivers = await fetchDrivers();
        console.log("1. Drivers received from API:", drivers);

        if (!drivers || !Array.isArray(drivers)) {
          console.error("Drivers is not an array:", drivers);
          return;
        }

        const combinedRides = [];

        // We use a for...of loop to ensure sequential, reliable data collection
        for (const driver of drivers) {
          console.log(`2. Fetching rides for: ${driver.name} (${driver.email})`);
          const rides = await fetchDriverRides(driver.email);
          
          if (rides && Array.isArray(rides)) {
            console.log(`3. Found ${rides.length} rides for ${driver.name}`);
            const ridesWithDriverInfo = rides.map(ride => ({
              ...ride,
              driverName: driver.name,
              driverEmail: driver.email
            }));
            combinedRides.push(...ridesWithDriverInfo);
          } else {
            console.log(`3. No rides array found for ${driver.name}`);
          }
        }

        console.log("4. Final Combined Rides Array:", combinedRides);
        setAllRides(combinedRides);
      } catch (error) {
        console.error("Global Fetch Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredRides = useMemo(() => {
    return allRides.filter((ride) => {
      const s = searchTerm.toLowerCase();
      return (
        (ride.driverName?.toLowerCase() || "").includes(s) ||
        (ride.startLocation?.toLowerCase() || "").includes(s) ||
        (ride.destination?.toLowerCase() || "").includes(s)
      );
    });
  }, [searchTerm, allRides]);

  const renderStops = (stops) => {
    if (!stops || (Array.isArray(stops) && stops.length === 0)) return "Direct";
    if (Array.isArray(stops)) return stops.map(s => s.stopName || "Unknown Stop").join(", ");
    return typeof stops === 'object' ? stops.stopName : String(stops);
  };

  if (selectedRide) return <BookingFormView selectedRide={selectedRide} onBookRide={() => {}} />;

  return (
    <div className="min-h-screen p-4 md:p-8" style={{ backgroundColor: colors.bg }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 style={{ color: colors.primary }} className="text-2xl font-bold uppercase tracking-tight">
            Delivery Network <span className="text-gray-400 font-light">| {allRides.length} Rides Total</span>
          </h1>
          <input
            type="text"
            placeholder="Search driver or route..."
            className="p-3 rounded-lg border-2 outline-none w-full md:w-80"
            style={{ borderColor: colors.border }}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {isLoading ? (
          <div className="text-center py-20 italic">Loading Network Data...</div>
        ) : (
          <div className="flex flex-col gap-3">
            {filteredRides.map((ride, idx) => (
              <div 
                key={`${ride._id}-${idx}`}
                className="bg-white border rounded-xl p-5 flex flex-col md:flex-row items-center gap-4 shadow-sm hover:shadow-md transition-shadow"
                style={{ borderColor: colors.border }}
              >
                <div className="w-full md:w-1/4">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Driver</div>
                  <div className="font-bold text-lg" style={{ color: colors.text }}>{ride.driverName}</div>
                </div>

                <div className="w-full md:w-1/3">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Route</div>
                  <div className="text-sm font-medium">{ride.startLocation} ➔ {ride.destination}</div>
                  <div className="text-xs text-gray-500 mt-1">Stops: {renderStops(ride.stops)}</div>
                </div>

                <div className="w-full md:w-1/4">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Schedule</div>
                  <div className="text-sm">{ride.rideDate} at {ride.rideTime}</div>
                  <div className="text-xs text-green-600 font-bold uppercase mt-1">{ride.status || 'Active'}</div>
                </div>

                <button
                  onClick={() => setSelectedRide(ride)}
                  className="w-full md:w-32 py-3 rounded-lg font-bold text-white transition-all active:scale-95"
                  style={{ backgroundColor: colors.primary }}
                >
                  Book
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;