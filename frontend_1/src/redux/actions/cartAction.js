import axios from "axios"
import { ADD_ITEMS_TO_CART_FAIL, ADD_ITEMS_TO_CART_REQUEST, ADD_ITEMS_TO_CART_SUCCESS, CART_QUANTITY_CHANGE_REQUEST, CART_QUANTITY_CHANGE_SUCCESS, REMOVE_FROM_CART_FAIL, REMOVE_FROM_CART_REQUEST, REMOVE_FROM_CART_SUCCESS, SHIPPING_ADDRESS_ADD_FAIL, SHIPPING_ADDRESS_ADD_REQUEST, SHIPPING_ADDRESS_ADD_SUCCESS } from "../types/cartTypes"



export const addItemsToCartAction = (id, quantity) => async (dispatch, getState)=>{

    try {
        dispatch({
            type : ADD_ITEMS_TO_CART_REQUEST
        })
        // yaha koi config nahi chahiye kyu ki get ke time pe kuch nhi chahiye
        const {data} = await axios.get(`/api/product/${id}`)

        dispatch({
            type: ADD_ITEMS_TO_CART_SUCCESS,
            payload: {
                product : data.product._id,
                name :data.product.name,
                stock :data.product.stock,
                image :data.product.images[0].url,
                category: data.product.category,
                price: data.product.price,
                quantity
            }
        })
     
            localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))


    } catch (error) {
        dispatch({
            type: ADD_ITEMS_TO_CART_FAIL,
            payload : error.response.data.error
        })
    }
}

//  remove from cart
export const removeFromCartAction = (id) => async(dispatch, getState)=>{
    try {
        dispatch({
            type : REMOVE_FROM_CART_REQUEST
        })
        dispatch({
            type : REMOVE_FROM_CART_SUCCESS,
            payload : id
        })


        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))

    } catch (error) {
        dispatch({
            type : REMOVE_FROM_CART_FAIL,
            payload : "Unable remove item from cart !"
        })
    }
}

// cart quantity change
export const cartQuantityChangeAction = (id, quantity) => async(dispatch, getState)=>{
    try {
        dispatch({
            type : CART_QUANTITY_CHANGE_REQUEST
        })

        dispatch({
            type : CART_QUANTITY_CHANGE_SUCCESS,
            payload : {id, quantity}
        })

        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))


    } catch (error) {
        dispatch({
            type : CART_QUANTITY_CHANGE_REQUEST,
            payload : "Not able to change quantity right now !"
        })
    }
}

// shipping address 
export const shippingAddressAction = (shippingInfo) => async (dispatch, getState) =>{
    console.log(shippingInfo)
    
    try {
        dispatch({
            type : SHIPPING_ADDRESS_ADD_REQUEST
        })

        dispatch({
            type : SHIPPING_ADDRESS_ADD_SUCCESS,
            payload : shippingInfo
        })

        const storedAddress = localStorage.getItem("shippingInfo")
        if( !storedAddress){
            localStorage.setItem("shippingInfo", JSON.stringify(getState().cart.shippingInfo))
        }else{
            localStorage.removeItem("shippingInfo")

            localStorage.setItem("shippingInfo", JSON.stringify(getState().cart.shippingInfo))

        }
        
    } catch (error) {
        dispatch({
            type : SHIPPING_ADDRESS_ADD_FAIL,
            payload : "Something went wrong , unable to add shipping address !"
        })
    }
}