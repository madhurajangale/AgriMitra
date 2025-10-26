import React from 'react';
import ReactDOM from 'react-dom/client';
import { Leaf, History, Send, MessageSquare, LogOut} from 'lucide-react';
const DriverNav = () => {
  return (
    <div>
    {/* Driver Portal Header / Navbar */}
      <header className={`bg-[#4f3d2a] shadow-lg sticky top-0 z-20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          
          {/* Logo and Portal Title */}
          <div className="flex items-center space-x-3">
            <Leaf className={`w-8 h-8 text-[#bd9476]`} />
            <h1 className={`text-xl font-extrabold text-white tracking-tight`}>
              Agrimitra 
            </h1>
          </div>
          
          {/* Driver Navigation */}
          <nav className="flex space-x-6 text-gray-200 font-medium">
            <a href="#" className="flex items-center hover:text-[#bd9476] transition duration-150">
              <Send className="w-5 h-5 mr-1" /> Requests
            </a>
            <a href="#" className="flex items-center hover:text-[#bd9476] transition duration-150">
              <History className="w-5 h-5 mr-1" /> History
            </a>
            <a href="#" className="flex items-center hover:text-[#bd9476] transition duration-150">
              <MessageSquare className="w-5 h-5 mr-1" /> Community Chat
            </a>
            <a href="#" className="flex items-center hover:text-[#bd9476] transition duration-150">
              <LogOut className="w-5 h-5 mr-1" /> Logout
            </a>
          </nav>

        </div>
      </header></div>
  )      
};

export default DriverNav;