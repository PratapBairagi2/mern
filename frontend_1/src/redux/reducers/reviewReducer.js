import { CLEAR_ERROR, CREATE_REVIEW_FAIL, CREATE_REVIEW_REQUEST, CREATE_REVIEW_SUCCESS, DELETE_REVIEW_FAIL, DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, GET_ALL_REVIEWS_OF_ALL_PRODUCTS_FAIL, GET_ALL_REVIEWS_OF_ALL_PRODUCTS_REQUEST, GET_ALL_REVIEWS_OF_ALL_PRODUCTS_SUCCESS, RESET_SUCCESS } from "../types/reviewTypes";

export const ReviewCreateReducer = (
    state={

        loading : false,
        success : false,
        // review : {},
        error : null

    }, action) =>{

        if(state.success===true){
            setTimeout(()=>{
                state.success = false
            },500)
        }

    switch(action.type){
        case CREATE_REVIEW_REQUEST :
            return{
                ...state,
                loading : true
            }
            case CREATE_REVIEW_SUCCESS :
                return{
                    ...state,
                    loading : false,
                    success : true,
                    // review : action.payload,
                }
                case CREATE_REVIEW_FAIL :
                    return{
                        ...state,
                        error : action.payload
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

// get all reviews of all products -- admin
export const getAllReviewsOfAllProductsReducer = (
    state={
        loading : false,
        success : false,
        reviews : [],
        error : null
    },
    action)=>{

        if(state.success===true){
            setTimeout(()=>{
                state.success=false
            },500)
        }

    switch(action.type){
        case GET_ALL_REVIEWS_OF_ALL_PRODUCTS_REQUEST : 
        return{
            ...state,
            loading : true
        }
        case GET_ALL_REVIEWS_OF_ALL_PRODUCTS_SUCCESS : 
        return{
            ...state,
            loading : false,
            success : true,
            reviews : action.payload.reviews
        }
        case GET_ALL_REVIEWS_OF_ALL_PRODUCTS_FAIL : 
        return{
            ...state,
            error : action.payload?.reviews
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

//  delete review -- admin
export const DeleteReviewByAdmiReducer = (
    state={
        loading : false,
        success : false, 
        error : null
    }, 
    action) =>{

    switch(action.type){
        case DELETE_REVIEW_REQUEST :
            return{
                ...state,
                loading : false
            }
            case DELETE_REVIEW_SUCCESS :
            return{
                ...state,
                loading : false,
                success : true
            }
            case DELETE_REVIEW_FAIL :
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
            default : return state 
    }
}