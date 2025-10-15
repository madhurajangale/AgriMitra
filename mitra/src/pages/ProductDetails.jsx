import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CropData from '../../CropData';
import { DELIVERY_LOCATIONS, PRODUCT_DESCRIPTIONS } from '../../Farmerdata';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const product = CropData.find(p => p.id === Number(id));

  const [selectedLocation, setSelectedLocation] = useState('Select Location');
  const [farmers, setFarmers] = useState([]);
  const [selectedFarmerId, setSelectedFarmerId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!product) {
    return <div className="text-center text-red-500 text-xl mt-10">Product not found.</div>;
  }

  const description = PRODUCT_DESCRIPTIONS[product.name] || "A truly fresh product from our fields, full of natural goodness.";

  // 🔹 Fetch farmers from backend whenever location changes
  useEffect(() => {
    console.log("first")
    const fetchFarmers = async () => {
      if (selectedLocation === 'Select Location') {
        setFarmers([]);
        return;
      }

      setLoading(true);
      setError("");
      try {
        console.log("second")
        const response = await fetch(
          `http://localhost:5000/api/farmer/get_all?location=${selectedLocation}&name=${product.name}`
        );

        const data = await response.json();
        console.log(data)
        if (response.ok) {
          setFarmers(data);
        } else {
          setFarmers([]);
          setError(data.message || "No farmers found.");
        }
      } catch (err) {
        console.error("Error fetching farmers:", err);
        setError("Failed to fetch farmers. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchFarmers();
  }, [selectedLocation, product.name]);

const selectedFarmer = farmers.find(f => f._id === selectedFarmerId);

  const subtotal = product.price * quantity;
  const delivery = selectedFarmer ? selectedFarmer.delivery_charge : 0;
  const total = subtotal + delivery;

  const handleAddToCart = () => {
    if (!selectedFarmerId) {
      alert("Please select a delivery location and a farmer first!");
      return;
    }
    alert(`Added ${quantity} units of ${product.name} (from ${selectedFarmer.name}) to cart! Total cost: ₹${total.toFixed(2)}`);
  };

    return (
        <div className="min-h-screen bg-[#f7f4f1] font-sans p-4 sm:p-8">
            <div className="max-w-6xl mx-auto">
                
                {/* Back Button (Placeholder) */}
                <button 
                    onClick={() => window.history.back()}
                    className="flex items-center text-[#4f3d2a] hover:text-[#bd9476] mb-6 font-semibold transition"
                >
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Back to Market
                </button>

                <div className="bg-white rounded-xl shadow-2xl p-6 lg:p-10">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-12">
                        
                        {/* LEFT COLUMN: Image and Core Info */}
                        <div>
                            <div className="rounded-lg overflow-hidden shadow-xl mb-6">
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="w-full h-80 object-cover" 
                                />
                            </div>
                            
                            <h1 className="text-3xl font-bold text-[#4f3d2a] mb-2">{product.name}</h1>
                            <p className="text-xl font-extrabold text-green-700 mb-4">
                                ${product.price.toFixed(2)} <span className="text-lg font-normal text-gray-500">/{product.unit}</span>
                            </p>
                            
                            {/* Product Description */}
                            <div className="mt-6 border-t pt-4">
                                <h2 className="text-2xl font-semibold text-[#4f3d2a] mb-3">About this Produce</h2>
                                <p className="text-gray-700 leading-relaxed italic">
                                    {description}
                                </p>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Selection and Order */}
                        <div className="mt-8 lg:mt-0 lg:border-l lg:pl-12">
                            <h2 className="text-2xl font-semibold text-[#4f3d2a] mb-6">Order Details</h2>

                            {/* 1. SELECT DELIVERY LOCATION */}
                            <div className="mb-6">
                                <label htmlFor="location" className="block text-lg font-medium text-gray-700 mb-2">
                                    1. Select Delivery Location
                                </label>
                                <select
                                    id="location"
                                    value={selectedLocation}
                                    onChange={(e) => {
                                        setSelectedLocation(e.target.value);
                                        setSelectedFarmerId(null); // Reset farmer on location change
                                    }}
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-[#bd9476] focus:border-[#bd9476] transition"
                                >
                                    {DELIVERY_LOCATIONS.map(loc => (
                                        <option key={loc} value={loc} disabled={loc === 'Select Location'}>
                                            {loc}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* 2. SELECT FARMER LIST */}
                            {selectedLocation !== 'Select Location' && (
                                <div className="mb-6 border-t pt-4">
                                    <h3 className="text-lg font-medium text-gray-700 mb-3">
                                        2. Choose a Farmer in {selectedLocation}
                                    </h3>
                                    {farmers.length > 0 ? (
                                        <div className="space-y-3">
                                            {farmers.map(farmer => (
                                                <div 
                                                    key={farmer._id}
                                                    onClick={() => setSelectedFarmerId(farmer._id)}  // use _id
                                                    className={`p-4 border rounded-lg cursor-pointer transition duration-200
                                                        ${selectedFarmerId === farmer._id 
                                                            ? 'border-4 border-[#bd9476] bg-[#fdf5ed] shadow-inner' 
                                                            : 'border-gray-200 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    <p className="font-bold text-[#4f3d2a]">Farmer: {farmer.farmerName}</p>
                                                    <p className="text-sm font-semibold text-green-700">
                                                        Delivery: ₹{farmer.delivery_charge.toFixed(2)}
                                                    </p>
                                                </div>
                                            ))}

                                        </div>
                                    ) : (
                                        <p className="text-sm text-red-500">No farmers found delivering to {selectedLocation}.</p>
                                    )}
                                </div>
                            )}

                            {/* 3. QUANTITY & CART OPTIONS */}
                            {selectedFarmerId && (
                                <div className="mt-8 border-t pt-4">
                                    <h3 className="text-lg font-medium text-gray-700 mb-4">
                                        3. Finalize Order
                                    </h3>
                                    
                                    {/* Quantity Picker */}
                                    <div className="flex items-center justify-between mb-4">
                                        <label htmlFor="quantity" className="font-semibold text-gray-700">Quantity ({product.unit}):</label>
                                        <input
                                            type="number"
                                            id="quantity"
                                            min="1"
                                            value={quantity}
                                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                            className="w-20 p-2 border border-gray-300 rounded-lg text-center"
                                        />
                                    </div>

                                    {/* Total Summary */}
                                    <div className="space-y-2 py-4 border-t border-b mb-6">
                                        <div className="flex justify-between text-gray-600">
                                            <span>Subtotal ({quantity} x ${product.price.toFixed(2)}):</span>
                                            <span>${subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-600">
                                            <span>Delivery Cost (from {selectedFarmer.name}):</span>
                                            <span>${delivery.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-xl font-bold text-[#4f3d2a]">
                                            <span>Total (incl. Delivery):</span>
                                            <span>${total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    
                                    {/* Add to Cart Button */}
                                    <button
                                        onClick={handleAddToCart}
                                        className="w-32 h-10 py-4 bg-green-600 text-white text-sm font-bold rounded-lg hover:bg-green-700 transition duration-150 shadow-xl flex items-center justify-center"
                                    >
                                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                                        Add to Cart
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;