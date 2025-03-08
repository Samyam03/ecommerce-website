import React, { useEffect, useState, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';

const Verify = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const session_id = searchParams.get('session_id');
    const canceled = searchParams.get('canceled');

    // Use ShopContext to access backendUrl, token, and setCartItems
    const { backendUrl, token, setCartItems } = useContext(ShopContext);

    const verifyPayment = async () => {
        setLoading(true);
        try {
            // Validate session_id
            if (!session_id || !session_id.startsWith('cs_')) {
                toast.error('Invalid session ID. Please try again.');
                navigate('/cart');
                return;
            }

            // Verify payment with backend
            const response = await axios.post(
                `${backendUrl}/api/order/verifyStripe`,
                { session_id },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.data.success) {
                toast.success('Payment successful! Your order has been placed.');
                setCartItems({}); // Clear the cart
                navigate('/orders'); // Redirect to orders page
            } else {
                toast.error('Payment verification failed. Please contact support.');
                navigate('/cart');
            }
        } catch (error) {
            console.error('Verification Error:', error);
            toast.error(
                error.response?.data?.message ||
                error.message ||
                'An error occurred during verification.'
            );
            navigate('/cart');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (canceled === 'true') {
            toast.error('Payment was canceled. Please try again.');
            navigate('/cart');
            return;
        }
        if (session_id) {
            verifyPayment();
        }
    }, [session_id, canceled]);

    return (
        <div>
            {loading ? (
                <p>Verifying payment...</p>
            ) : (
                <p>Verification complete.</p>
            )}
        </div>
    );
};

export default Verify;