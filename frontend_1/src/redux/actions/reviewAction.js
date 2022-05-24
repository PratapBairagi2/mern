import axios from "axios"
import { CLEAR_ERROR, CREATE_REVIEW_FAIL, CREATE_REVIEW_REQUEST, CREATE_REVIEW_SUCCESS, DELETE_REVIEW_FAIL, DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, GET_ALL_REVIEWS_OF_ALL_PRODUCTS_FAIL, GET_ALL_REVIEWS_OF_ALL_PRODUCTS_REQUEST, GET_ALL_REVIEWS_OF_ALL_PRODUCTS_SUCCESS, RESET_SUCCESS } from "../types/reviewTypes"

export const reviewCreateAction = (review) => async(dispatch) =>{
    console.log(review)
    try {
        dispatch({
            type : CREATE_REVIEW_REQUEST
        })

        const config ={
            headers : { "Content-Type":"application/json" }
        }

        const {data} = await axios.put("/api/review",review, config)

        dispatch({
            type : CREATE_REVIEW_SUCCESS,
            payload : data
        })
        
    } catch (error) {
        dispatch({
            type : CREATE_REVIEW_FAIL,
            payload : error.response.data.error
        })
    }
}

// get all reviews of all products -- admin
export const GetAllReviewOfAllProductsAction = (productId, reviewId) => async (dispatch) =>{
    console.log(productId)
    try {
        dispatch({
            type : GET_ALL_REVIEWS_OF_ALL_PRODUCTS_REQUEST
        })

        const {data} = await axios.get(`/api/admin/reviews?id=${reviewId}&productId=${productId}`)

        console.log(data)

        dispatch({
            type : GET_ALL_REVIEWS_OF_ALL_PRODUCTS_SUCCESS,
            payload : data
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type : GET_ALL_REVIEWS_OF_ALL_PRODUCTS_FAIL,
            payload : error.response.data.error
        })
    }
}

// delete review -- admin
export const deleteReviewByAdminAction = (productId, reviewId) => async(dispatch) =>{
    try {
        dispatch({
            type : DELETE_REVIEW_REQUEST
        })

        const {data} = await axios.delete(`/api/admin/review?id=${reviewId}&productId=${productId}`)

        dispatch({
            type : DELETE_REVIEW_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type : DELETE_REVIEW_FAIL,
            payload : error.response.data.error
        })
    }
}

// reset seccess
export const reset_success = () => async(dispatch) =>{
    dispatch({
        type : RESET_SUCCESS
    })
}

// clear all error
export const clearAllError = () => async(dispatch) =>{
    dispatch({
        type : CLEAR_ERROR
    })
}