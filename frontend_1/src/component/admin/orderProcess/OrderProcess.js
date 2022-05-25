import { useState, useEffect } from "react"
import { useAlert } from "react-alert"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { adminOrderStatusChangeAction, cleareError, getAdminOrderPreviewAction, getAdminOrdersAction, reset_success } from "../../../redux/actions/orderAction"

const Orderprocess = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const alert = useAlert()
    const history = useHistory()
    const { loading: adminOrderLoading, success: adminOrderSuccess, error: adminOrderError, order } = useSelector(state => state.getAdminOrder)

    const {  success, error } = useSelector(state => state.orderStatus)

    // get admin order
    useEffect(() => {
        dispatch(getAdminOrderPreviewAction(id))
    }, [dispatch, success, error, id])

    

    useEffect(() => {
        if (success) {
            alert.success("Order status changes successfully !")
            dispatch(reset_success())
            history.push("/admin")
        }
        if (error) {
            alert.error(error)
            dispatch(cleareError())
            dispatch(getAdminOrdersAction())
        }

    }, [success, error, alert, dispatch, history])


    useEffect(() => {
        // if(adminOrderSuccess && !adminOrderLoading){
        //     dispatch(reset_success())
        // }
        if (adminOrderError) {
            alert.error(adminOrderError)
            dispatch(cleareError())
        }
    }, [adminOrderSuccess, adminOrderError, adminOrderLoading, alert, dispatch])


    const [orderStatus, setOrderStatus] = useState("processing")

    //  change order statu handler 
    const changeStatusHandler = (e) => {
        console.log(e.target.value)
        setOrderStatus(e.target.value)
    }

    

    //  submin status 
    const submitOrderStatus = () => {
        if (order.orderStatus !== "delivered") {
            dispatch(adminOrderStatusChangeAction(id, orderStatus))
        }
        else {
            alert.show(" Already delivered this order !")
        }
    }

    //  change order status
    useEffect(()=>{
            setOrderStatus(order.orderStatus)
    },[order])

    return (
        <>
            <div className="orderConfirm_mainContainer">
                <div className="orderConfirm_mainRow">
                    <div className="col col-lg-8 col-12 orderConfirm_mainCol1">

                        <div className="col col-12 orderConfirm_mainCol1_shippingInfoContainer">
                            <div className="orderConfirm_shippingInfo_Heading">Shipping Info</div>
                            {adminOrderSuccess &&
                                <div className="row d-flex flex-column" style={{ padding: "1% 1%" }}>
                                    <div>name : {order.shippingAddress.name}</div>
                                    {/* <div>Phone no. {shippingIfo.phone}</div> */}
                                    <div>Address : {order.shippingAddress.address}, {order.shippingAddress.city} , {order.shippingAddress.pinCode} , {order.shippingAddress.state} , {order.shippingAddress.country}</div>
                                </div>
                            }
                        </div>

                        <div className="col" style={{ padding: "1% 0" }}>
                            <div className="orderConfirm_shippingInfo_Heading">Payment Info</div>
                            <div style={{ display: "flex", padding: "0 1%" }}>
                                <div style={{ fontSize: "90%", color: "grey", fontWeight: "500", minWidth: "5rem", }}>Paid Amount</div>
                                <div style={{ marginLeft: "2%", minWidth: "5.5rem" }}>₹{order.totalPrice}</div>
                            </div>
                            <div style={{ display: "flex", padding: "0 1%" }}>
                                <div style={{ fontSize: "90%", color: "grey", fontWeight: "500", minWidth: "5rem" }}>Paid At</div>
                                <div style={{ marginLeft: "2%" }}>{new Date(order.paidAt).toLocaleString()}</div>
                            </div>
                        </div>

                        <div className="col" style={{ borderBottom: "1px solid grey", padding: "1% 0" }}>
                            <div className="orderConfirm_shippingInfo_Heading">Order Status</div>
                            <div style={{ display: "flex", padding: "0 1%" }}>
                                <div style={{ fontSize: "90%", color: "grey", fontWeight: "500", minWidth: "5rem" }}>Status</div>
                                <div style={{ marginLeft: "2%" }}>{order.orderStatus}</div>
                            </div>
                            <div style={{ display: "flex", padding: "0 1%" }}>
                                <div style={{ fontSize: "90%", color: "grey", fontWeight: "500", minWidth: "5rem" }}>Created At</div>
                                <div style={{ marginLeft: "2%" }}>{new Date(order.createdAt).toLocaleString()}</div>
                            </div>
                        </div>

                        <div className="col col-12 orderConfirm_mainCol1_orderItemsContainer">
                            <div className="orderConfirm_orderItemsHeading">Order Items</div>

                            {adminOrderSuccess && order.orderItems.map((i) => {


                                return <div key={i.product} style={{ display: "flex", flexDirection: "row", marginTop: "1%", boxShadow: "0 0 2px grey" }}>
                                    <div className="col col-2" style={{ display: "grid", placeItems: "center", padding: "1% 0" }}>
                                        <img style={{ width: "60%", minWidth: "2.5rem" }} src={i.image} alt={i.name} />
                                    </div>
                                    <div className="col col-5" style={{ textAlign: "right", fontWeight: "500", color: "tomato", display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}>{i.name}</div>
                                    <div className="col col-5" style={{ textAlign: "right", fontWeight: "500", color: "tomato", display: "flex", alignItems: "flex-end", justifyContent: "flex-end", padding: "0 1%", flexWrap: "wrap" }}>
                                        <div style={{ width: "max-content", padding: "0 3px" }}>{i.quantity}</div>
                                        <div style={{ width: "max-content", padding: "0 3px" }}>X</div>
                                        <div style={{ width: "max-content", padding: "0 3px" }}>&#x20b9;{i.price}</div>
                                        <div style={{ width: "max-content", padding: "0 3px" }}>= &#x20b9;{i.quantity * i.price}</div>
                                    </div>
                                </div>
                            })}

                        </div>
                    </div>

                    <div className="col col-12 col-lg-4  orderConfirm_mainCol2">
                        <div className="orderConfirm_orderSummaryHeading" style={{ margin: "2% auto" }}>Order Status</div>
                        <div className="ordeConfirm_thirdContainer_inner" style={{ display: "flex", justifyContent: "center", borderTop: "1px solid grey" }}>
                            <select defaultChecked={orderStatus} onChange={changeStatusHandler} style={{ margin: "5% 0", padding: "2px 5px", outline: "none" }}>
                                <option value="">Choose Status</option>
                                {orderStatus === "processing" &&
                                    <option value="shipped">Shipped</option>
                                }
                                {orderStatus === "shipped" &&
                                    <option value="delivered">Delivered</option>
                                }

                            </select>
                        </div>


                        <button style={{ background: `${order.orderStatus === "delivered" ? "grey" : "tomato"}` }} disabled={order.orderStatus === "delivered" ? true : false} className="orderConfirm_paymentProceed_btn" onClick={submitOrderStatus}>Submit</button>

                    </div>


                </div>
            </div>
        </>
    );
}
export default Orderprocess;