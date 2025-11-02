import React from 'react';
import { Leaf, History, Send, MessageSquare, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const DriverNav = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("email");
      alert("You have been logged out successfully.");
      navigate("/");
    }
  };

  return (
    <div>
      {/* Driver Portal Header / Navbar */}
      <header className="bg-white shadow-lg sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          
          {/* Logo and Portal Title */}
          <div className="flex items-center space-x-3">
            <Leaf className="w-8 h-8 text-[#bd9476]" />
            <h1 className="text-xl font-extrabold text-[#68533b] tracking-tight">
              Agrimitra
            </h1>
          </div>

          {/* Driver Navigation */}
          <nav className="flex space-x-6 text-[#68533b] font-medium">
            <Link to="/driver/requests" className="flex items-center hover:text-[#bd9476] transition duration-150">
              <Send className="w-5 h-5 mr-1" /> Requests
            </Link>

            <Link to="/driver/history" className="flex items-center hover:text-[#bd9476] transition duration-150">
              <History className="w-5 h-5 mr-1" /> History
            </Link>

            <Link to="/driver/chat" className="flex items-center hover:text-[#bd9476] transition duration-150">
              <MessageSquare className="w-5 h-5 mr-1" /> Community Chat
            </Link>

            {email ? (
              <button
                onClick={handleLogout}
                className="flex items-center hover:text-[#bd9476] transition duration-150"
              >
                <LogOut className="w-5 h-5 mr-1" /> Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center hover:text-[#bd9476] transition duration-150"
              >
                <LogOut className="w-5 h-5 mr-1" /> Login
              </Link>
            )}
          </nav>
        </div>
      </header>
    </div>
  );
};

export default DriverNav;
