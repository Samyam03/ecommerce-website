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
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-8 pt-8 sm:pt-14 min-h-[80vh] border-t px-4 sm:px-8'>
      {/* Left Side */}
      <div className='flex flex-col gap-6 w-full sm:max-w-[480px]'>
        <div className='text-2xl my-4'>
          <Title text1={'DELIVERY '} text2={'INFORMATION'} />
        </div>

        <div className='flex gap-4'>
          <input 
            required 
            onChange={onChangeHandler} 
            name='firstName' 
            value={formData.firstName} 
            className='border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:border-black' 
            type="text" 
            placeholder='First Name'
            pattern="[A-Za-z\s]+"
            minLength="2"
            maxLength="50"
            title="First name should only contain letters and spaces"
          />
          <input 
            required 
            onChange={onChangeHandler} 
            name='lastName' 
            value={formData.lastName} 
            className='border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:border-black' 
            type="text" 
            placeholder='Last Name'
            pattern="[A-Za-z\s]+"
            minLength="2"
            maxLength="50"
            title="Last name should only contain letters and spaces"
          />
        </div>
        <input 
          required 
          onChange={onChangeHandler} 
          name='email' 
          value={formData.email} 
          className='border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:border-black' 
          type="email" 
          placeholder='Email Address'
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          title="Please enter a valid email address"
        />
        <input 
          required 
          onChange={onChangeHandler} 
          name='street' 
          value={formData.street} 
          className='border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:border-black' 
          type="text" 
          placeholder='Street'
          minLength="5"
          maxLength="100"
          title="Street address should be between 5 and 100 characters"
        />
        <div className='flex gap-4'>
          <input 
            required 
            onChange={onChangeHandler} 
            name='city' 
            value={formData.city} 
            className='border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:border-black' 
            type="text" 
            placeholder='City'
            pattern="[A-Za-z\s]+"
            minLength="2"
            maxLength="50"
            title="City should only contain letters and spaces"
          />
          <input 
            required 
            onChange={onChangeHandler} 
            name='state' 
            value={formData.state} 
            className='border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:border-black' 
            type="text" 
            placeholder='State'
            pattern="[A-Za-z\s]+"
            minLength="2"
            maxLength="50"
            title="State should only contain letters and spaces"
          />
        </div>
        <div className='flex gap-4'>
          <input 
            required 
            onChange={onChangeHandler} 
            name='postalCode' 
            value={formData.postalCode} 
            className='border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:border-black' 
            type="text" 
            placeholder='Postal Code'
            pattern="[0-9]{4,10}"
            title="Postal code should be between 4 and 10 digits"
          />
          <input 
            required 
            onChange={onChangeHandler} 
            name='country' 
            value={formData.country} 
            className='border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:border-black' 
            type="text" 
            placeholder='Country'
            pattern="[A-Za-z\s]+"
            minLength="2"
            maxLength="50"
            title="Country should only contain letters and spaces"
          />
        </div>
        <input 
          required 
          onChange={onChangeHandler} 
          name='phone' 
          value={formData.phone} 
          className='border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:border-black' 
          type="tel" 
          placeholder='Phone'
          pattern="[0-9]{10,15}"
          title="Phone number should be between 10 and 15 digits"
        />
      </div>

      {/* Right Side */}
      <div className='mt-8 w-full sm:w-auto'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={'PAYMENT '} text2={'METHOD'} />
          {/* Payment Methods */}
          <div className='flex gap-4 flex-col lg:flex-row'>
            <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-3 rounded-lg cursor-pointer hover:border-black'>
              <p className={`min-w-4 h-4 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-1' src={assets.stripe_logo} alt="" />
            </div>

            <div onClick={() => setMethod('COD')} className='flex items-center gap-3 border p-3 rounded-lg cursor-pointer hover:border-black'>
              <p className={`min-w-4 h-4 border rounded-full ${method === 'COD' ? 'bg-green-400' : ''}`}></p>
              <p>CASH ON DELIVERY</p>
            </div>
          </div>

          <div className='w-full text-end mt-8'>
            <button type='submit' onClick={handlePlaceOrder} className='bg-black text-white px-16 py-3 text-sm rounded-lg cursor-pointer hover:bg-gray-800'>Place Order</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;