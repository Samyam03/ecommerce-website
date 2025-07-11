import React, { useState, useContext, useEffect } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const PlaceOrder = () => {
  const [method, setMethod] = useState("COD");
  const { products, delivery_fee, cartItems, setCartItems, getCartAmount, navigate, backendUrl, token, userId, setUserId } = useContext(ShopContext);

  // Sync userId from local storage on component mount
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId); // Update userId in context
    }
  }, [setUserId]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    let value = event.target.value;
    
    // Remove non-numeric characters for phone and postal code
    if (name === 'phone' || name === 'postalCode') {
      value = value.replace(/[^0-9]/g, '');
    }
    // Remove non-letter characters for name fields, city, state, and country
    else if (['firstName', 'lastName', 'city', 'state', 'country'].includes(name)) {
      value = value.replace(/[^A-Za-z\s]/g, '');
    }
    
    setFormData({ ...formData, [name]: value });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      let orderItems = [];

      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            const itemInfo = products.find(product => product._id === itemId);
            if (itemInfo) {
              orderItems.push({
                ...itemInfo,
                size: size,
                quantity: cartItems[itemId][size],
              });
            }
          }
        }
      }

      let orderData = {
        userId: userId, // Use userId from context
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      };

      switch (method) {
        case 'COD':
          const response = await axios.post(
            `${backendUrl}/api/order/place`,
            orderData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.data.success) {
            setCartItems({});
            navigate('/orders', { state: { orderItems } });
          } else {
            console.error('Error processing order:', response.data.message);
            toast.error(response.data.message);
          }
          break;

        case 'stripe':
          const responseStripe = await axios.post(
            `${backendUrl}/api/order/stripe`,
            {
              ...orderData,
              origin: window.location.origin // Pass the origin for redirect URLs
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url); // Redirect to Stripe checkout
          } else {
            toast.error(responseStripe.data.message);
          }
          break;

        default:
          toast.error('Payment method not supported');
          break;
      }
    } catch (error) {
      console.error('Error processing order:', error);
      toast.error('Failed to process order');
    }
  };

  const validateForm = () => {
    // Name validations
    const nameRegex = /^[A-Za-z\s]{2,50}$/;
    if (!nameRegex.test(formData.firstName)) {
      toast.error('First name should only contain 2-50 letters and spaces');
      return false;
    }
    if (!nameRegex.test(formData.lastName)) {
      toast.error('Last name should only contain 2-50 letters and spaces');
      return false;
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }

    // Street validation
    if (formData.street.length < 5 || formData.street.length > 100) {
      toast.error('Street address should be between 5 and 100 characters');
      return false;
    }

    // City and State validation
    const cityStateRegex = /^[A-Za-z\s]{2,50}$/;
    if (!cityStateRegex.test(formData.city)) {
      toast.error('City should only contain 2-50 letters and spaces');
      return false;
    }
    if (!cityStateRegex.test(formData.state)) {
      toast.error('State should only contain 2-50 letters and spaces');
      return false;
    }

    // Postal code validation
    const postalCodeRegex = /^[0-9]{4,10}$/;
    if (!postalCodeRegex.test(formData.postalCode)) {
      toast.error('Postal code should be between 4 and 10 digits');
      return false;
    }

    // Country validation
    if (!cityStateRegex.test(formData.country)) {
      toast.error('Country should only contain 2-50 letters and spaces');
      return false;
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error('Phone number should be between 10 and 15 digits');
      return false;
    }

    return true;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault(); // Prevent form submission

    if (validateForm()) {
      onSubmitHandler(e); // Call onSubmitHandler to process the order
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Page Title */}
        <div className='text-center text-3xl font-bold pt-8 border-t border-gray-200/50 pb-8'>
          <Title text1="PLACE " text2="ORDER" />
        </div>

        {/* Header Info */}
        <div className="text-center mb-8">
          <p className="text-lg text-gray-600">
            Complete your order by providing delivery information and payment method
          </p>
        </div>

        <form onSubmit={onSubmitHandler} className='flex flex-col lg:flex-row gap-12'>
          
          {/* Left Side - Delivery Information */}
          <div className='flex-1 max-w-2xl'>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-8">
              
              {/* Section Title */}
              <div className="mb-8">
                <Title text1={'DELIVERY '} text2={'INFORMATION'} />
                <p className="text-gray-600 mt-2">Please provide your delivery details</p>
              </div>

              <div className='space-y-6'>
                {/* Name Fields */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">First Name</label>
                    <div className="relative">
                      <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <input 
                        required 
                        onChange={onChangeHandler} 
                        name='firstName' 
                        value={formData.firstName} 
                        className='w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white' 
                        type="text" 
                        placeholder='Enter first name'
                        pattern="[A-Za-z\s]+"
                        minLength="2"
                        maxLength="50"
                        title="First name should only contain letters and spaces"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Last Name</label>
                    <div className="relative">
                      <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <input 
                        required 
                        onChange={onChangeHandler} 
                        name='lastName' 
                        value={formData.lastName} 
                        className='w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white' 
                        type="text" 
                        placeholder='Enter last name'
                        pattern="[A-Za-z\s]+"
                        minLength="2"
                        maxLength="50"
                        title="Last name should only contain letters and spaces"
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Email Address</label>
                  <div className="relative">
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <input 
                      required 
                      onChange={onChangeHandler} 
                      name='email' 
                      value={formData.email} 
                      className='w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white' 
                      type="email" 
                      placeholder='Enter email address'
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      title="Please enter a valid email address"
                    />
                  </div>
                </div>

                {/* Street Address */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Street Address</label>
                  <div className="relative">
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <input 
                      required 
                      onChange={onChangeHandler} 
                      name='street' 
                      value={formData.street} 
                      className='w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white' 
                      type="text" 
                      placeholder='Enter street address'
                      minLength="5"
                      maxLength="100"
                      title="Street address should be between 5 and 100 characters"
                    />
                  </div>
                </div>

                {/* City and State */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">City</label>
                    <div className="relative">
                      <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h2M7 7h.01M7 10h.01M7 13h.01M17 7h.01M17 10h.01M17 13h.01" />
                      </svg>
                      <input 
                        required 
                        onChange={onChangeHandler} 
                        name='city' 
                        value={formData.city} 
                        className='w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white' 
                        type="text" 
                        placeholder='Enter city'
                        pattern="[A-Za-z\s]+"
                        minLength="2"
                        maxLength="50"
                        title="City should only contain letters and spaces"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">State</label>
                    <div className="relative">
                      <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      <input 
                        required 
                        onChange={onChangeHandler} 
                        name='state' 
                        value={formData.state} 
                        className='w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white' 
                        type="text" 
                        placeholder='Enter state'
                        pattern="[A-Za-z\s]+"
                        minLength="2"
                        maxLength="50"
                        title="State should only contain letters and spaces"
                      />
                    </div>
                  </div>
                </div>

                {/* Postal Code and Country */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Postal Code</label>
                    <div className="relative">
                      <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.99 1.99 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      <input 
                        required 
                        onChange={onChangeHandler} 
                        name='postalCode' 
                        value={formData.postalCode} 
                        className='w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white' 
                        type="text" 
                        placeholder='Enter postal code'
                        pattern="[0-9]{4,10}"
                        title="Postal code should be between 4 and 10 digits"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Country</label>
                    <div className="relative">
                      <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <input 
                        required 
                        onChange={onChangeHandler} 
                        name='country' 
                        value={formData.country} 
                        className='w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white' 
                        type="text" 
                        placeholder='Enter country'
                        pattern="[A-Za-z\s]+"
                        minLength="2"
                        maxLength="50"
                        title="Country should only contain letters and spaces"
                      />
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                  <div className="relative">
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <input 
                      required 
                      onChange={onChangeHandler} 
                      name='phone' 
                      value={formData.phone} 
                      className='w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white' 
                      type="tel" 
                      placeholder='Enter phone number'
                      pattern="[0-9]{10,15}"
                      title="Phone number should be between 10 and 15 digits"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

                     {/* Right Side - Payment and Order Summary */}
           <div className='w-full lg:w-96 space-y-8'>
             
             {/* Payment Method */}
             <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-10">
               <div className="mb-8">
                 <Title text1={'PAYMENT '} text2={'METHOD'} />
                 <p className="text-gray-600 mt-3">Choose your preferred payment method</p>
               </div>
               
               <div className='space-y-6'>
                 {/* Stripe Payment */}
                 <div 
                   onClick={() => setMethod('stripe')} 
                   className={`flex items-center gap-5 p-5 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:border-gray-400 ${method === 'stripe' ? 'border-gray-900 bg-gray-50' : 'border-gray-200'}`}
                 >
                   <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center transition-all duration-300 ${method === 'stripe' ? 'border-gray-900' : 'border-gray-300'}`}>
                     {method === 'stripe' && <div className="w-3 h-3 bg-gray-900 rounded-full"></div>}
                   </div>
                   <img className='h-6' src={assets.stripe_logo} alt="Stripe" />
                   <span className="text-sm text-gray-600">Pay securely with Stripe</span>
                 </div>

                 {/* Cash on Delivery */}
                 <div 
                   onClick={() => setMethod('COD')} 
                   className={`flex items-center gap-5 p-5 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:border-gray-400 ${method === 'COD' ? 'border-gray-900 bg-gray-50' : 'border-gray-200'}`}
                 >
                   <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center transition-all duration-300 ${method === 'COD' ? 'border-gray-900' : 'border-gray-300'}`}>
                     {method === 'COD' && <div className="w-3 h-3 bg-gray-900 rounded-full"></div>}
                   </div>
                   <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                   </svg>
                   <span className="font-medium text-gray-900">CASH ON DELIVERY</span>
                 </div>
               </div>
             </div>

             {/* Order Summary */}
             <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-10">
               <CartTotal />
               
               {/* Place Order Button */}
               <div className="mt-10">
                 <button 
                   type='submit' 
                   onClick={handlePlaceOrder} 
                   className='w-full bg-gray-900 text-white text-lg font-medium py-4 rounded-xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-[1.02] group'
                 >
                   <span className="flex items-center justify-center gap-2">
                     PLACE ORDER
                     <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                     </svg>
                   </span>
                 </button>
               </div>
             </div>
           </div>
        </form>
      </div>
    </div>
  );
};

export default PlaceOrder;