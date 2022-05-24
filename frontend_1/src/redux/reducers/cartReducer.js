import { ADD_ITEMS_TO_CART_FAIL, ADD_ITEMS_TO_CART_REQUEST, ADD_ITEMS_TO_CART_SUCCESS, CART_QUANTITY_CHANGE_FAIL, CART_QUANTITY_CHANGE_REQUEST, CART_QUANTITY_CHANGE_SUCCESS, REMOVE_FROM_CART_FAIL, REMOVE_FROM_CART_REQUEST, REMOVE_FROM_CART_SUCCESS, SHIPPING_ADDRESS_ADD_FAIL, SHIPPING_ADDRESS_ADD_REQUEST, SHIPPING_ADDRESS_ADD_SUCCESS } from "../types/cartTypes";
import { CLEAR_ERROR } from "../types/userTypes";


export const AddItemsToCartReducer = (
    state={
        loading: false,
        success : false,
        error : null,
        cartItems:[],
        shippingInfo:{},
        quantity: 0
    }, action) =>{

        if(state.success){
            setTimeout(()=>{
                state.success = false
            },500)
        }

    switch(action.type){

        case ADD_ITEMS_TO_CART_REQUEST :
            return{
                ...state,
                loading: true,
            }

            case ADD_ITEMS_TO_CART_SUCCESS :

        const isItemExist = state.cartItems.find((itm)=>{
           return itm.product === action.payload.product
        })

        if(isItemExist){

            return{
                loading: false,
                success : true,
                cartItems : state.cartItems.map((itm)=>{
                    return itm.product === action.payload.product ? action.payload : itm
                })
            }

        }else{
            return{
                ...state,
                cartItems : [...state.cartItems, action.payload ],
                loading: false,
                success : true,
            }
        }

            case ADD_ITEMS_TO_CART_FAIL :
            return{
                error : action.payload,
            }

        case REMOVE_FROM_CART_REQUEST :
            return{
                ...state,
                loading : true,
            }
        case REMOVE_FROM_CART_SUCCESS :
            return{
                loading :false,
                success : true,
                // quantity : state.quantity - state.cartItems.filter(v=>v.productId===action.payload).quantity,
                cartItems :state.cartItems.filter(item=>{
                    return item.product !== action.payload
                })

            }
        case REMOVE_FROM_CART_FAIL :
            return{
                error : action.payload,
            }

        case CART_QUANTITY_CHANGE_REQUEST :
            return{
                ...state,
                loading : true,
            }
        case CART_QUANTITY_CHANGE_SUCCESS :
            return{
                loading : false,
                success : true,
                cartItems : state.cartItems.map(item=>{
                    return item.product === action.payload.id ? {...item, quantity: item.quantity+= +action.payload.quantity} : item
                })
            }
        case CART_QUANTITY_CHANGE_FAIL :
            return{
                error : action.payload,
            }

        case SHIPPING_ADDRESS_ADD_REQUEST :
            return{
                ...state,
                loading : true,
            }
        case SHIPPING_ADDRESS_ADD_SUCCESS :
            return{
                loading : false,
                success : true,
                shippingInfo : action.payload

            }
        case SHIPPING_ADDRESS_ADD_FAIL :
            return{
                error : action.payload,
                success : false,
            }

            case CLEAR_ERROR :
                return{
                    error : null
                }
            default :
            return state
    }
}