import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";
import mongoose from "mongoose";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const currency = "USD";
const delivery_fee = 10;

// COD Order Placement
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const orderData = {
            orderId: new mongoose.Types.ObjectId().toString(),
            userId,
            items: items.map(item => ({
                ...item,
                image: item.image || []
            })),
            amount,
            address,
            status: "Order Placed",
            paymentMethod: "COD",
            payment: false,
            date: new Date(),
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, { $set: { cartData: {} } });

        res.json({ success: true, message: "Order Placed Successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Stripe Order Initialization
const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, address } = req.body;
        const { origin } = req.headers;

        if (!userId || !items || !address) {
            return res.status(400).json({ 
                success: false, 
                message: "Missing required fields" 
            });
        }

        const line_items = items.map((item) => ({
            price_data: {
                currency,
                product_data: {
                    name: item.name,
                    metadata: {
                        productId: item.productId, // Ensure correct product ID
                        size: item.size,
                        price: item.price.toString(),
                        image: item.image?.[0] || 'no-image'
                    },
                },
                unit_amount: Math.round(item.price * 100),
            },
            quantity: item.quantity,
        }));

        // Add delivery fee
        line_items.push({
            price_data: {
                currency,
                product_data: { name: "Delivery Charges" },
                unit_amount: delivery_fee * 100,
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/verify?canceled=true`,
            line_items,
            mode: "payment",
            metadata: {
                userId,
                address: JSON.stringify(address),
                itemCount: items.length.toString(),
            },
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.error("Stripe Session Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Stripe Verification with Image Handling
const verifyStripe = async (req, res) => {
    try {
        const { session_id } = req.body;

        if (!session_id?.startsWith('cs_')) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid session ID" 
            });
        }

        const session = await stripe.checkout.sessions.retrieve(session_id, {
            expand: ['line_items.data.price.product'],
        });

        if (session.payment_status !== 'paid') {
            return res.json({ 
                success: false, 
                message: "Payment Not Completed" 
            });
        }

        const { userId, address, itemCount } = session.metadata;
        const items = [];
        let totalAmount = 0;

        for (const item of session.line_items.data) {
            if (item.price.product.name === "Delivery Charges") {
                totalAmount += item.amount_total / 100;
                continue;
            }

            const { productId, size, price, image } = item.price.product.metadata;
            const product = await productModel.findById(productId).select('images name');
            
            // Image handling with multiple fallbacks
            const images = product?.images?.length > 0 
                ? product.images 
                : image !== 'no-image' 
                    ? [image] 
                    : ['/default-image.jpg'];

            items.push({
                productId, // Store actual product ID
                name: product?.name || item.price.product.name,
                price: parseFloat(price),
                size,
                quantity: item.quantity,
                image: images
            });

            totalAmount += item.amount_total / 100;
        }

        if (items.length !== parseInt(itemCount)) {
            return res.status(400).json({
                success: false,
                message: "Item count mismatch"
            });
        }

        const orderData = {
            orderId: new mongoose.Types.ObjectId().toString(),
            userId,
            items,
            amount: totalAmount,
            address: JSON.parse(address),
            status: "Order Placed",
            paymentMethod: "Stripe",
            payment: true,
            date: new Date(),
        };

        await new orderModel(orderData).save();
        await userModel.findByIdAndUpdate(userId, { $set: { cartData: {} } });

        res.json({ 
            success: true, 
            message: "Payment Successful, Order Placed" 
        });
    } catch (error) {
        console.error("Verification Error:", error);
        res.status(500).json({
            success: false,
            message: error.message,
            errorCode: error.code || 'NO_ERROR_CODE'
        });
    }
};

// Get all orders (for admin panel)
const allOrders = async (req, res) => {
    try {
        // Use lean() for better performance and add sort for consistency
        const orders = await orderModel.find({})
            .sort({ date: -1 }) // Sort by date descending (newest first)
            .lean();
            
        res.json({ 
            success: true, 
            orders,
            timestamp: new Date().toISOString() // Adding timestamp for tracking
        });
    } catch (error) {
        console.error("Error fetching all orders:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get orders for a specific user (for frontend panel)
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        
        if (!userId) {
            return res.status(400).json({ 
                success: false, 
                message: "User ID is required" 
            });
        }

        // Use lean() for better performance and add sort for consistency
        const orders = await orderModel.find({ userId })
            .sort({ date: -1 }) // Sort by date descending (newest first)
            .lean();
            
        res.json({ 
            success: true, 
            orders,
            timestamp: new Date().toISOString() // Adding timestamp for tracking
        });
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update order status
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        
        if (!orderId || !status) {
            return res.status(400).json({ 
                success: false, 
                message: "Order ID and status are required" 
            });
        }
        
        const updatedOrder = await orderModel.findByIdAndUpdate(
            orderId, 
            { status }, 
            { new: true, runValidators: true }
        );
        
        if (!updatedOrder) {
            return res.status(404).json({ 
                success: false, 
                message: "Order not found" 
            });
        }
        
        res.json({ 
            success: true, 
            message: "Order Status Updated Successfully",
            order: updatedOrder
        });
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ success: false, message: error.message });
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