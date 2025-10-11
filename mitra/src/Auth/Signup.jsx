import React, { useState } from 'react';
// Import necessary icons
import { Leaf, Tractor, ShoppingBag, Mail, Lock, User, MapPin, Crop } from 'lucide-react';
import { Link } from 'react-router-dom';
// Main Signup Component
const Signup = () => {
  // State to track the user's role: 'farmer' or 'customer'
  const [userType, setUserType] = useState('customer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Farmer-specific fields
  const [location, setLocation] = useState('');
  const [crops, setCrops] = useState(''); // Use a string for simple input, later parsed into an array
  const [message, setMessage] = useState(''); // Feedback message

  // --- Signup Simulation ---
  const handleSignup = (e) => {
    e.preventDefault();
    let userData = { name, email, password };

    if (userType === 'farmer') {
      userData = {
        ...userData,
        location,
        // Assuming crops is a comma-separated string for simplicity in the UI
        crops: crops.split(',').map(c => c.trim()).filter(c => c.length > 0)
      };
    }
    
    setMessage(`Attempting to register as ${userType}...`);

    // Log the data for debugging/verification
    console.log('Signup Data:', userData);

    // Simulate API call delay
    setTimeout(() => {
      setMessage('Registration successful! Please check your email.');
      // Reset form fields after simulation
      setName('');
      setEmail('');
      setPassword('');
      setLocation('');
      setCrops('');
    }, 2500);
  };

  const isFarmer = userType === 'farmer';
  const baseButtonClass = "flex-1 p-3 text-center text-sm font-semibold rounded-lg transition duration-200 shadow-md";

  // Helper for consistent Input field structure
  const InputField = ({ label, id, type = 'text', value, onChange, placeholder, Icon, required = true }) => (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          className={`w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bd9476] focus:border-[#bd9476] transition`}
          placeholder={placeholder}
          required={required}
        />
      </div>
    </div>
  );
  
  return (
    <div className={`min-h-screen flex items-center justify-center p-4 bg-[#f7f4f1] font-sans`}>
      <div className="w-full max-w-md">
        
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <Leaf className={`w-10 h-10 mx-auto text-[#bd9476]`} />
          <h1 className={`text-3xl font-extrabold text-[#4f3d2a] mt-2`}>
            Join Agrimitra
          </h1>
          <p className="text-gray-500 mt-1">Create your account to start connecting.</p>
        </div>

        {/* Signup Card */}
        <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-[#efebe7]">
          
          {/* Role Selector */}
          <div className="flex space-x-4 mb-8 bg-gray-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setUserType('farmer')}
              className={`${baseButtonClass} ${
                isFarmer 
                  ? `bg-[#bd9476] text-white` 
                  : `bg-transparent text-gray-600 hover:bg-[#efebe7]`
              }`}
            >
              <Tractor className="w-5 h-5 inline mr-2" /> Farmer Signup
            </button>
            <button
              type="button"
              onClick={() => setUserType('customer')}
              className={`${baseButtonClass} ${
                !isFarmer
                  ? `bg-[#bd9476] text-white`
                  : `bg-transparent text-gray-600 hover:bg-[#efebe7]`
              }`}
            >
              <ShoppingBag className="w-5 h-5 inline mr-2" /> Customer Signup
            </button>
          </div>
          
          <h2 className={`text-xl font-bold mb-6 text-center text-[#4f3d2a]`}>
            Register as {isFarmer ? 'Farmer' : 'Customer'}
          </h2>

          <form onSubmit={handleSignup}>
            
            {/* Name Input */}
            <InputField
              label="Full Name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              Icon={User}
            />

            {/* Email Input */}
            <InputField
              label="Email Address"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              Icon={Mail}
            />

            {/* Password Input */}
            <InputField
              label="Password"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              Icon={Lock}
            />
            
            {/* Farmer-Specific Fields */}
            {isFarmer && (
              <>
                {/* Location Input */}
                <InputField
                  label="Farm Location (City/Region)"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., California, USA"
                  Icon={MapPin}
                />
                
                {/* Crops Input */}
                <InputField
                  label="Primary Crops (Comma Separated)"
                  id="crops"
                  value={crops}
                  onChange={(e) => setCrops(e.target.value)}
                  placeholder="e.g., Wheat, Corn, Soybeans"
                  Icon={Crop}
                  // Crops field is optional in the schema, but location is required for a farmer.
                  required={false} 
                />
              </>
            )}

            {/* Signup Button */}
            <button
              type="submit"
              className={`w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-md text-white bg-[#bd9476] hover:bg-[#a68269] transition duration-300 transform hover:scale-[1.01] mt-4`}
            >
              Create Account
            </button>
          </form>

          {/* Message Area */}
          {message && (
            <p className="mt-4 text-center text-sm text-gray-600 p-3 bg-[#f7f4f1] rounded-lg border border-[#efebe7]">
              {message}
            </p>
          )}
          
          {/* Footer Links */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Already have an account? 
              <Link to="/login" className={`font-semibold ml-1 text-[#4f3d2a] hover:text-[#bd9476] transition`}>
                Log in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
