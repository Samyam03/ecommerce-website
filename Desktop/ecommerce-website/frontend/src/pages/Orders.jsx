import React, { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastFetchTime, setLastFetchTime] = useState(null);

  const loadOrderData = async (showLoading = true) => {
    try {
      if (!token) {
        console.error('No token found');
        return;
      }
      
      if (showLoading) {
        setLoading(true);
      }
      
      
      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        { userId: localStorage.getItem('userId') },
        { 
          headers: { Authorization: `Bearer ${token}` },
          // Add cache-busting parameter to prevent caching
          params: { timestamp: new Date().getTime() }
        }
      );
      
      
      const sortedOrders = response.data.orders.sort((a, b) => new Date(b.date) - new Date(a.date));
      setOrderData(sortedOrders);
      setLastFetchTime(new Date());
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      if (showLoading) {
        setLoading(false);
      }
    }
  };

  // Initial load
  useEffect(() => {
    if (token) {
      loadOrderData();
    }
  }, [token]);

  // More frequent polling (every 15 seconds instead of 30)
  useEffect(() => {
    const intervalId = setInterval(() => {
      loadOrderData(false); // Don't show loading indicator for background refreshes
    }, 15000); // 15 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [token]);

  // Optional: Add color coding for status
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'order placed': return 'bg-yellow-400';
      case 'packing': return 'bg-orange-400';
      case 'shipped': return 'bg-blue-400';
      case 'out for delivery': return 'bg-purple-400';
      case 'delivered': return 'bg-green-400';
      default: return 'bg-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'order placed': 
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'packing':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        );
      case 'shipped':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        );
      case 'out for delivery':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'delivered':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  // Calculate total amount for each order
  const calculateTotalAmount = (items) => {
    return items.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Page Title */}
        <div className='text-center text-3xl font-bold pt-8 border-t border-gray-200/50 pb-8'>
          <Title text1="MY " text2="ORDERS" />
        </div>
        
        {/* Header Actions */}
        <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8'>
          <div className="text-center sm:text-left">
            <p className="text-lg text-gray-600">
              Track and manage all your orders in one place
            </p>
          </div>
          
          <div className='flex flex-col sm:flex-row items-center gap-3'>
            <button 
              onClick={() => loadOrderData(true)} 
              className='inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed'
              disabled={loading}
            >
              <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {loading ? 'Refreshing...' : 'Refresh Orders'}
            </button>
            {lastFetchTime && (
              <p className='text-xs text-gray-500 text-center sm:text-left'>
                Last updated: {lastFetchTime.toLocaleTimeString()}
              </p>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading && orderData.length === 0 && (
          <div className="text-center py-16">
            <div className="mb-4">
              <svg className="w-12 h-12 text-gray-400 mx-auto animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <p className='text-gray-600 text-lg'>Loading your orders...</p>
          </div>
        )}

        {/* Orders List */}
        <div className='space-y-6'>
          {orderData.length > 0 ? (
            orderData.map((order, orderIndex) => {
              const totalAmount = calculateTotalAmount(order.items);
              return (
                <div key={orderIndex} className='bg-white rounded-2xl shadow-sm border border-gray-200/50 p-8 hover:shadow-md transition-all duration-300'>
                  {/* Order Header */}
                  <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b border-gray-200 pb-6'>
                    <div className='flex items-center gap-3'>
                      <div className={`p-2 rounded-full ${getStatusColor(order.status)} text-white`}>
                        {getStatusIcon(order.status)}
                      </div>
                      <div>
                        <p className='text-lg font-semibold text-gray-900'>{order.status}</p>
                        <p className='text-sm text-gray-500'>
                          Order placed on {new Date(order.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className='text-2xl font-bold text-gray-900'>
                        {currency}{totalAmount.toFixed(2)}
                      </p>
                      <p className='text-sm text-gray-500'>Total Amount</p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className='mt-8 space-y-6'>
                    {order.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className='flex flex-col sm:flex-row sm:items-center gap-6 p-6 bg-gray-50 rounded-2xl shadow border border-gray-100 hover:bg-gray-100 transition-colors duration-200'
                      >
                        <div className='flex items-center gap-6 flex-1 min-w-0'>
                          <div className='w-20 h-20 flex-shrink-0'>
                            {item.image?.length > 0 ? (
                              <img
                                className='w-full h-full object-cover rounded-xl shadow'
                                src={item.image[0]}
                                alt={item.name}
                              />
                            ) : (
                              <div className='w-full h-full bg-gray-200 rounded-xl flex items-center justify-center'>
                                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className='flex-1 min-w-0'>
                            <h3 className='text-lg sm:text-xl font-bold text-gray-900 mb-1 truncate'>
                              {item.name || 'Product name unavailable'}
                            </h3>
                            <div className='flex flex-wrap items-center gap-4 text-base text-gray-700 font-medium mb-1'>
                              <div className="flex items-center gap-1">
                                <span>Qty:</span>
                                <span className='font-semibold'>{item.quantity}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span>Size:</span>
                                <span className='font-semibold'>{item.size || 'N/A'}</span>
                              </div>
                            </div>
                            <div className='text-sm text-gray-500'>
                              {currency}{parseFloat(item.price).toFixed(2)} each
                            </div>
                          </div>
                        </div>
                        <div className="text-right min-w-[90px]">
                          <p className='text-xl sm:text-2xl font-extrabold text-gray-900'>
                            {currency}{(parseFloat(item.price) * item.quantity).toFixed(2)}
                          </p>
                          <p className='text-xs text-gray-500'>Total</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          ) : !loading ? (
            <div className="text-center py-16">
              <div className="mb-6">
                <svg className="w-20 h-20 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No orders yet</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                You haven't placed any orders yet. Start shopping to see your orders here.
              </p>
              <button 
                onClick={() => window.location.href = '/collection'}
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
              >
                <span>Start Shopping</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Orders;