import { ADMIN_ORDER_STATUS_CHANGE_FAIL, ADMIN_ORDER_STATUS_CHANGE_REQUEST, ADMIN_ORDER_STATUS_CHANGE_SUCCESS, CLEAR_ERROR, DELETE_ADMIN_ORDER_FAIL, DELETE_ADMIN_ORDER_REQUEST, DELETE_ADMIN_ORDER_SUCCESS, GET_ADMIN_ORDERS_FAIL, GET_ADMIN_ORDERS_REQUEST, GET_ADMIN_ORDERS_SUCCESS, GET_ADMIN_ORDER_PREVIEW_FAIL, GET_ADMIN_ORDER_PREVIEW_REQUEST, GET_ADMIN_ORDER_PREVIEW_SUCCESS, GET_ORDERS_FAIL, GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS, GET_ORDER_PREVIEW_FAIL, GET_ORDER_PREVIEW_REQUEST, GET_ORDER_PREVIEW_SUCCESS, ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, RESET_SUCCESS } from "../types/orderTypes";


export const OrderCreateReducer = (
    state = {
        loading: false,
        success: false,
        order: {},
        error: null
    },
    action) => {

    if (state.success === true) {
        setTimeout(() => {
            return state.success = false
        }, 500)
    }


    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ORDER_CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                products: action.paload
            }
        case ORDER_CREATE_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

// my orders
export const MyOrdersReducer = (
    state = {
        loading: false,
        success: false,
        orders: [],
        error: null
    },
    action) => {

    if (state.success === true) {
        setTimeout(() => {
            state.success = false
        }, 500)
    }

    switch (action.type) {

        case GET_ORDERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                orders: action.payload
            }
        case GET_ORDERS_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

// single order preview
export const OrderPreviewReducer = (
    state = {
        loading: false,
        success: false,
        order: {},
        error: null
    },
    action) => {

    switch (action.type) {
        case GET_ORDER_PREVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_ORDER_PREVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                order: action.payload
            }
        case GET_ORDER_PREVIEW_FAIL:
            return {
                ...state,
                error: action.paload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}


// get all orders -- admin
export const GetAdminOrdersReducer = (
    state = {
        loading: false,
        success: false,
        orders: [],
        error: null
    },
    action) => {

    switch (action.type) {

        case GET_ADMIN_ORDERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_ADMIN_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                orders: action.payload.orders
            }
        case GET_ADMIN_ORDERS_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case RESET_SUCCESS:
            return {
                ...state,
                // success : false
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

//  delete order -- admin
export const DeleteAdminOrderReducer = (
    state = {
        loading: false,
        success: false,
        error: null
    },
    action) => {

    switch (action.type) {
        case DELETE_ADMIN_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DELETE_ADMIN_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true
            }
        case DELETE_ADMIN_ORDER_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case RESET_SUCCESS:
            return {
                ...state,
                success: false
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

// get admin order preview -- admin
export const GetAdminOrderPreviewReducer = (
    state = {
        loading: false,
        success: false,
        order: {},
        error: null
    },
    action) => {

    switch (action.type) {
        case GET_ADMIN_ORDER_PREVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_ADMIN_ORDER_PREVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                order: action.payload.order
            }
        case GET_ADMIN_ORDER_PREVIEW_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case RESET_SUCCESS:
            return {
                ...state,
                success: false
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

// change order status -- admin
export const AdminOrderStatusChangeReducer = (
    state={
        loading : false,
        success : false, 
        error : null
    }, 
    action) =>{

    switch(action.type){
        
        case ADMIN_ORDER_STATUS_CHANGE_REQUEST: 
        return{
            ...state,
            loading : true
        }
        case ADMIN_ORDER_STATUS_CHANGE_SUCCESS: 
        return{
            ...state,
            loading : false,
            success : true
        }
        case ADMIN_ORDER_STATUS_CHANGE_FAIL: 
        return{
            ...state,
            error : action.payload
        }
        case RESET_SUCCESS :
            return{
                ...state,
                success : false
            }
            case CLEAR_ERROR :
                return{
                    ...state,
                    error : null
                }
                default : 
                return state
    }
}