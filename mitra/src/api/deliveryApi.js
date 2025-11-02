// --- MONGODB API FUNCTIONS ---

// Fetch all drivers
export const fetchDrivers = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/driver");
    if (!res.ok) throw new Error("Failed to fetch drivers");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching drivers:", error);
    return [];
  }
};

// Fetch rides for a driver
export const fetchDriverRides = async (driverId) => {
  try {
    await new Promise((r) => setTimeout(r, 400)); // mock delay

    if (driverId === 'driver_raj') {
      return [
        { id: 'ride_1_1', location: 'Chandigarh (Sector 17)', pickupAt: 'Today, 4:00 PM', status: 'Not Full', price: 150 },
        { id: 'ride_1_2', location: 'Ambala Cantt', pickupAt: 'Tomorrow, 9:00 AM', status: 'Full', price: 200 },
      ];
    }
    return [
      { id: 'ride_2_1', location: 'Jalgoan to Mumbai (Vashi)', pickupAt: 'Today, 6:00 PM', status: 'Not Full', price: 400 },
      { id: 'ride_2_2', location: 'Nagpur to Pune', pickupAt: 'Tomorrow, 8:00 AM', status: 'Not Full', price: 1200 },
    ];
  } catch (error) {
    console.error("Error fetching rides:", error);
    return [];
  }
};

// Place delivery order
export const placeDeliveryOrder = async (bookingDetails) => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // simulate network delay
  console.log("MOCK: Booking Placed:", bookingDetails);
  return { success: true };
};
