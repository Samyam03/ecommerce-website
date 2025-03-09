import React, { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        console.error('No token found');
        return;
      }
      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        { userId: localStorage.getItem('userId') },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const sortedOrders = response.data.orders.sort((a, b) => new Date(b.date) - new Date(a.date));
      setOrderData(sortedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  // Optional: Add color coding for status
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-500';
      case 'shipped': return 'bg-blue-500';
      case 'delivered': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  // Calculate total amount for each order
  const calculateTotalAmount = (items) => {
    return items.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);
  };

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={"MY "} text2={"ORDERS"} />
      </div>

      <div className='mt-8 space-y-8'>
        {orderData.length > 0 ? (
          orderData.map((order, orderIndex) => {
            const totalAmount = calculateTotalAmount(order.items);
            return (
              <div key={orderIndex} className='bg-white rounded-lg shadow-sm p-6'>
                {/* Order Header - Status and Track Button */}
                <div className='flex justify-between items-center border-b pb-4'>
                  <div className='flex items-center gap-2'>
                    <div className={`min-w-2 h-2 rounded-full ${getStatusColor(order.status)}`} />
                    <p className='text-base font-medium text-gray-700'>{order.status}</p>
                  </div>
                  <button 
                    onClick={loadOrderData} 
                    className='border border-gray-300 px-4 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200'
                  >
                    Track Order
                  </button>
                </div>

                {/* Order Items */}
                <div className='mt-6 space-y-6'>
                  {order.items.map((item, itemIndex) => (
                    <div key={itemIndex} className='flex items-start justify-between gap-6'>
                      <div className='flex items-start gap-6 flex-1'>
                        <div className='w-20 h-20 flex-shrink-0'>
                          {item.image?.length > 0 ? (
                            <img className='w-full h-full object-cover rounded-lg' src={item.image[0]} alt={item.name} />
                          ) : (
                            <div className='w-full h-full bg-gray-100 rounded-lg' />
                          )}
                        </div>
                        <div className='flex-1'>
                          <p className='text-lg font-semibold text-gray-800'>{item.name || 'No name available'}</p>
                          <div className='flex items-center gap-4 mt-2 text-base text-gray-600'>
                            <p>Quantity: {item.quantity}</p>
                            <p>Size: {item.size || 'N/A'}</p>
                          </div>
                        </div>
                      </div>
                      {/* Fixed price display */}
                      <p className='text-lg font-semibold text-gray-800'>
                        {currency}{(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Order Footer - Order Placed Date and Total Amount */}
                <div className='mt-6 pt-4 border-t'>
                  <div className='flex justify-between items-center'>
                    <p className='text-sm text-gray-500'>
                      Order Placed: <span className='text-gray-700'>{new Date(order.date).toLocaleDateString()}</span>
                    </p>
                    {/* Fixed total display */}
                    <p className='text-xl font-bold text-gray-900'>
                      Total: {currency}{totalAmount.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className='text-center text-gray-600'>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;