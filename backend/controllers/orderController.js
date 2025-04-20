import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"


//placing order from frontend
const placeOrder = async (req, res) => {
    try {
        //console.log("Received Order Data:", req.body);  // Log incoming data
        
        // Simulate a delay (check if it's causing timeout)
        // await new Promise(resolve => setTimeout(resolve, 5000));

        const newOrder = new orderModel(req.body);
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, {cartData: {}});
        
        res.status(200).json({ success: true, message: "Order placed successfully!" });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
}

//user order for frontend
const userOrder = async (req, res) => {
    try {
        const order = await orderModel.find({userId : req.body.userId});
        res.json({success: true, data: order});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error});
    }

}

//Listing orders for admin panel
const listOrders = async(req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success: true, data: orders});
    } catch (err) {
        console.log(err);
        res.json({success: false, message:"Error"});
    }
}


//api for updating status
const updateStatus = async(req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {status: req.body.status})
        res.json({success:true, message:"Status updated"});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}

export {placeOrder, userOrder, listOrders, updateStatus}