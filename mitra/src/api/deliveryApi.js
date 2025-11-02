// --- MONGODB API FUNCTIONS ---

// Fetch all drivers


// Fetch rides for a driver
// --- MONGODB API FUNCTIONS ---

// ✅ Fetch all drivers
export const fetchDrivers = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/driver");
    if (!res.ok) {
      const text = await res.text();
      console.error("❌ Bad response for drivers:", text);
      throw new Error("Failed to fetch drivers");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching drivers:", error);
    return [];
  }
};

// ✅ Fetch rides for a specific driver
export const fetchDriverRides = async (driverEmail) => {
  try {
    const res = await fetch(`http://localhost:5000/api/ride?driver=${driverEmail}`);
    if (!res.ok) {
      const text = await res.text();
      console.error("❌ Bad response for rides:", text);
      throw new Error("Failed to fetch rides");
    }
    const data = await res.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error("Error fetching rides:", error);
    return [];
  }
};

// ✅ Place delivery order (you can connect this later with your backend)
// export const placeDeliveryOrder = async (bookingDetails) => {
//   try {
//     const res = await fetch("http://localhost:5000/api/bookings", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(bookingDetails),
//     });

//     if (!res.ok) {
//       const text = await res.text();
//       console.error("❌ Bad response for booking:", text);
//       throw new Error("Failed to place booking");
//     }

//     const data = await res.json();
//     console.log("✅ Booking placed successfully:", data);
//     return { success: true };
//   } catch (error) {
//     console.error("Error placing booking:", error);
//     return { success: false };
//   }
// };
