
const express = require("express")
const { 
    userRegister, 
    loginUser, 
    logoutUser, 
    getProfileDetailsByUser, 
    updateProfileByUser, 
    getSingleUserByAdmin, 
    deleteUserByAdmin, 
    updateUserByAdmin, 
    getAllUsersByAdmin, 
    forgotPassword, 
    recoverPassword, 
    changePassword } = require("../controllers/userController")

const authorizationUser = require("../middlewares/userAuth")
const userRole = require("../backend_practice_2/middlewares/userRole")

const userRoute = express.Router()

// user - public route
userRoute.route("/register").post(userRegister)
userRoute.route("/login").post(loginUser)

// user/admin - private route
userRoute.route("/logout").get(authorizationUser,logoutUser)

// user - public route
userRoute.route("/password/forgot").post(forgotPassword)
userRoute.route("/password/reset/:token").put(recoverPassword)

// user - private route
userRoute.route("/me").get(authorizationUser,getProfileDetailsByUser)
userRoute.route("/me/update").put(authorizationUser,updateProfileByUser)
userRoute.route("/me/password/change").put(authorizationUser, changePassword)

// admin - private route
userRoute.route("/admin/users").get(authorizationUser,userRole("admin"), getAllUsersByAdmin)

userRoute.route("/admin/user/:id").get(authorizationUser,userRole("admin"),getSingleUserByAdmin).delete(authorizationUser,userRole("admin"),deleteUserByAdmin).put(authorizationUser,userRole("admin"),updateUserByAdmin)

module.exports = userRoute