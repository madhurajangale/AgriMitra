import React from 'react';
import { Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

function Navbar(){
    return(
        <div >
        {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Leaf className={`w-8 h-8 text-[#bd9476]`} />
            <h1 className={`text-2xl font-extrabold text-[#68533b] tracking-tight`}>
              Agrimitra
            </h1>
          </div>
          <nav className="hidden md:flex space-x-6 text-gray-600 font-medium">
  <Link to="/#home" className={`hover:text-[#bd9476] transition duration-150`}>Home</Link>
  <Link to="/#mission" className={`hover:text-[#bd9476] transition duration-150`}>Our Mission</Link>
  <Link to="/#features" className={`hover:text-[#bd9476] transition duration-150`}>Features</Link>
  <Link to="/farmproducts" className={`hover:text-[#bd9476] transition duration-150`}>MyProducts</Link>
  <Link to="/shop" className={`hover:text-[#bd9476] transition duration-150`}>Orders</Link>
  <Link to="/login" className={`hover:text-[#bd9476] transition duration-150`}>Login</Link>
</nav>
          <button className={`md:hidden p-2 text-gray-700 hover:text-[#bd9476] transition duration-150`}>
            {/* Simple Menu Icon Placeholder */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>
        </div>
      </header>
      </div>
    )
}

export default Navbar;