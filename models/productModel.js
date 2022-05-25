const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter product name"],
        maxlength:[20,"Product name can not be exceed 20 characters !"]
    },
    category:{
        type:String,
        required:[true,"Please enter product category name"],
        maxlength:[15,"Product category name can not be exceed 15 characters !"] 
    },
    description:{
        type:String,
        required:[true,"Please enter product name"],
        minlength:[10,"Product description must be atleast 10 characters !"]
    },
    price:{
        type:Number,
        required:[true, "Please enter product price !"],
        maxlength:[6, "Product price can not be exceed 6 digits !"]
    },
    stock:{
        type:Number,
        required:true,
        maxlength:[6, "Product quantity can not exceed 2 digits !"],
        default:1
    },
    images:[
        {
            public_id:{
                type:String,
                required:[true, "Please upload product image !"]
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    ratings:{
        type:Number,
        required:true,
        default:0
    },
    numberOfReviews:{
        type:String,
        required:true,
        default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"user",
                required:true
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    },
    // user:{
    //     type:mongoose.Schema.ObjectId,
    //     ref:"user",
    //     required:true
    // }
})

const Product = new mongoose.model("product", productSchema)

module.exports = Product