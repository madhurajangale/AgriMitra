import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const CustomerOrders = () => {
  // Replace later with auth-based email
  const customerEmail = localStorage.getItem("email");
const [showRating, setShowRating] = useState(false);
const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
    useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/order/customer/by-email/${encodeURIComponent(
            customerEmail
          )}`
        );

        const data = await response.json();

        if (response.ok) {
          setOrders(data.orders);
          setCustomer(data.customer);
        } else {
          setError(data.message);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    if (customerEmail) {
      fetchOrders();
    }
  }, [customerEmail]);
  
const handleRateProduct = (order) => {
  
  setSelectedOrder(order);
  setShowRating(true);
};
const submitRating = async (rating) => {
  try {
    console.log(selectedOrder)
    const response = await fetch(
      `http://127.0.0.1:5000/api/rate/crop/${selectedOrder.farmerName}/${selectedOrder.item}/rating`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: rating,
          user: customer.name
        }),
      }
    );

    const data = await response.json();
    console.log("Response:", data);

    setShowRating(false);
  } catch (error) {
    console.error("Error submitting rating:", error);
  }
};


  if (loading) return <p className="text-center mt-10">Loading orders...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="min-h-screen bg-[#f7f4f1] p-6">
      <h1 className="text-3xl font-bold text-center text-[#4f3d2a] mb-2">
        My Orders
      </h1>
      <p className="text-center text-gray-600 mb-8">
        {customer?.name} ({customer?.email})
      </p>

      <div className="max-w-4xl mx-auto space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white p-5 rounded-xl shadow border border-gray-200"
          >
            <div className="flex justify-between mb-2">
              <h2 className="text-lg font-semibold text-[#4f3d2a]">
                {order.item}
              </h2>
             {order.status === "delivered" ? (
  <button
    className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
    onClick={() => handleRateProduct(order)}
  >
    Rate Product
  </button>
) : order.status === "rated" ? (
  <span className="text-sm font-bold text-purple-600">
    Already Rated
  </span>
) : (
  <span
    className={`text-sm font-bold ${
      order.status === "pending"
        ? "text-orange-600"
        : "text-green-600"
    }`}
  >
    {order.status.toUpperCase()}
  </span>
)}
{showRating && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
      <h2 className="text-lg font-bold mb-4">Rate Product</h2>

      <div className="flex gap-3 justify-center mb-4">
        {[1,2,3,4,5].map((num) => (
          <button
            key={num}
            onClick={() => submitRating(num)}
            className="px-4 py-2 bg-yellow-400 rounded hover:bg-yellow-500"
          >
            {num}
          </button>
        ))}
      </div>

      <button
        onClick={() => setShowRating(false)}
        className="text-sm text-red-500"
      >
        Cancel
      </button>
    </div>
  </div>
)}
            </div>

            <p>Farmer: <b>{order.farmerName}</b></p>
            <p>Quantity: <b>{order.quantity}</b></p>
            <p>Delivery Address: <b>{order.address}</b></p>

            <p className="text-lg font-bold text-green-700 mt-2">
              ₹{order.totalPrice.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerOrders;
