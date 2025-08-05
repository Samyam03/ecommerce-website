import { useEffect, useCallback } from "react";
import { useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../../../constants";
import { toast } from "react-toastify";
import PropTypes from 'prop-types';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [updatingStatus, setUpdatingStatus] = useState(null);

  const fetchAllOrders = useCallback(async () => {
    if (!token) {
      return null;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`, 
        {}, 
        { 
          headers: { token },
          params: { timestamp: new Date().getTime() }
        }
      );
      
      if (response.data.success) {
        const sortedOrders = response.data.orders.sort((a, b) => new Date(b.date) - new Date(a.date));
        setOrders(sortedOrders);
      } else {
        console.error('Error fetching orders:', response.data.message);
        toast.error(response.data.message || 'Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error(error.message || 'An error occurred while fetching orders');
    } finally {
      setLoading(false);
    }
  }, [token]);

  const statusHandler = async (event, orderId) => {
    const status = event.target.value;
    setUpdatingStatus(orderId);
    
    try {
      toast.info(`Updating order to "${status}"...`, { autoClose: 2000 });
      
      const response = await axios.post(
        `${backendUrl}/api/order/status`, 
        { orderId, status },
        { 
          headers: { token },
          params: { timestamp: new Date().getTime() }
        }
      );
      
      if (response.data.success) {
        toast.success(`Order updated to "${status}" successfully!`);
        await fetchAllOrders();
      } else {
        console.error("Error updating order:", response.data.message);
        toast.error(response.data.message || "Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error(error.message || "An error occurred while updating order status");
    } finally {
      setUpdatingStatus(null);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token, fetchAllOrders]);

  // Filter orders based on search term and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.address?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.address?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === 'All' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Get order statistics
  const orderStats = {
    total: orders.length,
    pending: orders.filter(order => order.status === 'Order Placed').length,
    processing: orders.filter(order => ['Packing', 'Shipped'].includes(order.status)).length,
    delivered: orders.filter(order => order.status === 'Delivered').length,
    revenue: orders.reduce((sum, order) => sum + (order.payment ? order.amount : 0), 0)
  };

  // Status configurations
  const statusConfig = {
    'Order Placed': { color: 'bg-blue-100 text-blue-800', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    'Packing': { color: 'bg-yellow-100 text-yellow-800', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
    'Shipped': { color: 'bg-purple-100 text-purple-800', icon: 'M8 17l4 4 4-4m-4-5v9m0-13a4 4 0 00-4 4v1a2 2 0 002 2h8a2 2 0 002-2v-1a4 4 0 00-4-4z' },
    'Out for Delivery': { color: 'bg-orange-100 text-orange-800', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    'Delivered': { color: 'bg-green-100 text-green-800', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' }
  };

  const getStatusInfo = (status) => statusConfig[status] || statusConfig['Order Placed'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-100 rounded-xl">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
              <p className="text-gray-600">Track and manage customer orders</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-gray-200/50 p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{orderStats.total}</p>
                  <p className="text-sm text-gray-600">Total Orders</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200/50 p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{orderStats.pending}</p>
                  <p className="text-sm text-gray-600">Pending</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200/50 p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{orderStats.processing}</p>
                  <p className="text-sm text-gray-600">Processing</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200/50 p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{orderStats.delivered}</p>
                  <p className="text-sm text-gray-600">Delivered</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200/50 p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{currency}{orderStats.revenue}</p>
                  <p className="text-sm text-gray-600">Revenue</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-white rounded-xl border border-gray-200/50 p-6 shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search orders by customer name or product..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="sm:w-48">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              >
                <option value="All">All Status</option>
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>

            {/* Refresh Button */}
            <button
              onClick={fetchAllOrders}
              disabled={loading}
              className="px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 disabled:bg-gray-400 transition-all duration-300 flex items-center gap-2"
            >
              <svg className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {loading ? (
            <div className="bg-white rounded-xl border border-gray-200/50 shadow-sm p-16">
              <div className="text-center">
                <svg className="animate-spin w-8 h-8 text-purple-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <p className="text-gray-600">Loading orders...</p>
              </div>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200/50 shadow-sm p-16">
              <div className="text-center">
                <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders found</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || filterStatus !== 'All' 
                    ? 'Try adjusting your search or filters' 
                    : 'No orders have been placed yet'
                  }
                </p>
                {searchTerm || filterStatus !== 'All' ? (
                  <button
                    onClick={() => {
                      setSearchTerm('')
                      setFilterStatus('All')
                    }}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300"
                  >
                    Clear Filters
                  </button>
                ) : null}
              </div>
            </div>
          ) : (
            filteredOrders.map((order, index) => (
              <div
                key={order._id || index}
                className="bg-white rounded-xl border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  {/* Order Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={getStatusInfo(order.status).icon} />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Order #{order._id?.slice(-8)}</h3>
                        <p className="text-sm text-gray-600">{new Date(order.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">{currency}{order.amount}</p>
                      <p className={`text-sm ${order.payment ? 'text-green-600' : 'text-red-600'}`}>
                        {order.payment ? 'Payment Completed' : 'Payment Pending'}
                      </p>
                    </div>
                  </div>

                                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:items-stretch">
                     {/* Customer & Shipping Info */}
                     <div className="lg:col-span-1">
                       <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-200/50 h-full flex flex-col">
                         <div className="flex items-center gap-2 mb-3">
                           <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                           </svg>
                           <h4 className="font-semibold text-gray-900">Customer Details</h4>
                         </div>
                         <div className="space-y-2 text-sm flex-1">
                           <p className="font-medium text-gray-900">
                             {order.address?.firstName} {order.address?.lastName}
                           </p>
                           <p className="text-gray-600">{order.address?.phone}</p>
                           <div className="text-gray-600">
                             <p>{order.address?.street}</p>
                             <p>{order.address?.city}, {order.address?.state}</p>
                             <p>{order.address?.country} {order.address?.postalCode}</p>
                           </div>
                         </div>
                       </div>
                     </div>

                     {/* Order Items */}
                     <div className="lg:col-span-1">
                       <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-200/50 h-full flex flex-col">
                         <div className="flex items-center gap-2 mb-3">
                           <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                           </svg>
                           <h4 className="font-semibold text-gray-900">Items ({order.items.length})</h4>
                         </div>
                         <div className="space-y-2 flex-1 overflow-y-auto">
                           {order.items.map((item, itemIndex) => (
                             <div key={itemIndex} className="flex justify-between items-start text-sm p-2 bg-white rounded-lg border border-gray-200/30">
                               <div className="flex-1">
                                 <p className="font-medium text-gray-900 leading-tight">{item.name}</p>
                                 <p className="text-gray-600 text-xs mt-1">Size: {item.size} • Qty: {item.quantity}</p>
                               </div>
                             </div>
                           ))}
                         </div>
                       </div>
                     </div>

                     {/* Status & Actions */}
                     <div className="lg:col-span-1">
                       <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-200/50 h-full flex flex-col">
                         <div className="flex items-center gap-2 mb-3">
                           <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                           </svg>
                           <h4 className="font-semibold text-gray-900">Order Status</h4>
                         </div>
                         
                         <div className="space-y-4 flex-1 flex flex-col">
                           <div className="flex items-center gap-2">
                             <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusInfo(order.status).color}`}>
                               <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={getStatusInfo(order.status).icon} />
                               </svg>
                               {order.status}
                             </span>
                           </div>
                           
                           <div className="flex-1">
                             <label className="block text-sm font-medium text-gray-700 mb-2">Update Status</label>
                             <select
                               onChange={(event) => statusHandler(event, order._id)}
                               value={order.status}
                               disabled={updatingStatus === order._id}
                               className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                             >
                               <option value="Order Placed">Order Placed</option>
                               <option value="Packing">Packing</option>
                               <option value="Shipped">Shipped</option>
                               <option value="Out for Delivery">Out for Delivery</option>
                               <option value="Delivered">Delivered</option>
                             </select>
                             {updatingStatus === order._id && (
                               <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                                 <svg className="animate-spin w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                 </svg>
                                 Updating...
                               </div>
                             )}
                           </div>
                           
                           <div className="text-sm text-gray-600 mt-auto">
                             <p><span className="font-medium">Payment Method:</span> {order.paymentMethod}</p>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

Orders.propTypes = {
  token: PropTypes.string.isRequired,
};

export default Orders;
