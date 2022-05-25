import { useEffect, useRef } from "react";
// import ProgressStep from "../progressStep/ProgressStep";
import "./paymentProcess.css"
import {CardNumberElement, CardExpiryElement, CardCvcElement, useElements, useStripe} from "@stripe/react-stripe-js"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useAlert } from "react-alert";
// import Loader from "../../../component/loader/Loader";
import { orederCreateAction } from "../../../redux/actions/orderAction";
import { useHistory } from "react-router-dom";
const PaymentProcess = () => {


    const payBtn = useRef(null)
    const elements = useElements()
    const stripe = useStripe()
    const alert = useAlert()
    const {user} = useSelector(state=>state.userRegister)
    const {shippingInfo} = useSelector(state=>state.cart)
    const dispatch = useDispatch()
    const history = useHistory()
    const { error, success, loading} = useSelector(state=> state.order)

   


    let totalAmount = 0
    const storedItems = sessionStorage.getItem("orderItems")

    storedItems && JSON.parse(storedItems).map(v=> totalAmount+=+ (v.quantity*v.price))


    const newOrder = {
        shippingAddress : shippingInfo,
        orderItems : storedItems && JSON.parse(storedItems),
        paymentInfo:"",
        itemPrice : storedItems && totalAmount,
        taxPrice : storedItems && Number((totalAmount/100)*18),
        shippingPrice: storedItems && totalAmount > 1000 ? 0 : 100,
        totalPrice: storedItems && Number(((totalAmount/100)*18) + (totalAmount) + (totalAmount > 1000 ? 0 : 100)) 
    }

    useEffect(()=>{
        if(loading){
            
        }
        if(success){
            history.push("/payment/success")
        }
        if(error){

        }
    },[error,dispatch, success, loading,history])


    const submitPayment = async (e) =>{
        const paymentData = {
            amount : (((totalAmount/100)*18)+totalAmount)*100
        }
                e.preventDefault()
        try {
            const config ={
                headers :{ "Content-Type":"application/json" }
            }
            const {data} = await axios.post("/api/payment/process", paymentData, config)

            const client_secret = data.client_secret

            if(!elements || !stripe){
                payBtn.current.disabled = false
                payBtn.current.style.background = "tomato"
                alert.error("Something went wrong while processing payment !")
            }else{
                // client_secret rec karne ke baad
                // elements or stripe success hone ke baad
                // usi received client_secret ke sath
                // card payment ko confirm karenge stripe ke help se
                const result = await stripe.confirmCardPayment(client_secret,{
                    payment_method:{
                        card : elements.getElement(CardNumberElement),
                        billing_details:{
                            name:user.name,
                            email:user.email,
                            phone:user.phone,
                            address:{
                                line1:shippingInfo.address,
                                city:shippingInfo.city,
                                state:shippingInfo.state,
                                postal_code:shippingInfo.pinCode,
                                country: shippingInfo.country
                            }
                        }
                    }
                })
               
                if(result.error){
                    payBtn.current.disabled = false
                payBtn.current.style.background = "tomato"
                alert.error("Something went wrong while processing payment !")
                }
               

                if(result.paymentIntent.status==="succeeded"){

                    newOrder.paymentInfo = {
                        id : result.paymentIntent.id,
                        status: result.paymentIntent.status
                    }

                    dispatch(orederCreateAction(newOrder))

                    payBtn.current.disabled = true
                payBtn.current.style.background = "grey"
                alert.success("Payment successfull !")
                
                }
                else{
                    payBtn.current.disabled = false
                payBtn.current.style.background = "tomato"
                alert.success("Something went wrong while payment process !")
                }
            }
        } catch (error) {
            payBtn.current.disabled = false
            payBtn.current.style.background = "tomato"
            alert.error(error)
        }
     
    }

    return (
        <>
            <div className="containair-fluid p-0" style={{ minHeight: "85vh", marginTop:"10vh" }} >
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"  }}>
                    <div className="col d-flex flex-columnl" style={{ width: "100%", maxWidth: "900px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "5% 2%" }}>

                        {/* <ProgressStep step={3}/> */}

                        <h4 style={{ marginTop: "7%", borderBottom:"2px solid tomato", padding:"2px 4px" }}>Card Info</h4>

                        <form onSubmit={submitPayment} className="d-flex flex-column" style={{ padding: "1% 4%", width:"100%", maxWidth:"300px" }} action="">

                            <div style={{width:"100%",  border:"1px solid grey", borderRadius:"4px",  marginTop:"2%", display:"flex", padding:"1%"}}>
                            <svg width="2.2rem" fill="tomato" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path d="M148 288h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm108-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 96v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96-260v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"/>
                            </svg>
                                <CardNumberElement className="CardNumberElement"/>
                            </div>

                            <div style={{width:"100%" , border:"1px solid grey", borderRadius:"4px",  marginTop:"2%", display:"flex", padding:"1%"}}>
                            <svg width="2.3rem" fill="tomato" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                <path d="M272 256h91.36c43.2 0 82-32.2 84.51-75.34a79.82 79.82 0 0 0-25.26-63.07 79.81 79.81 0 0 0 9.06-44.91C427.9 30.57 389.3 0 347 0h-75a16 16 0 0 0-16 16v224a16 16 0 0 0 16 16zm40-200h40a24 24 0 0 1 0 48h-40zm0 96h56a24 24 0 0 1 0 48h-56zM155.12 22.25A32 32 0 0 0 124.64 0H99.36a32 32 0 0 0-30.48 22.25L.59 235.73A16 16 0 0 0 16 256h24.93a16 16 0 0 0 15.42-11.73L68.29 208h87.42l11.94 36.27A16 16 0 0 0 183.07 256H208a16 16 0 0 0 15.42-20.27zM89.37 144L112 75.3l22.63 68.7zm482 132.48l-45.21-45.3a15.88 15.88 0 0 0-22.59 0l-151.5 151.5-55.41-55.5a15.88 15.88 0 0 0-22.59 0l-45.3 45.3a16 16 0 0 0 0 22.59l112 112.21a15.89 15.89 0 0 0 22.6 0l208-208.21a16 16 0 0 0-.02-22.59z"/>
                            </svg>
                                <CardExpiryElement className="CardExpiryElement" />
                            </div>

                            <div style={{width:"100%",  border:"1px solid grey", borderRadius:"4px",  marginTop:"2%", display:"flex", padding:"1%"}}>
                            <svg width="2.5rem" fill="tomato" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                <path d="M0 432c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V256H0v176zm192-68c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H204c-6.6 0-12-5.4-12-12v-40zm-128 0c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM576 80v48H0V80c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48z"/>
                            </svg>
                                <CardCvcElement className="CardCvcElement" />
                            </div>

                            <input 
                            type="submit" 
                            value={`Pay ₹${((totalAmount/100)*18)+totalAmount}`}

                            ref={payBtn}
                            style={{ marginTop: "3%", padding: "1% 1%", background: "tomato", border: "none", color: "white", borderRadius:"4px" }} 
                             />
                        </form>
                    </div>
                </div>
            </div>
        </>


    );
}
export default PaymentProcess;