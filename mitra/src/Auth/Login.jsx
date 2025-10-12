import React, { useState } from "react";
import { Leaf, Tractor, ShoppingBag, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [userType, setUserType] = useState("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const isFarmer = userType === "farmer";
  const baseButtonClass =
    "flex-1 p-3 text-center text-sm font-semibold rounded-lg transition duration-200 shadow-md";

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/api/${userType}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          role: userType, // Include userType to differentiate roles
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Login successful! Redirecting...");
        // Save user info if needed
        localStorage.setItem("user", JSON.stringify(data));

        setTimeout(() => {
          // Redirect to home or dashboard
          navigate("/");
        }, 1500);
      } else {
        setMessage(data.message || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#f7f4f1] font-sans">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <Leaf className="w-10 h-10 mx-auto text-[#bd9476]" />
          <h1 className="text-3xl font-extrabold text-[#4f3d2a] mt-2">
            Welcome to Agrimitra
          </h1>
          <p className="text-gray-500 mt-1">
            Sign in to connect, trade, and grow.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-[#efebe7]">
          {/* Role Selector */}
          <div className="flex space-x-4 mb-8 bg-gray-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setUserType("farmer")}
              className={`${baseButtonClass} ${
                isFarmer
                  ? `bg-[#bd9476] text-white`
                  : `bg-transparent text-gray-600 hover:bg-[#efebe7]`
              }`}
            >
              <Tractor className="w-5 h-5 inline mr-2" /> Farmer Login
            </button>
            <button
              type="button"
              onClick={() => setUserType("customer")}
              className={`${baseButtonClass} ${
                !isFarmer
                  ? `bg-[#bd9476] text-white`
                  : `bg-transparent text-gray-600 hover:bg-[#efebe7]`
              }`}
            >
              <ShoppingBag className="w-5 h-5 inline mr-2" /> Customer Login
            </button>
          </div>

          <h2 className="text-xl font-bold mb-6 text-center text-[#4f3d2a]">
            Sign in as {isFarmer ? "Farmer" : "Customer"}
          </h2>

          <form onSubmit={handleLogin}>
            {/* Email Input */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bd9476] focus:border-[#bd9476] transition"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bd9476] focus:border-[#bd9476] transition"
                  placeholder="********"
                  required
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-md text-white ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#4f3d2a] hover:bg-black"
              } transition duration-300 transform hover:scale-[1.01]`}
            >
              {loading ? "Signing In..." : "Sign In"}
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
            <Link
              to="/signup"
              className="text-sm text-gray-500 hover:text-[#bd9476] transition"
            >
              Not signed up yet? Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
