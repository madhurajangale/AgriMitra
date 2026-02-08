import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom/client';
import CreateRideForm from "../Components/CreateRideForm";
import { 
  Leaf, 
  Truck, 
  Users, 
  Clock, 
  History, 
  Send, 
  MessageSquare, 
  ArrowRight, 
  LogOut, 
  Package, 
  TrendingUp,
  MapPin,
  PlusCircle, 
  CheckCircle, 
  XCircle,
  Calendar,
  Trash2,
  ChevronRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

 

// Main DriverPortal Component
const Driver = () => {
  const dashboardMetrics = [
    { title: "Total Deliveries", value: "348", icon: Truck, color: "text-[#bd9476]" },
    { title: "Products Delivered", value: "8,921 kg", icon: Package, color: "text-[#bd9476]" },
    { title: "Avg. Delivery Time", value: "45 min", icon: Clock, color: "text-[#bd9476]" },
    { title: "Earnings (This Month)", value: "₹45,200", icon: TrendingUp, color: "text-[#bd9476]" },
  ];

  const [activeRides, setActiveRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateRideForm, setShowCreateRideForm] = useState(false);
  const [isViewAll, setIsViewAll] = useState(false);
  
  const currentUser = JSON.parse(localStorage.getItem("user")) || { email: "driver@agrimitra.com" };

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/ride/all");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const rides = await response.json();

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const filteredAndSorted = rides
          .filter((ride) => {
            const rideDate = new Date(ride.rideDate);
            return ride.driver === currentUser.email && ride.status === "Open" && rideDate >= today;
          })
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

  const handleDeleteRide = (id) => {
    setActiveRides(prev => prev.filter(ride => ride._id !== id));
  };

  const handleNewRideSubmit = (newRide) => {
    const nextId = `temp-${Date.now()}`;
    const updatedRides = [{ _id: nextId, ...newRide }, ...activeRides]
      .sort((a, b) => new Date(a.rideDate) - new Date(b.rideDate));
    
    setActiveRides(updatedRides);
    setShowCreateRideForm(false);
  };

  const recentActivities = [
    { id: 1, type: "New Request", description: "Pickup from Farm 103 (Karnal)", time: "Just now" },
    { id: 2, type: "Delivery Complete", description: "Order #459 delivered to Customer C", time: "1 hour ago" },
    { id: 3, type: "Message", description: "Chat reply from Customer A", time: "3 hours ago" },
  ];

  const heroStyle = { 
    backgroundImage: "url('https://img.freepik.com/premium-photo/red-tractor-is-sitting-field-with-sun-setting-it_198067-985086.jpg')",
    backgroundAttachment: 'fixed',
  };

  const displayedRides = isViewAll ? activeRides : activeRides.slice(0, 3);

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <section id="hero" className="bg-cover bg-center py-20 relative" style={heroStyle}>
        <div className="absolute inset-0 bg-black opacity-60"></div> 
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10 text-white">
            <Truck className="w-16 h-16 mx-auto mb-4 text-[#bd9476]" />
            <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-2">Welcome to Agrimitra</h2>
            <p className="max-w-3xl mx-auto text-xl text-gray-200">Driver Portal for Seamless Deliveries.</p>
        </div>
      </section>

      <main className="py-16 bg-[#f7f4f1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-[#4f3d2a] mb-6 border-b border-[#bd9476] pb-2">KPI Overview</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {dashboardMetrics.map((metric, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-[#efebe7]">
                  <metric.icon className={`w-8 h-8 mb-3 ${metric.color}`} />
                  <p className="text-sm font-medium text-gray-500">{metric.title}</p>
                  <p className="text-3xl font-extrabold text-[#4f3d2a] mt-1">{metric.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="flex justify-between items-center mb-6 border-b border-[#bd9476] pb-2">
                <h3 className="text-2xl font-bold text-[#4f3d2a]">Upcoming Rides</h3>
                <button
                  onClick={() => setShowCreateRideForm(true)}
                  className="flex items-center bg-[#4f3d2a] text-white px-4 py-2 rounded-lg shadow-md hover:bg-black transition duration-200"
                >
                  <PlusCircle className="w-5 h-5 mr-2" /> Create New
                </button>
              </div>

              {showCreateRideForm && (
                <div className="mb-8">
                  <CreateRideForm 
                    onClose={() => setShowCreateRideForm(false)} 
                    onSubmit={handleNewRideSubmit} 
                  />
                </div>
              )}

              <div className="space-y-6 min-h-[400px]">
                {loading ? (
                  <div className="flex justify-center py-20 bg-white rounded-2xl border border-gray-100">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#bd9476]"></div>
                  </div>
                ) : activeRides.length === 0 ? (
                  <div className="bg-white p-12 rounded-2xl text-center border border-dashed border-gray-300">
                    <MapPin className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No upcoming rides</p>
                  </div>
                ) : (
                  <>
                    {displayedRides.map((ride) => (
                      <div key={ride._id} className="group bg-white rounded-[1rem] overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 animate-in fade-in zoom-in-95">
                        <div className="p-6 sm:p-8">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="bg-[#fdf8f4] text-[#bd9476] text-[10px] font-black px-2.5 py-1 rounded-md border border-[#bd9476]/10 uppercase tracking-widest">
                                  ID: {ride._id.toString().slice(-6)}
                                </span>
                                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 rounded-md">
                                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                                  <span className="text-green-700 text-[10px] font-black uppercase tracking-wider">Scheduled</span>
                                </div>
                              </div>
                              <h4 className="text-2xl font-black text-[#4f3d2a] flex items-center flex-wrap gap-x-3 gap-y-1">
                                {ride.startLocation} <ChevronRight className="w-6 h-6 text-[#bd9476] opacity-40" /> {ride.destination}
                              </h4>
                            </div>
                            <button 
                              onClick={() => handleDeleteRide(ride._id)}
                              className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-6 border-y border-gray-50 mb-6">
                            <div className="space-y-1">
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date</p>
                              <div className="flex items-center font-bold text-gray-700">
                                <Calendar className="w-4 h-4 mr-2 text-[#bd9476] opacity-70" />
                                {new Date(ride.rideDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                              </div>
                            </div>
                            <div className="space-y-1">
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Time</p>
                              <div className="flex items-center font-bold text-gray-700">
                                <Clock className="w-4 h-4 mr-2 text-[#bd9476] opacity-70" />
                                {ride.rideTime}
                              </div>
                            </div>
                            <div className="space-y-1">
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Price</p>
                              <div className="text-xl font-black text-[#bd9476] flex items-baseline gap-1">
                                <span className="text-sm font-bold opacity-60">₹</span>{ride.destPrice || 0}
                              </div>
                            </div>
                          </div>

                          {ride.stops?.length > 0 && (
                            <div className="flex flex-wrap gap-2.5">
                              {ride.stops.map((stop, idx) => (
                                <div key={idx} className="flex items-center gap-2 bg-[#fdfaf8] border border-[#bd9476]/5 px-4 py-2 rounded-xl">
                                  <span className="text-xs font-bold text-gray-600 uppercase tracking-tight">{stop.stopName}</span>
                                  <span className="text-xs font-black text-[#bd9476]">₹{stop.pricePerKg}/kg</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    {activeRides.length > 3 && (
                      <button 
                        onClick={() => setIsViewAll(!isViewAll)}
                        className="w-full py-4 flex items-center justify-center gap-2 text-[#bd9476] font-black uppercase text-xs tracking-[0.2em] hover:text-[#4f3d2a] transition-colors"
                      >
                        {isViewAll ? <><ChevronUp className="w-4 h-4" /> Show Less</> : <><ChevronDown className="w-4 h-4" /> View More ({activeRides.length - 3} additional)</>}
                      </button>
                    )}
                  </>
                )
              }
              </div>
            </div>
            
            <div className="md:col-span-1">
              <h3 className="text-2xl font-bold text-[#4f3d2a] mb-6 border-b border-[#bd9476] pb-2">Recent Activity</h3>
              <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
                {recentActivities.map((activity) => (
                    <div key={activity.id} className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
                        <div className="flex items-center text-sm font-semibold text-[#bd9476]">
                            {activity.type === "New Request" && <Send className="w-4 h-4 mr-2" />}
                            {activity.type === "Delivery Complete" && <History className="w-4 h-4 mr-2" />}
                            {activity.type}
                        </div>
                        <p className="text-gray-700 text-sm mt-1 font-medium">{activity.description}</p>
                        <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-wider">{activity.time}</p>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-[#4f3d2a] text-white py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-[#bd9476] text-xs font-black uppercase tracking-[0.3em]">
                &copy; {new Date().getFullYear()} Agrimitra Driver Logistics
            </p>
        </div>
      </footer>
    </div>
  );
};

// Root rendering logic
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<Driver />);
}

export default Driver;