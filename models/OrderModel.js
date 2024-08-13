const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    cust_name: {
        type: String,
        required: [true, "Customer name is required"]
    },
    cust_address: {
        type: String,
        required: [true, "Customer address is required"]
    },
    cust_phone: {
        type: Number,
        required: [true, "Customer phone is required"]
    },
    products: [
        {
            product_id: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    order_date: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
