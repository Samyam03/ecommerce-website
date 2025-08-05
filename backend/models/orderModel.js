import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        unique: true, // Ensure orderId is unique
        required: true, // Ensure orderId is always provided
    },
    userId: {
        type: String,
        required: true,
    },
    items: {
        type: Array,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    address: {
        type: Object,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'Order Placed', // Corrected typo: "Ordered Placed" -> "Order Placed"
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    payment: {
        type: Boolean,
        required: true,
        default: false,
    },
    date: {
        type: Date, // Changed from Number to Date for better handling
        required: true,
        default: Date.now, // Automatically set to the current date/time
    },
});

const orderModel = mongoose.models.order || mongoose.model('Order', orderSchema);

export default orderModel;