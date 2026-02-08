import React, { useEffect, useState } from "react";

const CustomerOrders = () => {
  // Replace later with auth-based email
  const customerEmail = localStorage.getItem("email");

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
              <span
                className={`text-sm font-bold ${
                  order.status === "pending"
                    ? "text-orange-600"
                    : "text-green-600"
                }`}
              >
                {order.status.toUpperCase()}
              </span>
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
