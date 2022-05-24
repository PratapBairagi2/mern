const asyncCatchError = require("../middlewares/asyncCatchError");
const Order = require("../models/orderModel");
const ErrorHandler = require("../utils/errorHandler");
const Product = require("../models/productModel")

exports.createOrder = asyncCatchError(async (req, res, next) => {
    const user = req.user._id

    console.log("order content", req.body)
    const {
        shippingAddress,
        paymentInfo,
        orderItems,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body

    const newOrder = await Order.create({
        shippingAddress,
        paymentInfo,
        orderItems,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,

        user: user,
        paidAt: Date.now()
    })

    res.status(201).json({
        success: true,
        order: newOrder
    })
})

// get single order
exports.getSingleOrderByUser = asyncCatchError(async (req, res, next) => {
    const userId = req.params.id

    const order = await Order.findById(userId)

    if (!order) {
        return next(new ErrorHandler("Order not found !", 404))
    }

    res.status(200).json({
        success: true,
        order
    })
})

// get all orders by user
exports.getAllOrdersByUser = asyncCatchError(async (req, res, next) => {
    const userId = req.user._id

    const orders = await Order.find({ user: userId })

    if (!orders) {
        return next(new ErrorHandler("Order not found !", 404))
    }

    res.status(200).json({
        success: true,
        orders
    })
})


// update order/order status -- admin
exports.updateOrderStatus = asyncCatchError(async (req, res, next) => {
    const orderId = req.params.id

    console.log("order id", orderId)
    console.log("order status", req.body.orderStatus)



    const orderStatus = req.body.orderStatus

    const order = await Order.findById(orderId)

    if (!order) {
        return next(new ErrorHandler("Product does not exist or removed !", 404))
    }

    if (order.orderStatus === "delivered") {
        return next(new ErrorHandler("You have already delivered this product !", 400))
    }

    if (order.orderStatus === "shipped"){
        order.orderItems.forEach(async (o) => {
            await orderStatusFunction(o.product, o.quantity, order.orderStatus)
        })
    }

    order.orderStatus = orderStatus

    if (order.orderStatus === "delivered") {
        order.deliveredAt = Date.now()
    }

    await order.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true,
        order
    })
})


async function orderStatusFunction(productId, quantity, orderStatus) {

    const product = await Product.findById(productId)

    product.stock -= quantity

    await product.save({ validateBeforeSave: false })

}


// get all orders by admin
exports.getAllOrdersByAdmin = asyncCatchError(async (req, res, next) => {
    const orders = await Order.find()

    res.status(200).json({
        success: true,
        orders
    })
})

exports.getSingleOrderByAdmin = asyncCatchError(async (req, res, next) => {

    // const orderId = req.query.orderId

    const orderId = req.params.id

    const order = await Order.findById(orderId)

    if (!order) {
        return next(new ErrorHandler("Order not found !", 404))
    }

    res.status(200).json({
        success: true,
        order
    })
})

// delete order -- admin

exports.deleteOrderByAdmin = asyncCatchError(async (req, res, next) => {
    const id = req.params.id
    const order = await Order.findById(id)

    if (!order) {
        return next(new ErrorHandler("Order does not exist !", 404))
    }
    await order.remove()

    res.status(200).json({
        success: true,
        message: " Order deleted successfulky !"
    })
})