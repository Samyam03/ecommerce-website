import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      console.log('Admin: Fetching all orders at:', new Date().toLocaleTimeString());
      
      const response = await axios.post(
        `${backendUrl}/api/order/list`, 
        {}, 
        { 
          headers: { token },
          // Add cache-busting parameter
          params: { timestamp: new Date().getTime() }
        }
      );
      
      if (response.data.success) {
        console.log('Admin: Received', response.data.orders.length, 'orders');
        // Sort orders by date, newest first
        const sortedOrders = response.data.orders.sort((a, b) => new Date(b.date) - new Date(a.date));
        setOrders(sortedOrders);
      } else {
        console.error('Error fetching orders:', response.data.message);
        toast.error(response.data.message || 'Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error(error.message || 'An error occurred while fetching orders');
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const status = event.target.value;
      
      // Show updating feedback
      toast.info(`Updating order to "${status}"...`, { autoClose: 2000 });
      
      const response = await axios.post(
        `${backendUrl}/api/order/status`, 
        { orderId, status },
        { 
          headers: { token },
          // Add cache-busting parameter to prevent caching
          params: { timestamp: new Date().getTime() }
        }
      );
      
      if (response.data.success) {
        toast.success(`Order updated to "${status}" successfully!`);
        // Re-fetch orders to ensure UI is in sync with backend
        await fetchAllOrders();
      } else {
        console.error("Error updating order:", response.data.message);
        toast.error(response.data.message || "Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error(error.message || "An error occurred while updating order status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-8">Order Page</h3>
      <div className="space-y-8">
        {orders.map((order, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg shadow-md bg-white p-6 flex flex-col md:flex-row items-start md:items-center gap-6 hover:shadow-lg transition-shadow"
          >
            {/* Section 1: Parcel Icon */}
            <div className="flex-none">
              <img
                src={assets.parcel_icon}
                alt="Parcel Icon"
                className="w-16 h-16"
              />
            </div>

            {/* Section 2: Address Details */}
            <div className="flex-grow text-left space-y-2">
              <div className="flex flex-wrap gap-2 mb-2">
                {order.items.map((item, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium"
                  >
                    {item.name} x {item.quantity}{" "}
                    <span className="italic text-xs">({item.size})</span>
                  </span>
                ))}
              </div>
              <p className="text-lg font-semibold text-gray-900">
                {order.address?.firstName} {order.address?.lastName}
              </p>
              <p className="text-sm text-gray-600">
                {order.address?.street}, {order.address?.city}
              </p>
              <p className="text-sm text-gray-600">
                {order.address?.state}, {order.address?.country},{" "}
                {order.address?.postalCode}
              </p>
              <p className="text-sm text-gray-600">{order.address?.phone}</p>
            </div>

            {/* Section 3: Order Summary */}
            <div className="flex-grow text-left space-y-1">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Items:</span> {order.items.length}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Method:</span>{" "}
                {order.paymentMethod}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Payment:</span>{" "}
                {order.payment ? "Done" : "Pending"}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Date:</span>{" "}
                {new Date(order.date).toLocaleDateString()}
              </p>
            </div>

            {/* Section 4: Payment and Status */}
            <div className="flex-none text-right space-y-4">
              <p className="text-xl font-bold text-gray-900">
                {currency}
                {order.amount}
              </p>
              <select
                onChange={(event) => statusHandler(event, order._id)}
                value={order.status}
                className="w-48 px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
