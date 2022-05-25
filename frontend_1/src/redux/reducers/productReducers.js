import { PRODUCTS_GET_FAIL, PRODUCTS_GET_REQUEST, PRODUCTS_GET_SUCCESS, CLEAR_ERROR, PRODUCT_GET_REQUEST, PRODUCT_GET_SUCCESS, PRODUCT_GET_FAIL, ADMIN_PRODUCTS_GET_REQUEST, ADMIN_PRODUCTS_GET_SUCCESS, ADMIN_PRODUCTS_GET_FAIL, ADMIN_DELETE_PRODUCT_FAIL, ADMIN_DELETE_PRODUCT_REQUEST, ADMIN_DELETE_PRODUCT_SUCCESS, CREATE_NEW_PRODUCT_REQUEST, CREATE_NEW_PRODUCT_SUCCESS, CREATE_NEW_PRODUCT_FAIL, RESET_SUCCESS, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAIL } from "../types/productTypes"


export const ProductReducer = (
    state = {
        loading: false,
        products: [],
        success: false,
        error: null
    },
    action) => {

    switch (action.type) {

        case PRODUCTS_GET_REQUEST:
        case ADMIN_PRODUCTS_GET_REQUEST:
            return {
                ...state,
                loading: true
            }

        case PRODUCTS_GET_SUCCESS:
        case ADMIN_PRODUCTS_GET_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload.products,
                productCount: action.payload.productCount,
                resultPerPage: action.payload.resultPerPage,
                filteredProductsCount: action.payload.filteredProductsCount,
                success: action.payload.success
            }
        case RESET_SUCCESS:
            return {
                ...state,
                success: false
            }

        case PRODUCTS_GET_FAIL:
        case ADMIN_PRODUCTS_GET_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }

        default: return state

    }

}


export const ProductDetails = (
    state = {
        loading: false,
        product: {},
        success: false
    }, action) => {
        
    switch (action.type) {
        case PRODUCT_GET_REQUEST:
            return {
                loading: true,
                success: false,
                ...state
            }
        case PRODUCT_GET_SUCCESS:
            return {
                loading: false,
                product: action.payload.product,
                success: action.payload.success
            }
        case RESET_SUCCESS:
            return {
                ...state,
                success: false
            }
        case PRODUCT_GET_FAIL:
            return {
                loading: false,
                error: action.payload,
                success: action.payload.success
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


// delete a product -- admin
export const DeleteProdductReducer = (
    state = {
        loading: false,
        success: false,
        error: null
    }, action) => {

    switch (action.type) {
        case ADMIN_DELETE_PRODUCT_REQUEST:
        case UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ADMIN_DELETE_PRODUCT_SUCCESS:
        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loadi: false,
                success: true
            }
        case RESET_SUCCESS:
            return {
                ...state,
                success: false
            }
        case ADMIN_DELETE_PRODUCT_FAIL:
        case UPDATE_PRODUCT_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default: return state
    }
}

// // update product -- admin
// export const UpdateProductReducer = (
//     state={
//         loading : false,
//         success : false,
//         product : {},
//         error : null
//     },
//     action) =>{

//     switch(action.type){
//         case UPDATE_PRODUCT_REQUEST :
//             return{
//                 ...state, 
//                 loading : true
//             }
//             case UPDATE_PRODUCT_SUCCESS :
//             return{
//                 ...state,
//                 loading : false,
//                 success : true,
//                 product : action.payload
//             }
//             case RESET_SUCCESS :
//                 return{
//                     ...state,
//                     success : false
//                 }
//             case UPDATE_PRODUCT_FAIL :
//             return{
//                 ...state,
//                 error : action.payload
//             }
//             case CLEAR_ERROR :
//                 return{
//                     ...state,
//                     error : null
//                 }
//             default : return state
//     }
// }


// create new product -- admin
export const CreateNewProductReducer = (
    state = {
        loading: false,
        success: false,
        product: {},
        error: null
    },
    action) => {

    switch (action.type) {
        case CREATE_NEW_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case CREATE_NEW_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                paroduct: action.payload
            }
        case RESET_SUCCESS:
            return {
                ...state,
                success: false
            }
        case CREATE_NEW_PRODUCT_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default: return state
    }
}
