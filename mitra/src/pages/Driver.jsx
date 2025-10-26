import React from 'react';
import ReactDOM from 'react-dom/client';
import { Leaf, Truck, Users, Clock, History, Send, MessageSquare,ArrowRight, LogOut, Package, TrendingUp } from 'lucide-react';

// Main DriverPortal Component
const Driver = () => {

  // Mock data for the dashboard metrics
  const dashboardMetrics = [
    { title: "Total Deliveries", value: "348", icon: Truck, color: "text-[#bd9476]" },
    { title: "Products Delivered", value: "8,921 kg", icon: Package, color: "text-[#bd9476]" },
    { title: "Avg. Delivery Time", value: "45 min", icon: Clock, color: "text-[#bd9476]" },
    { title: "Earnings (This Month)", value: "₹45,200", icon: TrendingUp, color: "text-[#bd9476]" },
  ];

  // Mock data for recent activities
  const recentActivities = [
    { id: 1, type: "New Request", description: "Pickup from Farm 103 (Karnal)", time: "Just now" },
    { id: 2, type: "Delivery Complete", description: "Order #459 delivered to Customer C", time: "1 hour ago" },
    { id: 3, type: "Message", description: "Chat reply from Customer A", time: "3 hours ago" },
    { id: 4, type: "System Update", description: "Route optimization completed for tomorrow.", time: "Yesterday" },
  ];
  
  // Custom Utility for Tailwind arbitrary color application
  const getColorClass = (hex) => `text-[${hex}]`;

  // Hero Section Style (Same background as the main homepage)
  const heroStyle = { 
    backgroundImage: "url('https://img.freepik.com/premium-photo/red-tractor-is-sitting-field-with-sun-setting-it_198067-985086.jpg')",
    backgroundAttachment: 'fixed', // Makes the background static during scroll
  };

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      
      

      {/* Hero Section */}
      <section 
        id="hero" 
        className={`bg-cover bg-center py-20 sm:py-24 relative`}
        style={heroStyle}
      >
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black opacity-60"></div> 

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 text-white">
            <Truck className="w-16 h-16 mx-auto mb-4 text-[#bd9476]" />
            <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-2">
                Welcome to Agrimitra
            </h2>
            <p className="max-w-3xl mx-auto text-xl text-gray-200">
                Your Driver Portal for Seamless Farm-to-Table Deliveries.
            </p>
        </div>
      </section>

      {/* Dashboard Content */}
      <main className="py-16 bg-[#f7f4f1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Metrics Grid */}
          <div className="mb-12">
            <h3 className={`text-2xl font-bold text-[#4f3d2a] mb-6 border-b border-[#bd9476] pb-2`}>
                Key Performance Indicators
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {dashboardMetrics.map((metric, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-[#efebe7] transform hover:shadow-xl transition duration-300">
                  <metric.icon className={`w-8 h-8 mb-3 ${metric.color}`} />
                  <p className="text-sm font-medium text-gray-500">{metric.title}</p>
                  <p className={`text-3xl font-extrabold text-[#4f3d2a] mt-1`}>{metric.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Deliveries & Activity */}
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Active Deliveries */}
            <div className="md:col-span-2">
              <h3 className={`text-2xl font-bold text-[#4f3d2a] mb-6 border-b border-[#bd9476] pb-2`}>
                Active Deliveries (Next 3)
              </h3>
              <div className="space-y-4">
                {/* Mock Delivery Card 1 */}
                <div className="bg-white p-5 rounded-xl shadow-md border-l-4 border-l-[#bd9476]">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold text-lg text-[#4f3d2a]">Order #460 - Farmer B to Customer D</p>
                        <span className="text-xs font-semibold text-white bg-[#bd9476] px-3 py-1 rounded-full">En route</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Route: 12 km | Est. Time: 25 min</p>
                    <button className="mt-3 text-sm text-[#bd9476] hover:text-[#4f3d2a] font-medium flex items-center">
                        View Map Details <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                </div>
                {/* Mock Delivery Card 2 */}
                <div className="bg-white p-5 rounded-xl shadow-md border-l-4 border-l-[#bd9476]">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold text-lg text-[#4f3d2a]">Order #461 - Pickup at Mandi A</p>
                        <span className="text-xs font-semibold text-white bg-gray-400 px-3 py-1 rounded-full">Pending Pickup</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Location: Main Storage Unit, Sector 4</p>
                    <button className="mt-3 text-sm text-[#bd9476] hover:text-[#4f3d2a] font-medium flex items-center">
                        Start Trip <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                </div>
              </div>
            </div>
            
            {/* Recent Activity Feed */}
            <div className="md:col-span-1">
              <h3 className={`text-2xl font-bold text-[#4f3d2a] mb-6 border-b border-[#bd9476] pb-2`}>
                Recent Activity
              </h3>
              <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
                {recentActivities.map((activity) => (
                    <div key={activity.id} className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
                        <div className="flex items-center text-sm font-semibold text-[#bd9476]">
                            {activity.type === "New Request" && <Send className="w-4 h-4 mr-2" />}
                            {activity.type === "Delivery Complete" && <History className="w-4 h-4 mr-2" />}
                            {activity.type === "Message" && <MessageSquare className="w-4 h-4 mr-2" />}
                            {activity.type === "System Update" && <Clock className="w-4 h-4 mr-2" />}
                            {activity.type}
                        </div>
                        <p className="text-gray-700 text-sm mt-1">{activity.description}</p>
                        <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </main>

      {/* Footer (Reusing the dark theme) */}
      <footer className={`bg-[#4f3d2a] text-white py-6`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Agrimitra Driver Logistics.
        </div>
      </footer>
    </div>
  );
};

export default Driver;


