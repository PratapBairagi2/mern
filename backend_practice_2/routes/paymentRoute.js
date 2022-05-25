
const dotenv = require("dotenv")
const express = require("express")
const { getPublishApiKey, orderPayment } = require("../backend_practice_2/controllers/paymentController")
const authorizationUser = require("../middlewares/userAuth")

dotenv.config({path:"../config/.env"})

const paymentRoute = express.Router()

paymentRoute.route("/getPublishApiKey").get(authorizationUser,getPublishApiKey)

paymentRoute.route("/payment/process").post(authorizationUser, orderPayment)


module.exports = paymentRoute