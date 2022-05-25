import axios from "axios"
import { CLEAR_ERROR, GET_ORDERS_FAIL, GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS, GET_ORDER_PREVIEW_FAIL, GET_ORDER_PREVIEW_REQUEST, GET_ORDER_PREVIEW_SUCCESS, ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, GET_ADMIN_ORDERS_REQUEST, GET_ADMIN_ORDERS_SUCCESS, GET_ADMIN_ORDERS_FAIL, DELETE_ADMIN_ORDER_FAIL, DELETE_ADMIN_ORDER_REQUEST, DELETE_ADMIN_ORDER_SUCCESS, RESET_SUCCESS, GET_ADMIN_ORDER_PREVIEW_FAIL, GET_ADMIN_ORDER_PREVIEW_REQUEST, GET_ADMIN_ORDER_PREVIEW_SUCCESS, ADMIN_ORDER_STATUS_CHANGE_FAIL, ADMIN_ORDER_STATUS_CHANGE_REQUEST, ADMIN_ORDER_STATUS_CHANGE_SUCCESS } from "../types/orderTypes"


// create new order
export const orederCreateAction = (order) => async(dispatch) =>{
 
    try {
        dispatch({
            type :  ORDER_CREATE_REQUEST
        })

        const config ={
            headers :{ "Content-Type":"application/json"}
        }
        const {data} = await axios.post("/api/order/new", order, config)

        dispatch({
            type : ORDER_CREATE_SUCCESS,
            payload : data
        })

    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload : error.response.data.error
        })
    }
}

// get my orders
export const myOrdersAction = () => async (dispatch)=>{
    try {
        dispatch({
            type : GET_ORDERS_REQUEST
        })

        const {data} = await axios.get("/api/me/orders")

        dispatch({
            type : GET_ORDERS_SUCCESS,
            payload : data.orders
        })

    } catch (error) {
        dispatch({
            type : GET_ORDERS_FAIL,
            payload : error.response.data.error
        })
    }
}

// get single order preview
export const  orderPreviewAction = (id) => async(dispatch)=>{
    try {
        dispatch({
            type : GET_ORDER_PREVIEW_REQUEST
        })

        const { data } = await axios.get(`/api/me/order/${id}`)

        dispatch({
            type : GET_ORDER_PREVIEW_SUCCESS,
            payload : data.order
        })
    } catch (error) {
        dispatch({
            type : GET_ORDER_PREVIEW_FAIL,
            payload : error.response.data.error
        })
    }
}

// get all admin products
export const getAdminOrdersAction = () => async (dispatch) =>{
    try {
        dispatch({
            type : GET_ADMIN_ORDERS_REQUEST
        })

        const {data} = await axios.get("/api/admin/orders")

        dispatch({
            type : GET_ADMIN_ORDERS_SUCCESS,
            payload : data
        })

    } catch (error) {
        dispatch({
            type : GET_ADMIN_ORDERS_FAIL,
            payload : error.response.data.error
        })
    }
}

//  delete order -- admin
export const deleteAdminOrderAction = (id) => async (dispatch) =>{
    try {
        dispatch({
            type : DELETE_ADMIN_ORDER_REQUEST
        })
        const {data} = await axios.delete(`/api/admin/order/${id}`)
        dispatch({
            type : DELETE_ADMIN_ORDER_SUCCESS,
            payload : data

        })
    } catch (error) {
        dispatch({
            type : DELETE_ADMIN_ORDER_FAIL,
            payload : error.response.data.error
        })
    }
}

//  get order preview -- admin
export const getAdminOrderPreviewAction = (id) => async (dispatch) =>{
    try {
        dispatch({
            type : GET_ADMIN_ORDER_PREVIEW_REQUEST
        })

        const {data} = await axios.get(`/api/admin/order/${id}`)

        dispatch({
            type : GET_ADMIN_ORDER_PREVIEW_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type : GET_ADMIN_ORDER_PREVIEW_FAIL,
            payload : error.response.data.error
        })
    }
}

// admin order status change -- admin
export const adminOrderStatusChangeAction = (id, orderStatus) => async(dispatch) =>{
    try {
        dispatch({
            type : ADMIN_ORDER_STATUS_CHANGE_REQUEST
        })
        
        const {data} = await axios.put(`/api/admin/order/${id}`, {orderStatus})

        dispatch({
            type : ADMIN_ORDER_STATUS_CHANGE_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type : ADMIN_ORDER_STATUS_CHANGE_FAIL,
            payload : error.response.data.error
        })
    }
}

export const reset_success = () => async (dispatch) =>{
    dispatch({
        type : RESET_SUCCESS
    })
}

export const cleareError = () => async(dispatch)=>{
    dispatch({
        type : CLEAR_ERROR
    })
}