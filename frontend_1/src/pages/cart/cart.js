import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartQuantityChangeAction, removeFromCartAction } from "../../redux/actions/cartAction";
import "./cart.css"
import {useAlert} from "react-alert"
import noCart from "./images/no_cart.svg"

const Cart = ({history}) => {
    const [subTotalPrice,setSubTotalPrice] = useState(0)
    const {cartItems} = useSelector(state=>state.cart)

    const dispatch = useDispatch()
    const alert = useAlert()

    console.log(cartItems)

    useEffect(()=>{
        if(cartItems){
        var cartTotal = 0
        cartItems.map(v=>{
            return cartTotal+=+(v.price*v.quantity)
        },[cartItems])
    }

        setSubTotalPrice(cartTotal)

    },[cartItems])

    const goToProductDetails = (id)=>{
        history.push(`/product/${id}`)
    }

    // remove item from cart
    const removeFromCartFun = (id)=>{
        dispatch(removeFromCartAction(id))
        if(id){
            alert.success("Item deleted from cart !",{position:"top right"})
        }
    }

    // quantity change
    const changeCartQuantityFun =(id, quantity)=>{
        dispatch(cartQuantityChangeAction(id,quantity))

        if(id && quantity){
            if(quantity === -1){
                alert.success("One quantity removed from cart !",{position:"top right"})
            }
            else{
                alert.success("One quantity added cart cart !",{position:"top right"})
            }
        }
    }

    
    const goToProductsPageFun = () =>{
        history.push("/products/")
    }

    // cart items set to order items
    const storedCartItems = localStorage.getItem("cartItems")
    const storedShippingInfo = localStorage.getItem("shippingInfo")
    const [saveOrderItems, setSaveOrderItems] = useState([])
    // const response = useSelector(state=>state.cart)
    // const [carItems, setCartItems] = useState([])

    useEffect(() => {
        if (storedCartItems) {
            // storing local storage items to a state
            setCartItems(JSON.parse(storedCartItems))

            // calculating saub total of all items
            // var sub = 0
            // JSON.parse(storedCartItems).map(i=> sub += +(i.price * i.quantity)) 
            // setSubTotal(sub)
        }
    }, [storedCartItems])

    useEffect( () => {
        // if (storedShippingInfo) {
        //     setShippingInfo(JSON.parse(storedShippingInfo))
        // }

        if(storedCartItems){

            let orderItems = JSON.parse(storedCartItems)
            
          const newArray =  orderItems.map(({category, stock, ...rest})=>{
               return rest
            })
            setSaveOrderItems(newArray)
        }
        
    }, [storedShippingInfo, storedCartItems])



    // set the proceed or nor proceed value
    const disabled = useRef(false)
    useEffect(()=>{
        cartItems.map(c=>{

        if(!(c.stock >= c.quantity)){
            disabled.current.disabled = true
            disabled.current.style.background = "grey"
            alert.error( ` Requested product ${c.name}  is not in available or out of stock, please remove ${c.name} from cart to proceed ! `)
        }
        else{
            disabled.current.style.background = "tomato"
            disabled.current.disabled = false
        }
    })

    },[cartItems])

    // go to shipping info fun
    const goToShippingInfoFun = () =>{
        sessionStorage.setItem("orderItems", JSON.stringify(saveOrderItems))
        history.push("/Shipping/info")
    }
    return(
        <div style={{marginTop:"15vh"}}>
        {cartItems && cartItems.length === 0 ?
        <div className="" style={{display:"flex", flexDirection:"column", alignItems:"center", minHeight:"85vh", justifyContent:"center"}}>
            <img style={{width:"6rem"}} src={noCart} alt="" />
            <h3 style={{width:"max-content", padding:"2px 6px", color:"red"}}>No Items</h3>
            <button onClick={goToProductsPageFun} style={{padding:"3px 12px", border:"none", background:"grey", color:"white", fontWeight:"600"}}>Add To Cart</button>
        </div>
        :
    
        <div className="container-fluid mt-4 my-5" style={{display:"flex", flexDirection:"column",alignItems:"center"}}>
            <div className="row" style={{maxWidth:"900px", width:"100%"}}>

                <div className="col col-6 p-0" style={{ paddingLeft:"2%"}}>
                    <div style={{ textAlign:"left", paddingLeft:"5%", width:"100%", fontWeight:"600", background:"tomato", color:"white"}}>Product</div>
                </div>

                <div className="col col-4 p-0" style={{fontWeight:"600", background:"tomato", color:"white"}}>
                <div style={{ textAlign:"center", width:"100%", paddingRight:"5%"}}>Quantity</div>
                </div>

                <div className="col col-2 p-0" style={{fontWeight:"600", background:"tomato", color:"white"}}>
                <div style={{ textAlign:"right", width:"100%", paddingRight:"8%"}}>Price</div>
                </div>
            </div>
            <div className="container-fuild p-1 px-2 cartItems_container"style={{display:"flex", flexDirection:"column",alignItems:"center", height:"max-content", width:"100%", height:"61.8vh", overflow:"auto"}} >
            {cartItems && 
           cartItems.map((item,i)=> { 
               return <div key={item.product} className="row p-1 my-2" style={{maxWidth:"900px", width:"100%", display:"flex", flexDirection:"row",height:"max-content", boxShadow:"0 0 2px grey"}}>

                <div className="col col-6 px-0 p-1 cartDetailSubContainer_col1">
                        <img onClick={()=>goToProductDetails(item.product)}  className="cartItemImage" src={item.image} alt="" />
                    <div className="cartDetailSubContainer">
                        <div className=" cartProductName">{item.name}</div>
                        <div className=" cartProductCategory">{item.category}</div>
                        <div className=" cartProductPrice">₹{item.price}</div>
                    </div>
                </div>

                <div className="col col-4 p-1 cartQuantitySubContainer_col2" style={{ textAlign:"right"}}>
                    <div className="cartQuantitySubContainer">
                        <div className="p-1 cartQuantitySubContainer_button_group">
                        <button onClick={()=> item.quantity > 1 && changeCartQuantityFun(item.product, -1)}>-</button>
                        <div className="cartQuantityField">{item.quantity}</div>
                        <button onClick={()=>changeCartQuantityFun(item.product, +1)}>+</button>
                        </div>
                        <div style={{ color:`${item.stock <= 0 ? "red" : "none"}`, fontSize:"90%", whiteSpace:"nowrap", padding:`${item.stock <= 0 ? "0 3px" : "none"}`, border:`${item.stock <= 0 ? "1px solid red" : "none"}`}}>{item.stock <= 0 && "out of stock "}</div>
                        <button className="removeFromCartBtn" onClick={()=>removeFromCartFun(item.product)} >Remove</button>
                    </div>
                </div>

                <div className="col col-2 p-0 cartTotalPriceSubContainer_col3">
                    <div className="cartTotalPriceSubContainer_col3_subTotal">₹{item.price*item.quantity}</div>
                </div>
            </div>
            })}
            </div>
            <div style={{ width:"100%", maxWidth:"900px", display:"flex", flexDirection:"column"}}>
                <div style={{width:"100%", padding:"4px 12px"}} >
                    <div style={{width:"100%", textAlign:"right", borderBottom:"2px solid rgb(255, 54, 19)", float:"right", padding:"3px 0", color:"tomato", fontWeight:"700"}}>₹{subTotalPrice}</div>
                </div>
                <div style={{width:"100%", padding:"4px 10px"}} >
                    <div style={{textAlign:"center", color:"red"}}>{cartItems.map(v=>v.stock <= 0 && "Remove out of stock item to proceed !")}</div>
                    <button ref={disabled}   onClick={()=>goToShippingInfoFun()} className="checkoutBtn">Checkout</button>
                </div>
            </div>
        </div>
        }
        </div>
    )
}
export default Cart;