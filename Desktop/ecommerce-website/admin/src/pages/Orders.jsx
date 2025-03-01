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
      const response = await axios.post(`${backendUrl}/api/order/list`, {}, { headers: { token } });
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const statusHandler = async (event,orderId) => {
        try{
          const response = await axios.post(`${backendUrl}/api/order/status`, {orderId, status:event.target.value}, { headers: { token } });
          if (response.data.success) {
            await fetchAllOrders();
          } 
          else {
            console.log(response.data.message);
            toast.error(response.data.message);
          }

        }
        catch(error){
          console.log(error);
          toast.error(error.message);

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
                onChange={(event) => statusHandler(event,order._id)}
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
