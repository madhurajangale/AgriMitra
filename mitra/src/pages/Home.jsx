import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from '../Auth/login';
import { Leaf, Handshake, ShoppingCart, TrendingUp, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom'; 
// Main Home Component
const Home = () => {
  const textStoneLight = 'text-stone-300'; 

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
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
  <Link to="/login" className={`hover:text-[#bd9476] transition duration-150`}>Login</Link>
</nav>
          <button className={`md:hidden p-2 text-gray-700 hover:text-[#bd9476] transition duration-150`}>
            {/* Simple Menu Icon Placeholder */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>
        </div>
      </header>

      {/* Hero Section - Now with Background Image and Overlay */}
      <section 
        id="home" 
        className={`bg-cover bg-center py-20 sm:py-32 border-b border-[#efebe7] relative`}
        style={{ 
          backgroundImage: "url('https://www.theindiaforum.in/sites/default/files/field/image/2022/06/21/ramkumar-radhakrishnan-wikimedia-1622193304-1622193304.jpeg')" 
        }}
      >
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black opacity-50"></div> 

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 text-white">
          <p className={`font-semibold text-sm uppercase mb-3 tracking-widest flex items-center justify-center text-[#bd9476]`}>
            <Handshake className="w-4 h-4 mr-2" /> Direct Farm to Table
          </p>
          <h2 className="text-4xl sm:text-6xl font-extrabold leading-tight mb-6">
            Fair Prices for Farmers.
            <span className={`block text-[#dbc1ae] mt-2`}>Fresher Produce for You.</span>
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-gray-200 mb-10">
            Agrimitra eliminates the middleman, ensuring farmers earn the market value they deserve and customers receive quality products at competitive prices.
          </p>
          
          <div className="flex justify-center space-x-4">
            {/* Buttons adjusted for the dark background */}
            <a href="#join" className={`inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg shadow-lg text-[#4f3d2a] bg-white hover:bg-gray-100 transition duration-300 transform hover:scale-105`}>
              Start Shopping Now
            </a>
            <a href="#mission" className={`inline-flex items-center px-8 py-3 border border-white text-base font-medium rounded-lg text-white hover:bg-white hover:text-[#4f3d2a] transition duration-300`}>
              Learn Our Mission
            </a>
          </div>
        </div>
      </section>

      {/* Mission & Value Proposition */}
      <section id="mission" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className={`text-base text-[#bd9476] font-semibold tracking-wide uppercase`}>Our Core Values</h3>
            <p className="mt-2 text-3xl sm:text-4xl leading-8 font-extrabold tracking-tight text-gray-900">
              Why Agrimitra is the Future of Agriculture
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Value 1: Empowering Farmers */}
            <div className={`bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition duration-300 border border-[#efebe7]`}>
              <div className={`flex items-center justify-center h-12 w-12 rounded-full bg-[#f7f4f1] text-[#bd9476] mb-4`}>
                <TrendingUp className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Farmer Empowerment</h4>
              <p className="text-gray-600">
                Farmers receive the full, accurate market price for their produce, free from exploitative commissions and deductions by intermediaries.
              </p>
            </div>

            {/* Value 2: Transparency & Trust */}
            <div className={`bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition duration-300 border border-[#efebe7]`}>
              <div className={`flex items-center justify-center h-12 w-12 rounded-full bg-[#f7f4f1] text-[#bd9476] mb-4`}>
                <Users className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Customer Connection</h4>
              <p className="text-gray-600">
                Know exactly where your food comes from. We provide direct communication channels between you and the local farmers.
              </p>
            </div>

            {/* Value 3: Fresher Produce */}
            <div className={`bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition duration-300 border border-[#efebe7]`}>
              <div className={`flex items-center justify-center h-12 w-12 rounded-full bg-[#f7f4f1] text-[#bd9476] mb-4`}>
                <ShoppingCart className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Unmatched Freshness</h4>
              <p className="text-gray-600">
                Shorter supply chains mean less time from harvest to consumption, guaranteeing maximum nutritional value and taste for every item.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - Join Us */}
      <section id="join" className={`py-20 sm:py-28 bg-[#4f3d2a]`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to be part of the change?
          </h3>
          <p className={`text-xl ${textStoneLight} mb-10 max-w-4xl mx-auto`}>
            Whether you're a farmer seeking better returns or a customer looking for fresher, responsibly-sourced produce, Agrimitra is your platform.
          </p>

          <div className="flex flex-col md:flex-row justify-center space-y-6 md:space-y-0 md:space-x-8">
            {/* CTA for Farmers */}
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full md:w-96 text-center transform hover:scale-[1.02] transition duration-300">
              <h4 className={`text-2xl font-bold text-[#4f3d2a] mb-3`}>I am a Farmer</h4>
              <p className="text-gray-600 mb-6">
                List your products and connect directly with thousands of buyers. Secure your best price today.
              </p>
              <button className={`inline-flex items-center justify-center w-full px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-[#bd9476] hover:bg-[#a3806a] transition duration-300`}>
                Register My Farm <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>

            {/* CTA for Customers */}
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full md:w-96 text-center transform hover:scale-[1.02] transition duration-300">
              <h4 className={`text-2xl font-bold text-[#4f3d2a] mb-3`}>I am a Customer</h4>
              <p className="text-gray-600 mb-6">
                Explore fresh, local, and organic produce. Support local agriculture with every purchase.
              </p>
              <button className={`inline-flex items-center justify-center w-full px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-[#bd9476] hover:bg-[#a3806a] transition duration-300`}>
                Start Browsing <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`bg-[#231b11] text-white py-10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <Leaf className={`w-6 h-6 text-[#bd9476]`} />
              <p className="text-xl font-semibold">Agrimitra</p>
            </div>
            <p className="text-gray-400 mt-2 text-sm">Empowering farmers, enriching lives.</p>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition duration-150">Privacy Policy</a>
            <a href="#" className="hover:text-white transition duration-150">Terms of Service</a>
            <a href="#" className="hover:text-white transition duration-150">Contact</a>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-500 text-xs border-t border-[#4f3d2a] pt-4">
            &copy; {new Date().getFullYear()} Agrimitra. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;