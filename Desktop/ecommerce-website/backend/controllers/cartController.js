
// Add product to user cart
import userModel from "../models/userModel.js";
import { isValidObjectId } from 'mongoose';

const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body;

        // Validate inputs
        if (!userId || !itemId || !size) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        // Validate userId
        if (!isValidObjectId(userId)) {
            return res.status(400).json({ success: false, message: 'Invalid user ID' });
        }

        // Validate itemId and size
        if (typeof itemId !== 'string' || typeof size !== 'string') {
            return res.status(400).json({ success: false, message: 'Invalid item ID or size' });
        }

        // Find the user
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Initialize cartData if it doesn't exist
        let cartData = userData.cartData || {};

        // Update cartData
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        // Save the updated cartData
        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: 'Item added to cart' });
    } catch (error) {
        console.error('Error in addToCart:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};




// Update user cart
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;

        // Validate inputs
        if (!userId || !itemId || !size || quantity === undefined) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Validate userId
        if (!isValidObjectId(userId)) {
            return res.status(400).json({ success: false, message: "Invalid user ID" });
        }

        // Find the user
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Initialize cartData if it doesn't exist
        let cartData = userData.cartData || {};

        // Check if the item exists in the cart
        if (!cartData[itemId] || !cartData[itemId][size]) {
            return res.status(400).json({ success: false, message: "Item not found in cart" });
        }

        // Update the quantity
        if (quantity === 0) {
            delete cartData[itemId][size];
            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId];
            }
        } else {
            cartData[itemId][size] = quantity;
        }

        // Save the updated cartData
        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: "Cart updated" });
    } catch (error) {
        console.error("Error in updateCart:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Get user cart
const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body;

        // Validate inputs
        if (!userId) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Validate userId
        if (!isValidObjectId(userId)) {
            return res.status(400).json({ success: false, message: "Invalid user ID" });
        }

        // Find the user
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Return the cart data
        const cartData = userData.cartData || {};
        res.json({ success: true, cartData });
    } catch (error) {
        console.error("Error in getUserCart:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export { addToCart, updateCart, getUserCart };