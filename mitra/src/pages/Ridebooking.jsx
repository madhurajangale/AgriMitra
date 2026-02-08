import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RideDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // 🚨 if someone opens page directly
  if (!state?.ride) {
    return <p className="text-center mt-10">No ride selected</p>;
  }

  const { ride } = state;
  const email = localStorage.getItem("email");

  const [orders, setOrders] = useState([]);
  const [expandedStop, setExpandedStop] = useState(null);
  const [selectedOrders, setSelectedOrders] = useState({});
  const [loading, setLoading] = useState(true);

  // ---------------------------------------
  // FETCH FARMER ORDERS (existing backend)
  // ---------------------------------------
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/order/farmer/by-email/${encodeURIComponent(email)}`
        );
        const data = await res.json();
        if (res.ok) setOrders(data.orders);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [email]);

  // ---------------------------------------
  // HELPERS
  // ---------------------------------------
  const getOrdersForStop = (stopName) => {
    return orders.filter((o) =>
      o.address?.toLowerCase().includes(stopName.toLowerCase())
    );
  };

  const toggleOrder = (stop, orderId) => {
    setSelectedOrders((prev) => {
      const existing = prev[stop] || [];
      return {
        ...prev,
        [stop]: existing.includes(orderId)
          ? existing.filter((id) => id !== orderId)
          : [...existing, orderId],
      };
    });
  };

  // ---------------------------------------
  // SAVE ASSIGNMENT
  // ---------------------------------------
  const saveAssignment = async () => {
    try {
      const payload = {
        rideId: ride._id,
        assignments: selectedOrders, // { stopName: [orderIds] }
      };

      const res = await fetch("http://localhost:5000/api/ride/assign-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Orders assigned to ride successfully");
        navigate(-1);
      } else {
        alert("Failed to assign orders");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const stops = Array.isArray(ride.stops)
    ? ride.stops.map((s) => s.stopName)
    : [];

  return (
    <div className="min-h-screen bg-[#f7f4f1] p-6">
      {/* ---------------------------------------
          RIDE DETAILS (TOP)
      --------------------------------------- */}
      <div className="bg-white p-6 rounded-xl shadow border mb-6">
        <h1 className="text-2xl font-bold text-[#4f3d2a] mb-2">
          Ride Details
        </h1>
        <p><b>Driver:</b> {ride.driverName}</p>
        <p><b>Route:</b> {ride.startLocation} ➝ {ride.destination}</p>
        <p><b>Date:</b> {ride.rideDate}</p>
        <p><b>Time:</b> {ride.rideTime}</p>
      </div>

      {/* ---------------------------------------
          STOPS + ORDERS
      --------------------------------------- */}
      {loading ? (
        <p className="text-center">Loading orders...</p>
      ) : (
        <div className="space-y-4">
          {[...stops, ride.destination].map((stop) => (
            <div key={stop} className="bg-white rounded-xl p-4 border shadow">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-[#4f3d2a]">
                  {stop}
                </h2>
                <button
                  onClick={() =>
                    setExpandedStop(expandedStop === stop ? null : stop)
                  }
                  className="px-4 py-2 bg-[#4f3d2a] text-white rounded"
                >
                  Add Product Orders
                </button>
              </div>

              {/* ORDERS FOR THIS STOP */}
              {expandedStop === stop && (
                <div className="mt-4 space-y-2">
                  {getOrdersForStop(stop).length === 0 ? (
                    <p className="text-gray-500 italic">
                      No orders for this stop
                    </p>
                  ) : (
                    getOrdersForStop(stop).map((order) => (
                      <label
                        key={order._id}
                        className="flex items-center gap-3 border p-3 rounded"
                      >
                        <input
                          type="checkbox"
                          checked={
                            selectedOrders[stop]?.includes(order._id) || false
                          }
                          onChange={() => toggleOrder(stop, order._id)}
                        />
                        <div>
                          <p className="font-semibold">{order.item}</p>
                          <p className="text-sm text-gray-600">
                            {order.customerName} — {order.quantity}
                          </p>
                        </div>
                      </label>
                    ))
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ---------------------------------------
          SAVE BUTTON
      --------------------------------------- */}
      <button
        onClick={saveAssignment}
        className="mt-6 w-full bg-green-700 text-white py-3 rounded-lg font-bold"
      >
        Save Ride Assignments
      </button>
    </div>
  );
};

export default RideDetails;
