import React from 'react';
import { Leaf, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
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
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Leaf className="w-8 h-8 text-[#bd9476]" />
            <h1 className="text-2xl font-extrabold text-[#68533b] tracking-tight">
              Agrimitra
            </h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-6 text-gray-600 font-medium">
            <Link to="/#home" className="hover:text-[#bd9476] transition duration-150">
              Home
            </Link>
            <Link to="/chat" className="hover:text-[#bd9476] transition duration-150">
              Community Chat
            </Link>
            <Link to="/farmproducts" className="hover:text-[#bd9476] transition duration-150">
              My Products
            </Link>
            <Link to="/shop" className="hover:text-[#bd9476] transition duration-150">
              Orders
            </Link>

            {email ? (
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-[#bd9476] transition duration-150"
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

          {/* Mobile Menu Icon */}
          <button className="md:hidden p-2 text-gray-700 hover:text-[#bd9476] transition duration-150">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
