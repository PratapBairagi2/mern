import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../../../component/loader/Loader";
import { orderPreviewAction } from "../../../redux/actions/orderAction";
import im from "./rani.jpg"

const OrderPreview = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const {order, loading, success} = useSelector(state=>state.orderPreview)  

    useEffect(()=>{
        if(id){
        dispatch(orderPreviewAction(id))
        }
    },[id])

    console.log(order)

    return (

    <>
    {loading ? <Loader/> : 
       success && <div className="container-fluid">
            <div style={{display:"flex", flexDirection:"column", padding:"2% 4%", maxWidth:"700px", margin:"0 auto"}}>
                                <div style={{width:"max-content", margin:"0 auto", fontSize:"140%", borderBottom:"2px solid grey", fontWeight:"700"}}>Order Preview</div>
                <div style={{color:"red", fontWeight:"600", fontSize:"120%", wordBreak:"break-all",  padding:"0"}}>#{order._id}</div>

                <div className="col" style={{borderBottom:"1px solid grey", padding:"1% 0"}}>
                    <h4>Shipping Info</h4>
                    <div style={{display:"flex"}}>
                        <div style={{fontSize:"90%", color:"grey", fontWeight:"500", minWidth:"5rem"}}>Name</div>
                        <div style={{marginLeft:"2%"}}>{order.shippingAddress.name}</div>
                    </div>
                    <div style={{display:"flex"}}>
                        <div style={{fontSize:"90%", color:"grey", fontWeight:"500", minWidth:"5rem"}}>Phone</div>
                        <div style={{marginLeft:"2%"}}>8287889123</div>
                    </div>
                    <div style={{display:"flex"}}>
                        <div style={{fontSize:"90%", color:"grey", fontWeight:"500", minWidth:"5rem"}}>Address</div>
                        <div style={{marginLeft:"2%"}}>{order.shippingAddress.address},{order.shippingAddress.city},{order.shippingAddress.state},{order.shippingAddress.country},{order.shippingAddress.pinCode}</div>
                    </div>
                </div>
 
                <div className="col" style={{borderBottom:"1px solid grey", padding:"1% 0"}}>
                    <h4>Payment Info</h4>
                    <div style={{display:"flex"}}>
                        <div style={{fontSize:"90%", color:"grey", fontWeight:"500", minWidth:"5rem"}}>Paid Amount</div>
                        <div style={{marginLeft:"2%"}}>₹{order.totalPrice}</div>
                    </div>
                    <div style={{display:"flex"}}>
                        <div style={{fontSize:"90%", color:"grey", fontWeight:"500", minWidth:"5rem"}}>Paid At</div>
                        <div style={{marginLeft:"2%"}}>{new Date(order.paidAt).toLocaleString()}</div>
                    </div>
                </div>

                <div className="col" style={{borderBottom:"1px solid grey", padding:"1% 0"}}>
                <h4>Order Status</h4>
                    <div style={{display:"flex"}}>
                        <div style={{fontSize:"90%", color:"grey", fontWeight:"500", minWidth:"5rem"}}>Status</div>
                        <div style={{marginLeft:"2%"}}>{order.orderStatus}</div>
                    </div>
                    <div style={{display:"flex"}}>
                        <div style={{fontSize:"90%", color:"grey", fontWeight:"500", minWidth:"5rem"}}>Created At</div>
                        <div style={{marginLeft:"2%"}}>{new Date(order.createdAt).toLocaleString()}</div>
                    </div>
                </div>

                <div className="col" style={{borderBottom:"1px solid grey", padding:"1% 0"}}>
                <h4>Order Items</h4>
                    {order.orderItems.map((OI,i)=>{
                  return  <div key={OI._id} style={{display:"flex", flexWrap:"wrap", width:"100%", boxShadow:"0 0 1px grey", justifyContent:"space-around", alignItems:"center", marginTop:"1%", padding:"1% 0"}}>
                        
                        <div style={{display:"flex", width:"100%", justifyContent:"center", padding:"1%", minWidth:"220px"}}>
                            {/* <div style={{fontSize:"90%", color:"grey", fontWeight:"500", minWidth:"5rem"}}>Product</div> */}
                            <div style={{width:"max-content", borderBottom:"1px solid grey", borderTop:"1px solid grey", paddingBottom:".4%"}}>{OI.name}</div>
                        </div>
                        
                        <div style={{width:"auto", height:"100%", display:"grid", placeItems:"center",   padding:"1%"}}>
                            <img style={{width:"20%", maxWidth:"5rem", minWidth:"4rem"}} src={OI.image} alt="" />
                        </div>

                        <div style={{display:"flex", flexDirection:"column", padding:"1%"}}>

                        <div style={{display:"flex"}}>
                          <div style={{fontSize:"90%", color:"grey", fontWeight:"500", minWidth:"5rem"}}>Qty.</div>  
                          <div>{OI.quantity}</div>
                        </div>
                        <div style={{display:"flex"}}>
                          <div style={{fontSize:"90%", color:"grey", fontWeight:"500", minWidth:"5rem"}}>Price</div>  
                          <div>₹{OI.price}</div>
                        </div>
                        <div style={{display:"flex"}}>
                          <div style={{fontSize:"90%", color:"grey", fontWeight:"500", minWidth:"5rem"}}>Sub Total</div>
                          <div>₹{OI.price*OI.quantity}</div>
                        </div>
                        <div style={{display:"flex"}}>
                          <div style={{fontSize:"90%", color:"grey", fontWeight:"500", minWidth:"5rem"}}>Tax</div>  
                          <div>₹{((OI.price/100)*18)*OI.quantity}</div>
                        </div>
                        <div style={{display:"flex"}}>
                          <div style={{fontSize:"90%", color:"grey", fontWeight:"500", minWidth:"5rem"}}>Total</div>
                          <div>₹{(((OI.price/100)*18)+OI.price)*OI.quantity}</div>
                        </div>
                        </div>

                    </div>
                    })}

                </div>
            </div>

        </div>
        }
    </>
    );
}
export default OrderPreview;