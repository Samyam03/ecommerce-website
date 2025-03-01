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
      console.log('Token found:', token); // Debugging log
      const response = await axios.post(`${backendUrl}/api/order/userorders`, { userId: localStorage.getItem('userId') }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Order Data:', response.data.orders); // Debugging log
      const sortedOrders = response.data.orders.sort((a, b) => new Date(b.date) - new Date(a.date));
      setOrderData(sortedOrders);
    
    } 
    catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    console.log('Token in useEffect:', token); // Debugging log
    loadOrderData();
  }, [token]);

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={"MY "} text2={"ORDERS"} />
      </div>

      <div>
        {orderData.length > 0 ? (
          orderData.map((item, index) => (
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm'>
                {item.items[0] && item.items[0].image && item.items[0].image.length > 0 ? (
                  <img className='w-16 sm:w-20' src={item.items[0].image[0]} alt="" />
                ) : (
                  <img className='w-16 sm:w-20' src="placeholder-image-url" alt="No image available" />
                )}
                <div>
                  <p className='sm:text-base font-medium'>
                    {item.items[0] ? item.items[0].name : 'No name available'}
                  </p>
                  <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                    <p className='text-lg'>{currency}{item.amount}</p>
                    <p>Quantity: {item.items[0] ? item.items[0].quantity : 'N/A'}</p>
                    <p>Size: {item.items[0] ? item.items[0].size : 'N/A'}</p>
                  </div>
                  <p>Date <span className='text gray-400'>
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                  </p>
                </div>
              </div>
              <div className='md:w-1/2 flex justify-between'>
                <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 rounded-full'>{item.status}</p>
                </div>
                <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm cursor-pointer'>Track Order</button>
              </div>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
