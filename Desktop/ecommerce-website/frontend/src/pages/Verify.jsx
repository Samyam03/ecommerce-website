import React, { useEffect } from 'react';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Verify = () => {
  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
  const [searchParams] = useSearchParams();

  const success = searchParams.get('success');
  const userId = searchParams.get('userId');
  const items = searchParams.get('items');
  const amount = searchParams.get('amount');
  const address = searchParams.get('address');

  const verifyPayment = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.post(
        `${backendUrl}/api/order/verifyStripe`,
        { success, userId, items, amount, address },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data.success) {
        setCartItems({});
        navigate('/orders');
      } else {
        navigate('/cart');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);

  return (
    <div>
      {/* You can add a loading spinner or message here */}
      <p>Verifying payment...</p>
    </div>
  );
};

export default Verify;