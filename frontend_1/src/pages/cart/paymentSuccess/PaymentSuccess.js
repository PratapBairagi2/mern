import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { removeFromCartAction } from "../../../redux/actions/cartAction"

export const PaymentSuccess = () =>{
    // const {order, success, error} = useSelector(state=>state.order)
    // const storedCartItems = localStorage.getItem("cartItems")
    // console.log(order)

    // useEffect(async()=>{
    //     if(order){
    //         if(storedCartItems){
    //            const restCartItemsm = await JSON.parse(storedCartItems).filter(i=>{

    //            })
    //         }
    //     }
    // },[order, storedCartItems])

    return(
        <>
            <div className="container-fluid" style={{minHeight:"93.5vh",width:"100%"}}>
                <div style={{width:"100%",minHeight:"85vh", height:"100%", display:"grid", placeItems:"center", placeSelf:"center"}}>
                    <div className="col col-xl-4 col-md-8 col-12" style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                        <div style={{width:"max-content", fontSize:"150%", fontWeight:"800", color:"green"}}>Payment Successfull</div>
                        <NavLink to="/orders" style={{width:"max-content", padding:"1% 4%", border:"none", background:"grey", color:"white",fontSize:"110%",fontWeight:"600",marginTop:"1%", textDecoration:"none"}}>View Order</NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}