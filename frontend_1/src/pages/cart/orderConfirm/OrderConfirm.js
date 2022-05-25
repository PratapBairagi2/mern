
// import order from "./rani.jpg"
import { useEffect, useState } from "react"
// import { useSelector } from "react-redux"
import ProgressStep from "../progressStep/ProgressStep"
import { useHistory } from "react-router-dom"
import "./orderConfirm.css"

const OrderConfirm = () => {

    // const response = useSelector(state=>state.cart)
    const history = useHistory()
    // const storedCartItems = localStorage.getItem("cartItems")
    const storedOrderItems = sessionStorage.getItem("orderItems")

    const storedShippingInfo = localStorage.getItem("shippingInfo")
    // const [saveOrderItems, setSaveOrderItems] = useState([])
    


    // const [orderItems, setCartItems] = useState([])
    const [orderItems, setOrderItems] = useState([])

    const [shippingIfo, setShippingInfo] = useState({})

    var [subTotal, setSubTotal] = useState(0)

    useEffect(() => {
        if (storedOrderItems) {
            // storing local storage items to a state
            setOrderItems(JSON.parse(storedOrderItems))

            // calculating saub total of all items
            var sub = 0
            JSON.parse(storedOrderItems).map(i=> sub += +(i.price * i.quantity)) 
            setSubTotal(sub)
        }
    }, [storedOrderItems])

    useEffect( () => {
        if (storedShippingInfo) {
            setShippingInfo(JSON.parse(storedShippingInfo))
        }

        // if(storedOrderItems){

        //     let orderItems = JSON.parse(storedOrderItems)
            
        //   const newArray =  orderItems.map(({category, stock, ...rest})=>{
        //        return rest
        //     })
        //     setSaveOrderItems(newArray)
        // }
        
    }, [storedShippingInfo])
    

    // go to payment process page fun
    const goToPaymentProcessFun = async () =>{
        // sessionStorage.setItem("orderItems", JSON.stringify(saveOrderItems))
        history.push("/payment/process")
    }


    return (
        <>
            <div className="orderConfirm_mainContainer">
                    <ProgressStep step={2}/>
                <div className="orderConfirm_mainRow">
                    <div className="col col-lg-8 col-12 orderConfirm_mainCol1">

                        <div className="col col-12 orderConfirm_mainCol1_shippingInfoContainer">
                            <div className="orderConfirm_shippingInfo_Heading">Shipping Info</div>
                            {shippingIfo &&
                                <div className="row d-flex flex-column" style={{ padding: "1% 1%" }}>
                                    <div>name : {shippingIfo.name}</div>
                                    <div>Phone no. {shippingIfo.phone}</div>
                                    <div>Address : {shippingIfo.address}, {shippingIfo.city} , {shippingIfo.pinCode} , {shippingIfo.state} , {shippingIfo.country}</div>
                                </div>
                            }
                        </div>

                        <div className="col col-12 orderConfirm_mainCol1_orderItemsContainer">
                            <div className="orderConfirm_orderItemsHeading">Order Items</div>

                            {orderItems && orderItems.map((i) => {


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
                        <div className="orderConfirm_orderSummaryHeading">Order Summary</div>
                        <div className="ordeConfirm_thirdContainer_inner">
                            <div style={{ display: "flex" }}>
                                <div className="col-6" style={{ fontWeight: "400" }}>Sub Total</div>
                                <div className="col-6" style={{ textAlign: "right" }}>&#x20b9;{subTotal}</div>
                            </div>

                            <div>
                                <div style={{ display: "flex" }}>
                                    <div className="col-6 " style={{ fontWeight: "400" }}>Shipping Cahrge</div>
                                    <div className="col-6" style={{ textAlign: "right" }}>&#x20b9;{subTotal>999 ? 0 : 100}</div>
                                </div>
                            </div>

                            <div>
                                <div style={{ display: "flex" }}>
                                    <div className="col-6" style={{ fontWeight: "400" }}>GST</div>
                                    <div className="col-6" style={{ textAlign: "right" }}>&#x20b9;{(subTotal/100)*18}</div>
                                </div>
                            </div>
                        </div>

                        <div className="orderConfirm_totalAmoutContainer">
                            <div className="col-6" style={{ fontWeight: "600" }}>total</div>
                            <div className="col-6" style={{ textAlign: "right" }}>&#x20b9;{subTotal>999? (subTotal)+((subTotal/100)*18) : (100+subTotal)+((subTotal/100)*18)}</div>
                        </div>

                        <button className="orderConfirm_paymentProceed_btn" onClick={goToPaymentProcessFun}>Proceed To Payment</button>

                    </div>


                </div>
            </div>
        </>
    );
}
export default OrderConfirm;