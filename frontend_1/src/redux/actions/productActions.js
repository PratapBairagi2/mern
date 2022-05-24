import axios from "axios"
import { ADMIN_DELETE_PRODUCT_FAIL, ADMIN_DELETE_PRODUCT_REQUEST, ADMIN_DELETE_PRODUCT_SUCCESS, ADMIN_PRODUCTS_GET_FAIL, ADMIN_PRODUCTS_GET_REQUEST, ADMIN_PRODUCTS_GET_SUCCESS, CLEAR_ERROR, CREATE_NEW_PRODUCT_FAIL, CREATE_NEW_PRODUCT_REQUEST, CREATE_NEW_PRODUCT_SUCCESS, PRODUCTS_GET_FAIL, PRODUCTS_GET_REQUEST, PRODUCTS_GET_SUCCESS, PRODUCT_GET_REQUEST, PRODUCT_GET_SUCCESS, RESET_SUCCESS, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS } from "../types/productTypes"

// get all products
export const getProducts = (keyword, currtentPage, range, category, ratings) => async (dispatch) =>{

    let keywordd = keyword ?.keyword || ""
    let currtentPagee = currtentPage || 1
    let price1 = range? range.priceStart : 0
    let price2 = range? range.priceEnd : 99999
    let cat = category || ""
    let rating = ratings || 0

    try {
        dispatch({
            type : PRODUCTS_GET_REQUEST
        })
        
            let link = cat ? `/api/products?keyword=${keywordd}&page=${currtentPagee}&price[gte]=${price1}&price[lte]=${price2}&category=${cat}&ratings[gte]=${rating}` :
            `/api/products?keyword=${keywordd}&page=${currtentPagee}&price[gte]=${price1}&price[lte]=${price2}&ratings[gte]=${rating}`
       
        const {data} = await axios.get(link)

        dispatch({
            type : PRODUCTS_GET_SUCCESS,
            payload : data
        })
    } catch (error) {
        console.log("errrrr", error.response.data.error)
        dispatch({
            type : PRODUCTS_GET_FAIL,
            payload : error.response.data.error
        })
    }

}

// get single product details
export const getProductDetails = (id) => async (dispatch) =>{
    try {
        dispatch({
            type: PRODUCT_GET_REQUEST
        })

        const {data} = await axios.get(`/api/admin/product/${id}`)

        dispatch({
            type: PRODUCT_GET_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: PRODUCTS_GET_FAIL,
            payload: error.response.data.message
        })
    }

}

// get all products -- admin
export const adminGetAllProducts = () => async(dispatch) =>{
    try {
        dispatch({
            type : ADMIN_PRODUCTS_GET_REQUEST
        })

        const { data } = await axios.get("/api/admin/products")

        dispatch({
            type : ADMIN_PRODUCTS_GET_SUCCESS,
            payload : data
        })
        
    } catch (error) {
        dispatch({
            type : ADMIN_PRODUCTS_GET_FAIL,
            payload : error.response.data.error
        })
    }
}


// create new product -- admin
export const createNewProductAction = (newProduct) => async (dispatch)=>{
    
    try {
        dispatch({
            type : CREATE_NEW_PRODUCT_REQUEST
        })
        const config ={
            headers :{"Content-Type":"application/json"} // array files/ bahot sara files jab hoga tab application/json file ek hoga toh multipart/form-data
        }
        const {data} = await axios.post("/api/admin/product/new", newProduct, config)
        
        dispatch({
            type : CREATE_NEW_PRODUCT_SUCCESS,
            payload : data
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type : CREATE_NEW_PRODUCT_FAIL,
            payload : error.response.data.error
        })
    }
}
//  delete product -- admin
export const deleteProductAction = (id) => async(dispatch) =>{
    try {
        dispatch({
            type : ADMIN_DELETE_PRODUCT_REQUEST
        })

        const {data} = await axios.delete(`/api/admin/product/${id}`)

        dispatch({
            type : ADMIN_DELETE_PRODUCT_SUCCESS,
            payload : data
        })
        
    } catch (error) {
        dispatch({
            type : ADMIN_DELETE_PRODUCT_FAIL,
            payload : error.response.data.error
        })
    }
}

//  update product --  admin
export const updateProductAction = (product, id) => async(dispatch) =>{
    try {
        dispatch({
            type : UPDATE_PRODUCT_REQUEST
        })

        const config = {
            headers : {"Content-Type":"application/json"}
        }

        const { data } = await axios.put(`/api/admin/product/${id}`, product, config)

        dispatch({
            type : UPDATE_PRODUCT_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type : UPDATE_PRODUCT_FAIL,
            payload : error.response.data.error
        })
    }
}

// reset success
export const reset_success = () => async (dispatch) => {
    dispatch({
        type : RESET_SUCCESS
    })
}


//  clear error
export const clearAllError = () => async(dispatch) =>{
    dispatch({
        type : CLEAR_ERROR
    })
}