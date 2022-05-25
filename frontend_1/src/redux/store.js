import { createStore, combineReducers, applyMiddleware, } from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import {CreateNewProductReducer, DeleteProdductReducer, ProductDetails, ProductReducer} from "./reducers/productReducers"
import { DeleteAdminUserReducer, ForgotPasswordReducer, GetAdminUserReducer, GetUsersListReducer, PasswordChangeReducer, ResetPasswordReducer, UpdateProfileReducer, UpdateUserByAdminReducer, UserReducer} from "./reducers/userReducers"
import { AddItemsToCartReducer } from "./reducers/cartReducer"
import {AdminOrderStatusChangeReducer, DeleteAdminOrderReducer, GetAdminOrderPreviewReducer, GetAdminOrdersReducer, MyOrdersReducer, OrderCreateReducer, OrderPreviewReducer} from "./reducers/orderReducer"
import { DeleteReviewByAdmiReducer, getAllReviewsOfAllProductsReducer, ReviewCreateReducer } from "./reducers/reviewReducer"

const reducer = combineReducers({
    products : ProductReducer,
    productDetails : ProductDetails,
    userRegister : UserReducer,
    profileUpdated : UpdateProfileReducer,
    changePassword : PasswordChangeReducer,
    forgotPassword: ForgotPasswordReducer,
    resetPassword : ResetPasswordReducer,
    cart : AddItemsToCartReducer,
    order : OrderCreateReducer,
    myOrders : MyOrdersReducer,
    orderPreview : OrderPreviewReducer,
    review: ReviewCreateReducer,
    usersList : GetUsersListReducer,
    allProductReviews : getAllReviewsOfAllProductsReducer,
    deleteProduct : DeleteProdductReducer,
    newProduct : CreateNewProductReducer,
    getAdminOrders : GetAdminOrdersReducer,
    getAdminOrder : GetAdminOrderPreviewReducer,
    deleteOrderAdmin : DeleteAdminOrderReducer,
    orderStatus : AdminOrderStatusChangeReducer,
    deleteAdminUser : DeleteAdminUserReducer,
    getAdminSingleUser : GetAdminUserReducer,
    updateUserByAdmin : UpdateUserByAdminReducer,
    deleteReviewAdmin : DeleteReviewByAdmiReducer
})


let initialState = {
   cart : {
       cartItems : localStorage.getItem("cartItems") ? 
       
       JSON.parse(localStorage.getItem("cartItems")) : [],

       shippingInfo : localStorage.getItem("shippingInfo") ?

       localStorage.getItem("shippingInfo") : {}
   }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store