import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CropData from "../../CropData";
import { PRODUCT_DESCRIPTIONS } from "../../Farmerdata";
import axios from "axios";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = CropData.find((p) => p.id === Number(id));

  const [farmers, setFarmers] = useState([]);
  const [selectedFarmerId, setSelectedFarmerId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const description = product
    ? PRODUCT_DESCRIPTIONS[product.name] ||
      "A truly fresh product from our fields, full of natural goodness."
    : "";

  useEffect(() => {
    const fetchFarmers = async () => {
      if (!product) return;

      setLoading(true);
      setError("");

      try {
       const response = await axios.get("http://localhost:5000/api/farmer/get_all", {
  params: { name: product.name }
});

        const data = await response.data;
        console.log("Farmers fetched:", data);

        if (response.status === 200) {
          setFarmers(data);
          setSelectedFarmerId(null);
        } else {
          setFarmers([]);
          setError(data.message || "No farmers found.");
        }
      } catch (err) {
        console.error("Error fetching farmers:", err);
        setError("Failed to fetch farmers. Please try again later.");
        setFarmers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFarmers();
  }, [product]);

  if (!product) {
    return (
      <div className="text-center text-red-500 text-xl mt-10">
        Product not found.
      </div>
    );
  }

  const selectedFarmer = farmers.find((f) => f._id === selectedFarmerId);
  const marketPrice = selectedFarmer ? Number(selectedFarmer.market_price) : 0;
  const total = marketPrice * quantity;

  const handleAddToCart = () => {
    if (!selectedFarmer) {
      alert("Please select a farmer first!");
      return;
    }

    navigate("/order", {
      state: {
        productName: product.name,
        quantity,
        total,
        farmerId: selectedFarmer._id,
        farmerName: selectedFarmer.farmerName,
        farmerLocation: selectedFarmer.location,
        marketPrice,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#f7f4f1] font-sans p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => window.history.back()}
          className="flex items-center text-[#4f3d2a] hover:text-[#bd9476] mb-6 font-semibold transition"
        >
          <svg
            className="w-5 h-5 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Market
        </button>

        <div className="bg-white rounded-xl shadow-2xl p-6 lg:p-10">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12">
            {/* LEFT */}
            <div>
              <div className="rounded-lg overflow-hidden shadow-xl mb-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 object-cover"
                />
              </div>

              <h1 className="text-3xl font-bold text-[#4f3d2a] mb-2">
                {product.name}
              </h1>

              <div className="mt-6 border-t pt-4">
                <h2 className="text-2xl font-semibold text-[#4f3d2a] mb-3">
                  About this Produce
                </h2>
                <p className="text-gray-700 leading-relaxed italic">
                  {description}
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="mt-8 lg:mt-0 lg:border-l lg:pl-12">
              <h2 className="text-2xl font-semibold text-[#4f3d2a] mb-6">
                Order Details
              </h2>

              <div className="mb-6 border-t pt-4">
                <h3 className="text-lg font-medium text-gray-700 mb-3">
                  1. Choose a Farmer
                </h3>

                {loading && (
                  <p className="text-sm text-gray-500">Loading farmers...</p>
                )}

                {error && <p className="text-sm text-red-500">{error}</p>}

                {!loading && farmers.length > 0 ? (
                  <div className="space-y-3">
                    {farmers.map((farmer) => (
                      <div
                        key={farmer._id}
                        onClick={() => setSelectedFarmerId(farmer._id)}
                        className={`p-4 border rounded-lg cursor-pointer transition duration-200 ${
                          selectedFarmerId === farmer._id
                            ? "border-4 border-[#bd9476] bg-[#fdf5ed] shadow-inner"
                            : "border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <p className="text-sm font-semibold text-yellow-600">
                          Rating:{" "}
                          {farmer.rating
                            ? `⭐ ${Number(farmer.rating).toFixed(1)}`
                            : "No ratings yet"}
                        </p>

                        <p className="font-bold text-[#4f3d2a]">
                          Farmer: {farmer.farmerName}
                        </p>

                        <p className="text-sm font-semibold text-blue-700">
                          Farm Location: {farmer.location || "N/A"}
                        </p>

                        <p className="text-sm font-semibold text-green-700">
                          Market Price: ₹
                          {Number(farmer.market_price || 0).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  !loading &&
                  !error && (
                    <p className="text-sm text-red-500">
                      No farmers found for this product.
                    </p>
                  )
                )}
              </div>

              {selectedFarmerId && (
                <div className="mt-8 border-t pt-4">
                  <h3 className="text-lg font-medium text-gray-700 mb-4">
                    2. Finalize Order
                  </h3>

                  <div className="flex items-center justify-between mb-4">
                    <label
                      htmlFor="quantity"
                      className="font-semibold text-gray-700"
                    >
                      Quantity ({product.unit}):
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      min="1"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                      }
                      className="w-20 p-2 border border-gray-300 rounded-lg text-center"
                    />
                  </div>

                  <div className="space-y-2 py-4 border-t border-b mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Farmer:</span>
                      <span>{selectedFarmer?.farmerName || "N/A"}</span>
                    </div>

                    <div className="flex justify-between text-gray-600">
                      <span>Farmer City:</span>
                      <span>{selectedFarmer?.location || "N/A"}</span>
                    </div>

                    <div className="flex justify-between text-gray-600">
                      <span>Market Price:</span>
                      <span>₹{marketPrice.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-gray-600">
                      <span>Quantity:</span>
                      <span>{quantity}</span>
                    </div>

                    <div className="flex justify-between text-xl font-bold text-[#4f3d2a]">
                      <span>Subtotal:</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="w-32 h-10 py-4 bg-green-600 text-white text-sm font-bold rounded-lg hover:bg-green-700 transition duration-150 shadow-xl flex items-center justify-center"
                  >
                    <svg
                      className="w-6 h-6 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Order
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