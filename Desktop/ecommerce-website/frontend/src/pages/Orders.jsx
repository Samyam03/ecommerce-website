import React from 'react';
import { ShopContext } from '../context/ShopContext';
import { useContext } from 'react';
import Title from '../components/Title';
import { useLocation } from 'react-router-dom';

const Orders = () => {
  const { currency } = useContext(ShopContext);
  const location = useLocation();
  const orderItems = location.state?.orderItems || [];

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={"MY "} text2={"ORDERS"} />
      </div>

      <div>
        {orderItems.length > 0 ? (
          orderItems.map((item, index) => (
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm'>
                <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
                <div>
                  <p className='sm:text-base font-medium'>
                    {item.name}
                  </p>

                  <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                    <p className='text-lg'>{currency}{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p>Date <span className='text gray-400'>
                    February 1, 2025
                  </span>
                  </p>
                </div>
              </div>
              <div className='md:w-1/2 flex justify-between'>
                <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 rounded full'>Ready to ship</p>
                </div>
                <button className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
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