import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RideDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.ride) {
    return (
      <div className="flex items-center justify-center min-h-screen text-slate-500 text-sm">
        No ride selected
      </div>
    );
  }

  const { ride } = state;
  const email = localStorage.getItem("email");

  const [orders, setOrders] = useState([]);
  const [expandedStop, setExpandedStop] = useState(null);
  const [selectedOrders, setSelectedOrders] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/order/farmer/by-email/${encodeURIComponent(email)}`);
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

  const getOrdersForStop = (stopName) => {
    return orders.filter((o) => o.address?.toLowerCase().includes(stopName.toLowerCase()));
  };

  const toggleOrder = (stop, order) => {
    setSelectedOrders((prev) => {
      const existing = prev[stop] || [];
      if (existing.includes(order._id)) {
        return { ...prev, [stop]: existing.filter((id) => id !== order._id) };
      }
      return { ...prev, [stop]: [...existing, order._id] };
    });
  };

  const getTotalSelectedKg = () => {
    let total = 0;
    Object.values(selectedOrders).flat().forEach((id) => {
      const order = orders.find((o) => o._id === id);
      if (order) total += order.quantity;
    });
    return total;
  };

  const saveAssignment = async () => {
    const orderIds = Object.values(selectedOrders).flat();
    if (!orderIds.length) {
      alert("Please select at least one order");
      return;
    }
    try {
      const payload = {
        rideId: ride._id,
        orders: orderIds,
        farmerEmail: email,
        farmerName: orders[0]?.farmerName,
      };
      const res = await fetch("http://localhost:5000/api/ride/request-assign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) { alert(data.message); return; }
      alert("Request sent to driver");
      navigate(-1);
    } catch (err) { console.error(err); }
  };

  const stops = Array.isArray(ride.stops) ? ride.stops.map((s) => s.stopName) : [];
  const totalKg = getTotalSelectedKg();
  const capacityPercent = Math.min((totalKg / ride.capacity) * 100, 100);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* NARROW WRAPPER */}
      <div className="max-w-2xl mx-auto py-10 px-4">
        
        {/* HEADER */}
        <div className="flex justify-between items-end mb-8 border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-slate-800">Assign Orders</h1>
            <p className="text-xs text-slate-500 mt-1">Route: {ride.startLocation} → {ride.destination}</p>
          </div>
          <button 
            onClick={() => navigate(-1)}
            className="text-xs text-slate-500 hover:text-slate-800 transition-colors"
          >
            Cancel
          </button>
        </div>

        {/* LOGISTICS OVERVIEW */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 mb-6 shadow-sm">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Logistics Provider</p>
              <p className="text-sm font-medium">{ride.driver}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Vehicle Capacity</p>
              <p className="text-sm font-medium">{ride.capacity} kg</p>
            </div>
          </div>
          
          {/* CAPACITY PROGRESS BAR */}
          <div className="space-y-2">
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-500">Payload Weight</span>
              <span className={totalKg > ride.capacity ? "text-red-500 font-bold" : "text-slate-700"}>
                {totalKg} / {ride.capacity} kg
              </span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${totalKg > ride.capacity ? 'bg-red-500' : 'bg-slate-800'}`}
                style={{ width: `${capacityPercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* ROUTE LIST */}
        <div className="space-y-3 mb-10">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Delivery Points</h3>
          {[...stops, ride.destination].map((stop, index) => {
            const stopOrders = getOrdersForStop(stop);
            const isExpanded = expandedStop === stop;
            const selectedInStop = selectedOrders[stop]?.length || 0;

            return (
              <div key={stop} className="bg-white border border-slate-200 rounded-md overflow-hidden transition-all">
                <div 
                  className="flex items-center justify-between p-3 cursor-pointer hover:bg-slate-50"
                  onClick={() => setExpandedStop(isExpanded ? null : stop)}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-2 h-2 rounded-full ${index === stops.length ? 'bg-red-400' : 'bg-slate-300'}`}></div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">{stop}</p>
                      <p className="text-[10px] text-slate-400">{stopOrders.length} orders available</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {selectedInStop > 0 && (
                      <span className="bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded-full font-medium">
                        {selectedInStop} selected
                      </span>
                    )}
                    <svg className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>

                {isExpanded && (
                  <div className="bg-slate-50 border-t border-slate-100 p-2 space-y-1">
                    {stopOrders.length === 0 ? (
                      <p className="text-[11px] text-slate-400 text-center py-2 italic">No matching orders found for this stop.</p>
                    ) : (
                      stopOrders.map((order) => (
                        <label key={order._id} className="flex items-center gap-3 p-2 bg-white border border-slate-200 rounded hover:border-slate-400 cursor-pointer transition-colors">
                          <input
                            type="checkbox"
                            checked={selectedOrders[stop]?.includes(order._id) || false}
                            onChange={() => toggleOrder(stop, order)}
                            className="w-3.5 h-3.5 rounded border-slate-300 text-slate-800 focus:ring-slate-500"
                          />
                          <div className="flex-1">
                            <p className="text-xs font-medium text-slate-800">{order.item}</p>
                            <p className="text-[10px] text-slate-500">{order.customerName} • {order.quantity}kg</p>
                          </div>
                          <p className="text-xs font-semibold text-slate-700">₹{order.totalPrice || "0"}</p>
                        </label>
                      ))
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* FIXED FOOTER ACTION */}
        <div className="sticky bottom-6">
          <button
            onClick={saveAssignment}
            disabled={totalKg === 0 || totalKg > ride.capacity}
            className={`w-full py-3.5 rounded-lg font-semibold text-sm shadow-xl transition-all
              ${totalKg === 0 || totalKg > ride.capacity 
                ? 'bg-slate-300 cursor-not-allowed text-slate-500' 
                : 'bg-slate-900 hover:bg-black text-white active:scale-[0.98]'}`}
          >
            {totalKg > ride.capacity ? "Capacity Exceeded" : `Confirm Assignment (${totalKg} kg)`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RideDetails;