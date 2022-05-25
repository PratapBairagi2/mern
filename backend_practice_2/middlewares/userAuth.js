const asyncCatchError = require("./asyncCatchError");
const JWT = require("jsonwebtoken");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");


const authorizationUser = asyncCatchError(async(req, res, next)=>{

    const {jwt} = req.cookies

    const {id} = JWT.verify(jwt, process.env.TOKEN_SECRET_KEY)

    const user = await User.findById(id)

    if(!user){
        return next(new ErrorHandler("User logged out due to expire token, login again !", 400))
    }

    req.user = user

    next()
})

module.exports = authorizationUser