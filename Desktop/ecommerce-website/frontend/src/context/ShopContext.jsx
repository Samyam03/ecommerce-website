import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Create the ShopContext
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    // State variables
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : {};
    });
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [userId, setUserId] = useState(localStorage.getItem('userId') || '');
    const navigate = useNavigate();

    // Save cartItems to localStorage on change
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    // Fetch products from the backend
    const getProductsData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`);
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            toast.error(error.message);
        }
    };

    // Fetch products on component mount
    useEffect(() => {
        getProductsData();
    }, []);

    // Set the token from localStorage on component mount
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUserId = localStorage.getItem('userId');
        if (storedToken) setToken(storedToken);
        if (storedUserId) setUserId(storedUserId);
    }, []);

    // Add item to cart
    const addToCart = async (itemId, size) => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (!token || !userId) {
            toast.error('Please log in to add items to your cart');
            return;
        }

        try {
            await axios.post(
                `${backendUrl}/api/cart/add`,
                { userId, itemId, size },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setCartItems((prevCartItems) => {
                const newCartItems = { ...prevCartItems };
                if (!newCartItems[itemId]) {
                    newCartItems[itemId] = {};
                }
                if (!newCartItems[itemId][size]) {
                    newCartItems[itemId][size] = 0;
                }
                newCartItems[itemId][size] += 1;
                return newCartItems;
            });

            toast.success('Item added to cart');
        } catch (error) {
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                setToken('');
                setUserId('');
                setCartItems({});
                toast.error('Session ended, please login again');
                navigate('/login');
            }
             else {
                toast.error(error.response?.data?.message || 'Failed to add item to cart');
            }
        }
    };

    // Get the total number of items in the cart
    const getCartCount = () => {
        let totalCount = 0;
        for (const itemId in cartItems) {
            for (const size in cartItems[itemId]) {
                totalCount += cartItems[itemId][size];
            }
        }
        return totalCount;
    };

    // Get the total amount of the cart
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            const product = products.find((p) => p._id === itemId);
            if (product) {
                for (const size in cartItems[itemId]) {
                    totalAmount += product.price * cartItems[itemId][size];
                }
            }
        }
        return totalAmount;
    };

    // Update the quantity of an item in the cart
    const updateQuantity = async (itemId, size, quantity) => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
    
        if (!token || !userId) {
            toast.error('Please log in to update your cart');
            return;
        }
    
        setCartItems((prevCartItems) => {
            const newCartItems = { ...prevCartItems };
            if (!newCartItems[itemId]) {
                newCartItems[itemId] = {};
            }
            newCartItems[itemId][size] = quantity > 0 ? quantity : 0;
            return newCartItems;
        });
    
        try {
            const response = await axios.post(
                `${backendUrl}/api/cart/update`,
                { userId, itemId, size, quantity },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            if (response.data.success) {
                toast.success('Cart updated successfully');
            } else {
                toast.error(response.data.message || 'Failed to update cart');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update cart');
        }
    };

    // Provide the context value to children
    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        setCartItems,
        getCartAmount,
        navigate,
        backendUrl,
        token,
        setToken,
        userId,
        setUserId
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;