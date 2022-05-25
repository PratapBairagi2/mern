const express = require("express")
const { createOrder, updateOrderStatus, getSingleOrderByUser, getAllOrdersByUser, getAllOrdersByAdmin, getSingleOrderByAdmin, deleteOrderByAdmin } = require("../controllers/orderController")
const authorizationUser = require("../middlewares/userAuth")
const userRole = require("../backend_practice_2/middlewares/userRole")

const orderRoute = express.Router()

// user
orderRoute.route("/order/new").post(authorizationUser, createOrder)
orderRoute.route("/me/order/:id").get(authorizationUser,getSingleOrderByUser)
orderRoute.route("/me/orders").get(authorizationUser, getAllOrdersByUser)

// admin
// orderRoute.route("/admin/order").get(authorizationUser, userRole("admin"), getSingleOrderByAdmin)
orderRoute.route("/admin/order/:id").get(authorizationUser, userRole("admin"), getSingleOrderByAdmin)

orderRoute.route("/admin/order/:id").put(authorizationUser,userRole("admin"),updateOrderStatus).delete(authorizationUser, userRole("admin"), deleteOrderByAdmin)
orderRoute.route("/admin/orders").get(authorizationUser, userRole("admin"), getAllOrdersByAdmin)

module.exports = orderRoute