import React, { useEffect, useState } from "react";

const DriverDeliveryRequests = () => {
  const driverEmail = localStorage.getItem("email");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/delivery-requests/driver/${encodeURIComponent(driverEmail)}`
        );
        const data = await res.json();
        if (res.ok) setRequests(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [driverEmail]);

  const acceptRequest = async (req) => {
    try {
      const payload = {
        rideId: req.rideId._id,
        orders: req.orders.map((id) => {
          const order = req.populatedOrders.find((o) => o._id === id);
          return { orderId: id, quantity: order.quantity };
        }),
      };
      const res = await fetch("http://localhost:5000/api/ride/accept-assign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) return alert(data.message);
      alert("Request accepted");
      setRequests((prev) => prev.filter((r) => r._id !== req._id));
    } catch (err) { console.error(err); }
  };

  const rejectRequest = async (req) => {
    try {
      const res = await fetch("http://localhost:5000/api/ride/reject-assign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderIds: req.orders }),
      });
      const data = await res.json();
      if (!res.ok) return alert(data.message);
      alert("Request rejected");
      setRequests((prev) => prev.filter((r) => r._id !== req._id));
    } catch (err) { console.error(err); }
  };

  if (loading) return <div className="flex justify-center mt-10 text-xs text-slate-500">Loading requests...</div>;
  if (!requests.length) return <div className="flex justify-center mt-10 text-xs text-slate-500 font-medium italic">No pending delivery requests</div>;

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-slate-900 font-sans">
      <div className="max-w-2xl mx-auto py-10 px-4">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-5">
          <div>
            <h1 className="text-lg font-bold tracking-tight">Delivery Requests</h1>
            <p className="text-[11px] text-slate-500 uppercase tracking-wider mt-0.5">Pending Approval</p>
          </div>
          <div className="text-[10px] font-bold bg-slate-900 text-white px-2 py-0.5 rounded">
            {requests.length} NEW
          </div>
        </div>

        {/* LIST CONTAINER */}
        <div className="space-y-4">
          {requests.map((req) => (
            <div key={req._id} className="bg-white border border-slate-200 rounded-lg shadow-sm">
              
              {/* TOP INFO BAR */}
              <div className="p-4 border-b border-slate-50 bg-white">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Farmer</p>
                    <h3 className="text-sm font-semibold text-slate-800">{req.farmerName}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Date</p>
                    <p className="text-xs text-slate-600">{new Date(req.rideDate).toDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500 bg-slate-50 p-2 rounded">
                  <span className="text-slate-400">Route:</span>
                  <span>{req.rideFrom}</span>
                  <span className="text-slate-300">→</span>
                  <span>{req.rideTo}</span>
                </div>
              </div>

              {/* ORDERS LIST */}
              <div className="px-4 py-3">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Package Details</p>
                <ul className="space-y-2">
                  {req.orders.map((order) => (
                    <li key={order._id} className="flex justify-between items-center text-[12px] bg-slate-50/50 p-2 rounded border border-slate-100/50">
                      <span className="text-slate-700 font-medium tracking-tight">
                        {order.item}
                      </span>
                      <span className="text-slate-500 tabular-nums">
                        {order.quantity} kg
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex divide-x divide-slate-100 border-t border-slate-100">
                <button
                  onClick={() => rejectRequest(req)}
                  className="flex-1 py-3 text-xs font-bold text-red-500 hover:bg-red-50 transition-colors uppercase tracking-widest"
                >
                  Reject
                </button>
                <button
                  onClick={() => acceptRequest(req)}
                  className="flex-1 py-3 text-xs font-bold text-emerald-600 hover:bg-emerald-50 transition-colors uppercase tracking-widest"
                >
                  Accept
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DriverDeliveryRequests;