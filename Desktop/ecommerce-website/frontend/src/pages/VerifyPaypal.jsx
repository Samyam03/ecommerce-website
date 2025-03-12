import React, { useEffect, useState, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';

const VerifyPaypal = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const token = searchParams.get('token');
    const PayerID = searchParams.get('PayerID');
    const canceled = searchParams.get('canceled');

    // Use ShopContext to access backendUrl, token, and setCartItems
    const { backendUrl, token: authToken, setCartItems } = useContext(ShopContext);

    useEffect(() => {
        if (canceled) {
            toast.error('Payment was canceled. Please try again.');
            navigate('/cart');
            return;
        }

        if (!token || !PayerID) {
            toast.error('Invalid payment information. Please try again.');
            navigate('/cart');
            return;
        }

        verifyPayment();
    }, [token, PayerID, canceled]);

    const verifyPayment = async () => {
        setLoading(true);
        try {
            // Verify payment with backend
            const response = await axios.post(
                `${backendUrl}/api/order/verifyPaypal`,
                { token, PayerID },
                {
                    headers: { Authorization: `Bearer ${authToken}` },
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

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
                <h2 className="text-2xl font-bold mb-4">Verifying Payment</h2>
                {loading ? (
                    <div>
                        <p className="mb-4">Please wait while we verify your payment...</p>
                        <div className="loader mx-auto"></div>
                    </div>
                ) : (
                    <p>Redirecting you to your orders...</p>
                )}
            </div>
        </div>
    );
};

export default VerifyPaypal; 