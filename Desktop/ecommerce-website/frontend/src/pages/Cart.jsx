import React, { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // Track if the user is editing
  const [editedItem, setEditedItem] = useState(null); // Track the item being edited

  useEffect(() => {
    const tempData = [];
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          tempData.push({
            id: itemId,
            size: size,
            quantity: cartItems[itemId][size],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  // Handle input change
  const handleQuantityChange = (item, value) => {
    setIsEditing(true); // User is editing
    setEditedItem({ ...item, quantity: value }); // Store the edited item
  };

  // Handle input blur (when the user leaves the input field)
  const handleBlur = () => {
    if (isEditing && editedItem) {
      // Update the quantity only when the user leaves the input field
      updateQuantity(editedItem.id, editedItem.size, Number(editedItem.quantity));
      setIsEditing(false); // Reset editing state
      setEditedItem(null); // Reset edited item
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Page Title */}
        <div className='text-center text-3xl font-bold pt-8 border-t border-gray-200/50 pb-8'>
          <Title text1="YOUR " text2="CART" />
        </div>

        {/* Header Info */}
        <div className="text-center mb-8">
          <p className="text-lg text-gray-600">
            Review your items and proceed to checkout when ready
          </p>
        </div>

        {/* Cart Items */}
        <div className="space-y-4 mb-12">
          {cartData.length > 0 ? (
            cartData.map((item, index) => {
              // Ensure the correct product is found by using _id for product identification
              const productData = products?.find((product) => product._id === item.id);

              // If no product data is found, render a not found card
              if (!productData) {
                return (
                  <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-6">
                    <div className="flex items-center gap-3 text-gray-500">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      <p>Product not found</p>
                    </div>
                  </div>
                );
              }

              return (
                <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-6 hover:shadow-md transition-all duration-300">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    
                    {/* Product Image & Info */}
                    <div className="flex items-start gap-6 flex-1">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
                        <img 
                          className="w-full h-full object-cover rounded-xl shadow-sm" 
                          src={productData?.image?.[0] || assets.placeholderImage} 
                          alt={productData?.name || 'Product'}
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                          {productData?.name || 'Unknown Product'}
                        </h3>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                            <span className="font-semibold text-gray-900">{currency}{productData?.price || 'N/A'}</span>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4a1 1 0 011-1h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V20a1 1 0 01-1 1H5a1 1 0 01-1-1v-4" />
                            </svg>
                            <span className="px-3 py-1 bg-gray-100 rounded-lg font-medium">{item.size}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quantity & Actions */}
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      
                      {/* Quantity Control */}
                      <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-gray-700">Qty:</label>
                        <div className="relative">
                          <input
                            onChange={(event) => handleQuantityChange(item, event.target.value)}
                            onBlur={handleBlur}
                            className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent text-center font-medium"
                            type="number"
                            min={1}
                            defaultValue={item.quantity}
                          />
                        </div>
                      </div>

                      {/* Subtotal */}
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          {currency}{((productData?.price || 0) * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">Subtotal</p>
                      </div>

                      {/* Remove Button */}
                      <button 
                        onClick={() => updateQuantity(item.id, item.size, 0)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 group"
                        title="Remove item"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-16">
              <div className="mb-6">
                <svg className="w-20 h-20 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Your cart is empty</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
              </p>
              <button 
                onClick={() => navigate('/collection')}
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
              >
                <span>Continue Shopping</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Cart Summary */}
        {cartData.length > 0 && (
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-8">
                <CartTotal />
                <div className="mt-8">
                  <button 
                    onClick={() => navigate('/place-order')} 
                    className="w-full bg-gray-900 text-white text-lg font-medium py-4 rounded-xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-[1.02] group"
                  >
                    <span className="flex items-center justify-center gap-2">
                      PROCEED TO CHECKOUT
                      <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;