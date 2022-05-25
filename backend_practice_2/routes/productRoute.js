
const express = require("express")
const { getSingleProductByAdmin, getAllReviewsOfAllProducts, getAllAdminlProducts, getAllProductsbyUser, deleteReviewByAdmin } = require("../controllers/productControllers.js")
const { getAllProductsbyAdmin } = require("../controllers/productControllers.js")
const { makeReview } = require("../controllers/productControllers.js")
const { getAllReviews } = require("../controllers/productControllers.js")
const { deleteReview } = require("../controllers/productControllers.js")
const { deleteProduct } = require("../controllers/productControllers.js")
const { updateProduct } = require("../controllers/productControllers.js")
const { createProduct } = require("../controllers/productControllers.js")
const {getSingleProductByUser} = require("../controllers/productControllers.js")
const authorizationUser = require("../middlewares/userAuth")
const userRole = require("../backend_practice_2/middlewares/userRole")

const productRoute = express.Router()

productRoute.route("/admin/product/new").post(authorizationUser, userRole("admin"),createProduct)

// productRoute.route("/admin/product").get(authorizationUser, userRole("admin"), getAllProductsbyAdmin)
productRoute.route("/products").get( getAllProductsbyUser)

productRoute.route("/product/:id").get(getSingleProductByUser)
productRoute.route("/admin/product/:id").put(authorizationUser, userRole("admin"),updateProduct).delete(authorizationUser, userRole("admin"),deleteProduct).get(getSingleProductByAdmin)
// productRoute.route("/admin/reviews").get(authorizationUser, userRole("admin"), getAllReviewsOfAllProducts)
productRoute.route("/admin/products").get(authorizationUser, userRole("admin"), getAllAdminlProducts)



// review - user
productRoute.route("/review").put(authorizationUser,makeReview).delete(authorizationUser, deleteReview)

// review -- admin
productRoute.route("/admin/reviews").get( authorizationUser, userRole("admin") ,getAllReviews)
productRoute.route("/admin/review").delete(authorizationUser, userRole("admin"),deleteReviewByAdmin)



module.exports = productRoute