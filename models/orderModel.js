const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({
    shippingAddress: {
        name :{
            type : String,
        },
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        pinCode: {
            type: Number,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    },
    orderStatus: {
        type: String,
        default: "processing",
        required: true
    },
    orderItems: [
        {
            name: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            product: {
                type: mongoose.Schema.ObjectId,
                ref: "product",
                required: true
            },
            image: {
                type: String,
                required: true
            }
        }
    ],
    paymentInfo: {
        id: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    },
    paidAt: {
        type: Date,
        required: true
    },
    itemPrice: {
        type: Number,
        required: true
    },
    shippingPrice: {
        type: Number,
        required: true
    },
    taxPrice: {
        type: Number,
        required: true
    },
    totalPrice:{
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true
    },
    createdAt:{ 
        type:Date,
        required:true,
        default:Date.now()
    },
    deliveredAt:Date

})

const Order = new mongoose.model("order", orderSchema)

module.exports = Order