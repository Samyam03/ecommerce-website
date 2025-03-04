import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

// Placing order using COD Method
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//global variables
const currency = "USD";
const delivery_fee = 10;


//gateway intialization
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
    try {
        const { userId, items, amount, address } = req.body;
        const { origin } = req.headers;

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }));

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: delivery_fee * 100
            },
            quantity: 1
        });

        // Create a Stripe session
        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&userId=${userId}&items=${JSON.stringify(items)}&amount=${amount}&address=${JSON.stringify(address)}`,
            cancel_url: `${origin}/verify?success=false`,
            line_items,
            mode: "payment"
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const verifyStripe = async (req, res) => {
    const { success, userId, items, amount, address } = req.body;

    try {
        if (success === "true") {
            // Create the order in the database
            const orderData = {
                userId,
                items: JSON.parse(items),
                amount,
                address: JSON.parse(address),
                status: "Order Placed",
                paymentMethod: "Stripe",
                payment: true,
                date: Date.now()
            };

            const newOrder = new orderModel(orderData);
            await newOrder.save();

            // Clear the user's cart
            await userModel.findByIdAndUpdate(userId, { cartData: {} });

            res.json({ success: true, message: "Payment Successful, Order Placed" });
        } else {
            res.json({ success: false, message: "Payment Failed" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

//Placing order using Razorpay Method
const placeOrderRazorpay = async (req, res) => {
    //Ignore this for now 
}

//All Orders for Adming Panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success:true, orders})
    } 
    catch (error) {
           console.log(error)
            res.json({success:false, message:error.message})  
    }
}

//User Orders for Frontend Panel
const userOrders = async (req, res) => {
    try{
        const{userId} = req.body;

        const orders = await orderModel.find({userId});
        res.json({success:true, orders})

    }
    catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//update order status
const updateOrderStatus = async (req, res) => {
      try{
            const{orderId, status} = req.body;
            await orderModel.findByIdAndUpdate(orderId,{status});
            res.json({success:true, message:"Order Status Updated Successfully"})
      }
      catch{
            console.log(error)
            res.json({success:false, message:error.message})
      }
    
}

export { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateOrderStatus ,verifyStripe}