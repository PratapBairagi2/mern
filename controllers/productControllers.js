const asyncCatchError = require("../middlewares/asyncCatchError.js")
const Product = require("../models/productModel.js")
const ApiSearchFeatures = require("../utils/apiSearchfeatures.js")
const ErrorHandler = require("../utils/errorHandler.js")
const cloudinary = require("../utils/cloudinaryConfig.js")

// create product -- admin
exports.createProduct = asyncCatchError( async(req, res, next)=>{

    const images = req.body.images

    let imagesLink = []

    for (let i = 0; images.length > i; i++){

        const result = 
        await cloudinary.uploader.upload(images[i],{
            folder:"products"
        })

        imagesLink.push({
            public_id : result.public_id,
            url : result.secure_url
        })
    }

    req.body.images = imagesLink
    req.body.user = req.user.id

    const product = await Product.create(req.body)

    res.status(201).json({
        success:true,
        product
    })
})

// update product -- admin
exports.updateProduct = asyncCatchError( async(req, res, next)=>{
    const productId = req.params.id

    const oldImages = req.body.oldImages
    const newImages = req.body.images
    let imagesLink = []

    if(newImages.length>0){

        // deleting old image 
        for (let i = 0; oldImages.length > i; i++){
           await cloudinary.uploader.destroy(oldImages[i].public_id)
        }
        
        // now add new images in cloudinary
        for (let i = 0 ; newImages.length > i; i++ ){
            const result = await cloudinary.uploader.upload(newImages[i],{
                folder: "products"
            })

            imagesLink.push({
                public_id:result.public_id,
                url : result.secure_url
            })
        }
    }
    else{
        imagesLink = await oldImages
    }

    const product = await Product.findById(productId)

    if(!product){
        return next(new ErrorHandler("Product not found !", 404))
    }

    delete req.body.oldImages

    req.body.images = imagesLink

    const updated = await Product.findByIdAndUpdate(productId, req.body, {new:true})

    res.status(200).json({
        success:true,
        product: updated
    })
})

// delete product -- admin
exports.deleteProduct = asyncCatchError(async(req, res, next)=>{
    const productId = req.params.id

    const product = await Product.findById(productId)

    if(!product){
        return next("Product not found !", 404)
    }

    //  deleting cloudinary images from cloudinary
    for (let i = 0 ; product.images.length > i ; i++){
       await cloudinary.uploader.destroy(product.images[i].public_id)
    }

    await product.remove()

    res.status(200).json({
        success:true,
        message:"Product deleted successfully"
    })
})

// get single product -- admin
exports.getSingleProductByAdmin = asyncCatchError(async(req, res, next)=>{
    const productId = req.params.id

    const product = await Product.findById(productId)

    if(!product){
        return next(new ErrorHandler("Product not found !", 404))
    }

    res.status(200).json({
        success: true,
        product
    })
})

//  get single product -- user
exports.getSingleProductByUser = asyncCatchError(async(req, res, next)=>{
    const productId = req.params.id

    const product = await Product.findById(productId)

    if( !product){
        return next(new ErrorHandler("Product not found !", 404))
    }

    res.status(200).json({
        success: true,
        product
    })
})

// get all products -- user
exports.getAllProductsbyUser = asyncCatchError(async(req, res, next)=>{


    const resultPerPage = 8

    const productCount = await Product.countDocuments()

    // const filter = new ApiSearchFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage)
    // const products = await filter.query



    // // this is for getting separate length of products,
    // one - get products of searched products before pagination
    // two - get products after applying pagination
        let filter = new ApiSearchFeatures(Product.find(),req.query).search().filter()

    // call searched products before pagination
    let products = await filter.query

    // then get searched products lengh
    const filteredProductsCount = products.length

    // then apply pagination
       filter = new ApiSearchFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage)

    // then call pagination with filter
     products = await filter.query


    // const currtentPage = Number(req.query.page) || 1

    // const skip = pagePerResult * (currtentPage - 1)

    // const products = await Product.find( req.query.keyword ? {"name":{$regex : req.query.keyword, $options:"i"} }:{}, req.query.price ?{"price":{$gt : req.query.price}}:{}).limit(3).skip(skip)

    // const products = await Product.find()

    if(!products){
        return next(new ErrorHandler("Products not found !", 404))
    }

    res.status(200).json({
        success:true,
        products,
        productCount,
        resultPerPage,
        filteredProductsCount
    })
})

// create/update review
exports.makeReview = asyncCatchError(async(req, res, next)=>{
    // const productId = req.params.id
    // this will availble for logged in user only

    const userId = req.user._id

    const {comment, rating, productId} = req.body

    const review = {
        name: req.user.name,
        user: userId,
        comment:comment,
        rating:rating
    }

    const product = await Product.findById(productId)

    if(!product){
        return next(new ErrorHandler("Product does not exist or removed !", 404))
    }

   const isReviewed = await product.reviews.find(rev=>{
        return rev.user.toString() === userId.toString()
    })

    if(isReviewed){
        product.reviews.forEach(rev=>{
            if(rev.user.toString() === userId.toString()){

                isReviewed.comment = comment
                isReviewed.rating = rating
            }
        })
    }
    else{
       await product.reviews.push(review)
    }
    
    let avgratings = 0

    product.reviews.forEach(rev=>{
        return avgratings += +rev.rating
    })

    product.ratings = avgratings/product.reviews.length
    product.numberOfReviews = product.reviews.length


    await product.save({validateBeforeSave:false})

       res.status(201).json({
           success:true,
           message:"Reviewed sussessfully !"
       })
})

// delete review
exports.deleteReview = asyncCatchError(async(req, res, next)=>{
    const userId = req.user._id

    const productId = req.body.productId

    const product = await Product.findById(productId)

    if(!product){
        return next(new ErrorHandler("product does not exist or removed !", 404))
    }

   const restReview = await product.reviews.filter(rev=>{
        return rev.user.toString() !== userId.toString()
    })

    let averageRating = 0

    restReview.forEach(rev=>{
        return averageRating += +rev.rating
    })

    product.ratings = averageRating/ restReview.length
    product.numberOfReviews = restReview.length
    product.reviews =restReview

    await product.save({validateBeforeSave:false})

    res.status(200).json({
        success: true,
        message:"Review deleted successfully !"
    })
})

// get all reviews of a single product -- admin
exports.getAllReviews = asyncCatchError(async(req, res, next)=>{
    const productId = req.query.productId
    const reviewId = req.query.id

    let product = []
    if(productId){
        const pro = await Product.findById(productId)
        product.push(pro) 
    }
    else{
        product = await Product.find()
    }

    if(!product){
        return next(new ErrorHandler("Product does not exist or removed !", 404))
    }

    res.status(200).json({
        success: true,
        reviews: product
    })
})

// // delete review -- admin
exports.deleteReviewByAdmin = asyncCatchError (async(req, res, next)=>{
    const productId = req.query.productId
    const reviewId = req.query.id

    const product = await Product.findById(productId)

    if(!product){
        return next( new ErrorHandler("Product does not exist !", 404))
    }

        const reviews = product.reviews.filter((rev)=> rev._id.toString() !== reviewId.toString())

        let avgRating = 0

        reviews.forEach((r,i)=>{
           return avgRating += +r.rating
        })

        product.ratings = (avgRating/reviews.length)
        product.numberOfReviews = reviews.length
        product.reviews = reviews

        await product.save({validateBeforeSave: false})

        res.status(200).json({
            success : true,
            message : "Review deleted successfully !"
        })
})


exports.getAllAdminlProducts = asyncCatchError(async(req, res, next)=>{

    const products = await Product.find()

    if(!products){
        return next(new ErrorHandler("Product do not exist or removed !", 404))
    }

    res.status(200).json({
        success: true,
        products
    })
})