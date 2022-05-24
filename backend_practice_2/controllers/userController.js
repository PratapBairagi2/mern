const asyncCatchError = require("../middlewares/asyncCatchError.js");
const User = require("../models/userModel.js");
const ErrorHandler = require("../utils/errorHandler.js");
const sendMail = require("../utils/forgotPasswordMail.js");
const crypto = require("crypto")

// const cloudinary = require("cloudinary")
const cloudinary = require("../utils/cloudinaryConfig.js")

// register user
exports.userRegister = asyncCatchError(async (req, res, next) => {
    const { name, email, password, avatar } = req.body

    const isEmailExit = await User.findOne({ email: email })

    if (isEmailExit) {
        return next(new ErrorHandler("user already exist with this email !", 400))
    }

    // const myImageCloud = await cloudinary.v2.uploader.upload(avatar, {
    //     folder : "avatars", // isi naam se image cloudinary pr folder hona chahie
    //     width: 150,
    //     crop: "scale"
    // })

    const myImageCloud = await cloudinary.uploader.upload(avatar, {
        // upload_preset:"avtaras_setup",
        folder: "avatars",
        width: 150,
        crop: "scale"
    })

    const user = await User.create({
        name,
        email,
        password,
        createAt: Date(Date.now()),
        // avatar: {
        //     public_id:"image id",
        //     url:"rul"
        // }
        avatar: {
            public_id: myImageCloud.public_id,
            url: myImageCloud.secure_url
        }
    })

    const token = await user.generateToken()

    const cookieOption = {
        httpOnly: true,
        expire: new Date(Date.now() + 24 * 60 * 60 * 1000)
    }

    res.status(201).cookie("jwt", token, cookieOption).json({
        success: true,
        user
    })
})

// login user - user
exports.loginUser = asyncCatchError(async (req, res, next) => {
    const { email, password } = req.body

    const user = await User.findOne({ email: email })

    if (!user) {
        return next(new ErrorHandler("Invalid email or password !", 400))
    }

    const isPasswordMatch = await user.comparePassword(password)

    if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid email or password !", 400))
    }

    const token = await user.generateToken()

    const cookieOption = {
        httpOnly: true,
        expire: new Date(Date.now() + 24 * 60 * 60 * 1000)
    }

    res.status(200).cookie("jwt", token, cookieOption).json({
        success: true,
        user
    })
})

// logout user
exports.logoutUser = asyncCatchError(async (req, res, next) => {
    const cookieOption = {
        httpOnly: true,
        expires: new Date(Date.now())
    }
    res.status(200).cookie("jwt", null, cookieOption).json({
        success: true,
        message: "Logged out successfully !"
    })
})

// get user profile -- user
exports.getProfileDetailsByUser = asyncCatchError(async (req, res, next) => {
    const userId = req.user._id

    const user = await User.findById(userId)

    if (!user) {
        return next(new ErrorHandler("User not found !", 404))
    }

    res.status(200).json({
        success: true,
        user
    })
})

// update profile -- user
exports.updateProfileByUser = asyncCatchError(async (req, res, next) => {
    const userId = req.user._id

    const { email, name, avatar } = req.body

    // to update cloudinary image
    // find user with help of user id
    const user = await User.findById(userId)

    // when avatar not to update
    if (avatar.includes("https")) {

        const updatedAvatar = {
            public_id: user.avatar[0].public_id,
            url: avatar
        }

        const update = await User.findByIdAndUpdate(userId,
            {
                name,
                email,
                avatar: updatedAvatar
            }, { new: true })

        res.status(200).json({
            success: true,
            user: update
        })
    }

    // when need to update avatar 
    if (!avatar.includes("https")) {

        // delete exisiting imgage from cloudinary, for that we need to delete avatar public_id
        const publicId = user.avatar[0].public_id

        // some times we only able to delete public_id from cloudinary and user avatar,
        // that is why we dont get public_id from user avatar, 
        // in taht case we can not found public_id from user avatar
        // and  we will get undefined from value,
        // then we use that undefined value to destroy cloudinady public_id
        // that is why we are checking weather public_id exist or not
        if (publicId) {
            await cloudinary.uploader.destroy(publicId)
        }

        // now again upload image in cloudinary
        const myCloud = await cloudinary.uploader.upload(avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale"
        })

        const updatedAvatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }

        const update = await User.findByIdAndUpdate(userId,
            {
                name,
                email,
                avatar: updatedAvatar
            }, { new: true })

        res.status(200).json({
            success: true,
            user: update
        })
    }
})



// forgot password/ send password reset link to mail
exports.forgotPassword = asyncCatchError(async (req, res, next) => {
    const { email, url } = req.body
    
    const user = await User.findOne({ email: email })

    if (!user) {
        return next(new ErrorHandler("user not found !", 404))
    }

    const resetPasswordToken = await user.generateForgotPasswordToken()

    await user.save({ validateBeforeSave: false })

    // const mailLink = `${url}/password/reset/${resetPasswordToken}`

    const mailLink = `${req.protocol}/${req.get("host")}/password/reset/${resetPasswordToken}` // now port are same after calling build folder in backend
                        // req.protocol == http/https, req.get("host") == heroku/netlify where we will host

    const message = `Ecommerce3 : Your reset password link is \n\n  ${mailLink} \n\nIf you are not requested this mail then, please ignore it !`

    try {

        await sendMail({
            email: email,
            message: message,
            subject: "Ecommerce3 reset password link !"
        })

        res.status(200).json({
            success: true,
            message: `Reset paasword Link has been sent to ${email}`
        })

    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordTokenExpiry = undefined

        await user.save({ validateBeforeSave: true })

        return next(new ErrorHandler("Invalid link or link has been expired !", 403))
    }

})

// reset/change/recover password
exports.recoverPassword = asyncCatchError(async (req, res, next) => {

    const { password, confirmPassword } = req.body

    const token = req.params.token

    const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex")

    const user = await User.findOne({
        resetPasswordToken: resetPasswordToken,
        resetPasswordTokenExpiry: { $gt: Date.now() }
    })

    if (!user) {
        return next(new ErrorHandler("Invalid link or link has been expired !"))
    }

    if (password !== confirmPassword) {
        return next(new ErrorHandler("New password and New Confirm Password does not match !", 400))
    }

    user.password = password
    user.resetPasswordToken = undefined
    user.resetPasswordTokenExpiry = undefined

    await user.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true,
        message: "Password changed successfully !"
    })

})





// get single user -- admin
exports.getSingleUserByAdmin = asyncCatchError(async (req, res, next) => {
    const userId = req.params.id

    const user = await User.findById(userId)

    if (!user) {
        return next(new ErrorHandler("User not found !", 404))
    }

    res.status(200).json({
        success: true,
        user
    })
})

// delete user -- admin
exports.deleteUserByAdmin = asyncCatchError(async (req, res, next) => {
    const userId = req.params.id

    const user = await User.findById(userId)

    if (!user) {
        return next(new ErrorHandler("User does not exist or already deleted!", 404))
    }

    await cloudinary.uploader.destroy(user.avatar[0].public_id)

    await user.remove()

    res.status(200).json({
        success: true,
        message: "User deleted successfully !"
    })
})

// update user/ user role -- admin
exports.updateUserByAdmin = asyncCatchError(async (req, res, next) => {
    const userId = req.params.id

    const { name, email, role, newAvatar, oldAvatar } = req.body
    let avatar = ""


    const user = await User.findById(userId)

    if (!user) {
        return next(new ErrorHandler("User not found !", 404))
    }

    if(newAvatar){
        await cloudinary.uploader.destroy(user.avatar[0].public_id)

        const result = await cloudinary.uploader.upload(newAvatar,{
            folder : "avatars",
            width : 150,
            crop : "scale"
        })

        avatar = {
            public_id : result.public_id,
            url : result.secure_url
        }
    }
    else{

        avatar = oldAvatar[0]
    }


    user.avatar = avatar
    user.name = name
    user.email = email
    user.role = role

    await user.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true,
        user
    })
})

// get all users -- admin
exports.getAllUsersByAdmin = asyncCatchError(async (req, res, next) => {

    const users = await User.find()

    if (!users) {
        return next(new ErrorHandler("Users not found !", 404))
    }

    res.status(200).json({
        success: true,
        users
    })
})

// change password by user
exports.changePassword = asyncCatchError(async(req, res, next)=>{
    const {oldPassword, newPassword, newConfirmPassword} = req.body

    if( !oldPassword || !newPassword || !newConfirmPassword){
        return next(new ErrorHandler("All fields are required !", 400))
    }

    const userId = req.user._id

    const user = await User.findById(userId)

   const isPasswordMatch = await user.comparePassword(oldPassword)

   if( !isPasswordMatch ){
       return next(new ErrorHandler("Old password is not correct !", 400))
   }

   if(newPassword !== newConfirmPassword){
    return next(new ErrorHandler("New Password and New Confirm Password does not match !", 400))
    }

    // await User.findByIdAndUpdate({_id:userId}, {password: newPassword}, {new: true} )
    user.password = newPassword

    await user.save()

res.status(200).json({
    success: true,
})

})