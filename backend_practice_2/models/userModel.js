const mongoose = require("mongoose");
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name !"],
        minlength:[4,"Name should have atleast 4 characters !"],
        maxlength:[30, "Name can not exceed 30 characters !"]
    },
    email:{
        type:String,
        required:[true,"Please enter your name !"],
        unique:true,
        validate:[validator.isEmail, "Please enter valid email !"]
    },
    password:{
        type:String,
        required:[true, "Please enter password !"]
    },
    avatar:[
        {
            public_id:{
                type:String,
            },
            url:{
                type:String
            }
        }
    ],
    createAt:{
        type: Date,
        default: Date()
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordTokenExpire:String
})

userSchema.pre("save", async function(next){

    if(!this.isModified("password")){
        return next()
    }

    this.password = await bcrypt.hash(this.password, 10)
})

// compare password while login
userSchema.methods.comparePassword = async function(oldPassword){

    return await bcrypt.compare(oldPassword, this.password)
}

// generate token/cookie
userSchema.methods.generateToken = function (){

    // console.log(this._id)

    const token = jwt.sign({id:this._id}, process.env.TOKEN_SECRET_KEY, {expiresIn:"1d"})

    return token
}

// generate forgot password token
userSchema.methods.generateForgotPasswordToken = async function(){

    const token = crypto.randomBytes(20).toString("hex")

    this.resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex")
    this.resetPasswordTokenExpiry = Date.now() + 15 * 60 *1000

    return token
}

const User = new mongoose.model("user", userSchema)

module.exports = User