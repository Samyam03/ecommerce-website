import orderModel from "../models/orderModel.js";
// Placing order using COD Method

const placeOrder = async (req, res) => {
     try{
        const{userId, items, amount, address} = req.body;

        const orderData={
            userId,
            items,
            amount,
            address,
            status:"Ordered Placed",
            paymentMethod:"COD",
            payment:false,
            date:Date.now()
        }
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId,{cartData:{}})

        res.json({success:true, message:"Order Placed Successfully"})
     }
     catch(error){
         console.log(error)
         res.json({success:false, message:error.message})
     }
}

//Placing order using Stripe Method
const placeOrderStripe = async (req, res) => {
    
}

//Placing order using Razorpay Method
const placeOrderRazorpay = async (req, res) => {
    
}

//All Orders for Adming Panel
const allOrders = async (req, res) => {
    
}

//User Orders for Frontend Panel
const userOrders = async (req, res) => {
    
}

//update order status
const updateOrderStatus = async (req, res) => {
    
}

export { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateOrderStatus }