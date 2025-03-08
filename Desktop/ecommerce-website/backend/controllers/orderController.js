import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import mongoose from "mongoose";
import Stripe from "stripe";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Global variables
const currency = "USD";
const delivery_fee = 10;

// Place order using COD (Cash on Delivery) method
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        // Create order data with a unique orderId
        const orderData = {
            orderId: new mongoose.Types.ObjectId().toString(), // Generate a unique orderId
            userId,
            items,
            amount,
            address,
            status: "Order Placed", // Corrected typo: "Ordered Placed" -> "Order Placed"
            paymentMethod: "COD",
            payment: false,
            date: new Date(),
        };

        // Save the order to the database
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        // Clear the user's cart
        await userModel.findByIdAndUpdate(userId, { $set: { cartData: {} } });

        res.json({ success: true, message: "Order Placed Successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Place order using Stripe payment method
const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, address } = req.body;
        const { origin } = req.headers;

        // Validate input
        if (!userId || !items || !address) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Calculate total amount manually to avoid frontend manipulation
        const itemsTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const totalAmount = itemsTotal + delivery_fee;

        // Prepare line items for Stripe checkout
        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name,
                    metadata: {
                        size: item.size,
                        productId: item._id.toString(),
                        price: item.price.toString(), // Store price as string in metadata
                    },
                },
                unit_amount: Math.round(item.price * 100), // Convert to cents
            },
            quantity: item.quantity,
        }));

        // Add delivery fee as a line item
        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: delivery_fee * 100, // Convert to cents
            },
            quantity: 1,
        });

        // Create a Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/verify?canceled=true`,
            line_items,
            mode: "payment",
            metadata: {
                userId: userId,
                address: JSON.stringify(address),
                itemCount: items.length.toString(), // Helps validate reconstructed items
            },
        });

        // Return the Stripe session URL to the frontend
        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.error("Stripe Session Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Verify Stripe payment and create an order
const verifyStripe = async (req, res) => {
    try {
        const { session_id } = req.body;

        // Validate session_id
        if (!session_id || !session_id.startsWith('cs_')) {
            console.error('Invalid or missing session ID:', session_id);
            return res.status(400).json({
                success: false,
                message: "Invalid or missing session ID",
            });
        }

        // Retrieve the Stripe session
        const session = await stripe.checkout.sessions.retrieve(session_id, {
            expand: ['line_items.data.price.product'],
        });

        // Check payment status
        if (session.payment_status !== 'paid') {
            console.error('Payment not completed for session:', session_id);
            return res.json({ success: false, message: "Payment Not Completed" });
        }

        // Extract metadata from the Stripe session
        const { userId, address, itemCount } = session.metadata;

        // Reconstruct items from the Stripe session
        const items = [];
        let totalAmount = 0;

        for (const item of session.line_items.data) {
            if (item.price.product.name === "Delivery Charges") {
                totalAmount += item.amount_total / 100; // Add delivery fee to total amount
                continue;
            }

            // Extract item details from product metadata
            const { productId, size, price } = item.price.product.metadata;
            items.push({
                _id: productId,
                name: item.price.product.name,
                price: parseFloat(price),
                size: size,
                quantity: item.quantity,
            });
            totalAmount += item.amount_total / 100; // Add item price to total amount
        }

        // Validate item count matches metadata
        if (items.length !== parseInt(itemCount)) {
            console.error('Item count mismatch:', items.length, itemCount);
            return res.status(400).json({
                success: false,
                message: "Item count mismatch in Stripe session",
            });
        }

        // Create the order in the database
        const orderData = {
            orderId: new mongoose.Types.ObjectId().toString(), // Generate a unique orderId
            userId,
            items,
            amount: totalAmount,
            address: JSON.parse(address),
            status: "Order Placed",
            paymentMethod: "Stripe",
            payment: true,
            date: new Date(),
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        // Clear the user's cart
        await userModel.findByIdAndUpdate(userId, { $set: { cartData: {} } });

        res.json({ success: true, message: "Payment Successful, Order Placed" });
    } catch (error) {
        console.error("Stripe Verification Error:", error);
        res.status(500).json({
            success: false,
            message: error.message,
            errorCode: error.code || 'NO_ERROR_CODE',
        });
    }
};

// Get all orders (for admin panel)
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Get orders for a specific user (for frontend panel)
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;

        const orders = await orderModel.find({ userId });
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Update order status
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status });
        res.json({ success: true, message: "Order Status Updated Successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export {
    placeOrder,
    placeOrderStripe,
    verifyStripe,
    allOrders,
    userOrders,
    updateOrderStatus,
};