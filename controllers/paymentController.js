
const asyncCatchError = require("../middlewares/asyncCatchError");
const ErrorHandler = require("../utils/errorHandler");
const stripe = require("stripe")("sk_test_51Kyc5BSAAbMphS3M86BxISfS7nwkkVrFE9DaQ9o6THJwqVMrILCr77aTBiVengwb29mhZCtUgsmC0CR3s8tcxTEX00TQKeuRwr")


exports.getPublishApiKey = asyncCatchError(async(req, res, next)=>{
    res.status(200).json({
        success: true,
        publishApiKey : process.env.STRIPE_PUBLISH_API_KEY
    })
})

exports.orderPayment = asyncCatchError(async(req, res, next)=>{
    try {
        const myPayment = await stripe.paymentIntents.create({
            amount : req.body.amount,
            currency : "inr",
            metadata :{
                company:"Ecommorce"
            }
        })

        if(!myPayment.client_secret){
            return next(new ErrorHandler("unable to made payment due to missing Api key !", 404))
        }

        res.status(201).json({
            success : true,
            client_secret : myPayment.client_secret
        })


    } catch (error) {
        res.status(400).json({
            success : true,
            error : error
        })
    }
})