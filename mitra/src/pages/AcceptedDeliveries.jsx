import { useEffect, useState } from "react";
import axios from "axios";

function AcceptedDeliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [deliveredIds, setDeliveredIds] = useState(new Set());
  const driverEmail = localStorage.getItem("email");

  useEffect(() => {
    const fetchAcceptedDeliveries = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/delivery-requests/driver/accepted/${driverEmail}`
        );
        setDeliveries(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAcceptedDeliveries();
  }, [driverEmail]);

  const handleSetDelivered = async (id) => {
  try {
    await axios.patch(
      `http://localhost:5000/api/delivery-requests/delivered/${id}`
    );

    // update UI
    setDeliveredIds((prev) => new Set([...prev, id]));

    // update delivery status locally
    setDeliveries((prev) =>
      prev.map((d) =>
        d._id === id ? { ...d, status: "delivered" } : d
      )
    );

  } catch (error) {
    console.error("Failed to update delivery:", error);
  }
};

  // Grouping logic remains the same
  const groupedDeliveries = deliveries.reduce((acc, curr) => {
    const routeKey = `${curr.rideFrom}-${curr.rideTo}`;
    if (!acc[routeKey]) {
      acc[routeKey] = {
        from: curr.rideFrom,
        to: curr.rideTo,
        date: curr.rideDate,
        items: [],
      };
    }
    acc[routeKey].items.push(curr);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#fdfaf7] text-[#3e2723] font-sans pb-20">
      <div className="w-full max-w-6xl mx-auto py-10 px-6">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-10 border-b border-[#efebe9] pb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#5d4037]">Fleet Manifest</h1>
            <p className="text-xs text-[#a1887f] uppercase tracking-[0.2em] mt-1 font-semibold">Accepted Assignments</p>
          </div>
          <div className="bg-[#8d6e63] text-white px-4 py-2 rounded-lg shadow-sm">
            <p className="text-[10px] uppercase font-bold opacity-80">Total Accepted Requests</p>
            <p className="text-lg font-bold tabular-nums">{deliveries.length}</p>
          </div>
        </div>

        {/* CONTENT */}
        {Object.keys(groupedDeliveries).length === 0 ? (
          <div className="bg-white border-2 border-dashed border-[#d7ccc8] rounded-xl p-20 text-center">
            <p className="text-sm text-[#a1887f] font-medium italic">Your delivery queue is currently empty.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.values(groupedDeliveries).map((group, gIdx) => (
              <div key={gIdx} className="bg-white border border-[#efebe9] rounded-xl shadow-sm overflow-hidden">
                
                {/* ROUTE HEADER BAR */}
                <div className="bg-[#5d4037] px-6 py-3 flex justify-between items-center">
                  <div className="flex items-center gap-4 text-white">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold opacity-60 uppercase tracking-widest">Route</span>
                      <span className="text-xs font-semibold">{group.from}</span>
                      <svg className="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      <span className="text-xs font-semibold">{group.to}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-[#d7ccc8] font-bold uppercase tracking-tighter">
                    {new Date(group.date).toLocaleDateString()}
                  </span>
                </div>

                {/* DELIVERIES UNDER THIS ROUTE */}
                <div className="divide-y divide-[#f5f0ed]">
                  {group.items.map((delivery) => (
                    <div key={delivery._id} className="p-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                      
                      {/* FARMER & STATUS */}
                      <div className="md:col-span-3">
                        <p className="text-[10px] text-[#a1887f] font-bold uppercase mb-1">Farmer</p>
                        <h4 className="text-sm font-bold text-[#5d4037] mb-2">{delivery.farmerName}</h4>
                        <span className="text-[9px] bg-[#fdfaf7] border border-[#efebe9] text-[#8d6e63] px-2 py-0.5 rounded font-bold uppercase tracking-widest">
                          {delivery.status}
                        </span>
                      </div>

                      {/* PACKAGE DETAILS (Restored and Styled) */}
                      <div className="md:col-span-6 bg-[#faf8f6] rounded-lg p-3 border border-[#f5f0ed]">
                        <p className="text-[10px] font-bold text-[#a1887f] uppercase mb-2 flex items-center gap-2">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                          Package Details
                        </p>
                        <ul className="space-y-1.5">
                          {delivery.orders && delivery.orders.length > 0 ? (
                            delivery.orders.map((order) => (
                              <li key={order._id} className="flex justify-between items-center text-[11px] py-1 border-b border-[#efebe9] last:border-0">
                                <span className="text-[#5d4037] font-medium">
                                  {order.cropName || order.item || "Order Item"}
                                </span>
                                <span className="text-[#8d6e63] font-bold tabular-nums">
                                  {order.quantity} kg
                                </span>
                              </li>
                            ))
                          ) : (
                            <li className="text-[11px] text-[#a1887f] italic">No details available</li>
                          )}
                        </ul>
                      </div>

                      {/* ACTION BUTTON */}
                      <div className="md:col-span-3 flex justify-end pt-2">
                        {deliveredIds.has(delivery._id) ? (
                          <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-100 animate-in fade-in zoom-in duration-300">
                            <span className="text-[10px] font-bold uppercase tracking-widest">Delivered</span>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                        ) : (
                          <button 
                            onClick={() => handleSetDelivered(delivery._id)}
                            className="w-full md:w-auto px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] bg-[#8d6e63] text-white hover:bg-[#5d4037] transition-all rounded shadow-sm active:scale-95"
                          >
                            Set Delivered
                          </button>
                        )}
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AcceptedDeliveries;