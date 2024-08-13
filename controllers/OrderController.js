const Order = require("../models/OrderModel");

exports.createOrder = async(req,res) => {
    const{cust_name, cust_address, cust_phone , order_date} = req.body;
    try{
    const order = new Order({
        cust_name, 
        cust_address, 
        cust_phone,
        order_date
    });

    await order.save();
    }catch(err){
        console.log(err);
    }
}