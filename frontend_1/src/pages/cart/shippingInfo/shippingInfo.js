import { Country, State, City } from "country-state-city"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { shippingAddressAction } from "../../../redux/actions/cartAction"
import { useHistory } from "react-router-dom"
import ProgressStep from "../progressStep/ProgressStep"
import "./shippingInfo.css"

const ShippingInfo = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    // const shippingDetailsResponse = useSelector(state => state.cart)

    const storedShippingInfo = localStorage.getItem("shippingInfo")


    const [shippingInfo, setShippingInfo] = useState({
        name:"",
        address: "",
        country: "",
        state: "",
        city: "",
        pinCode: "",
        phone: ""
    })


    const sumitShippingInfoFun = (e) => {
        e.preventDefault()
        dispatch(shippingAddressAction(shippingInfo))

        if(shippingInfo.address && shippingInfo.city && shippingInfo.country && shippingInfo.phone && shippingInfo.pinCode && shippingInfo.state){
            history.push("/order/confirm")
        }
    }

    const infoChangeHandler = (e) => {
        const { name, value } = e.target

        setShippingInfo({
            ...shippingInfo,
            [name]: value
        })
    }

    useEffect(()=>{
        if(storedShippingInfo){
            setShippingInfo(JSON.parse(storedShippingInfo))
        }
    },[storedShippingInfo])


    return (
        <>
            <div className="shippingInfo_mainContainer" >
                <div className="shippingInfo_innerContainer" >
                    <div className=" shippingInfo_formContainer">

                        <ProgressStep step={1}/>

                        <h3 className="shippingInfo_heading">Shipping Address</h3>

                        <form onSubmit={sumitShippingInfoFun} className="shippingInfoForm" action="">

                            <input onChange={(e) => infoChangeHandler(e)} defaultValue={shippingInfo.name} name="name" type="text" placeholder="Enter your Full Name..." id="" />

                            <input onChange={(e) => infoChangeHandler(e)} defaultValue={shippingInfo.address} name="address" className="my-1" type="text" placeholder="Enter your full address..." id="" />

                            <input type="text" onChange={(e) => infoChangeHandler(e)} defaultValue={shippingInfo.city} name="city" placeholder="Enter your city name..." />

                            <input onChange={(e) => infoChangeHandler(e)} defaultValue={shippingInfo.phone} name="phone" className="my-1" type="number" placeholder="Enter your active number..." id="" />

                            <input onChange={(e) => infoChangeHandler(e)} defaultValue={shippingInfo.pinCode} name="pinCode" className="my-1" type="number" placeholder="Enter your pincode..." id="" />

                            <select onChange={(e) => infoChangeHandler(e)} defaultValue={shippingInfo.country} name="country" id="selectedValue">
                                <option value="">Selecet Country</option>
                                {Country.getAllCountries().map(c => {
                                    return <option key={c.isoCode} value={c.isoCode}>
                                        {c.name}
                                    </option>
                                })}
                            </select>

                            <select onChange={(e) => infoChangeHandler(e)} defaultValue={shippingInfo.state} name="state"  >
                                <option value="">{ }Select State</option>
                                {shippingInfo.country &&
                                    State && State.getStatesOfCountry(shippingInfo.country).map(s => {
                                        return <option key={s.isoCode} value={s.isoCode}>
                                            {s.name}
                                        </option>
                                    })}
                            </select>

                            <input className="submitAddressBtn" type="submit" value="Submit" />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
export default ShippingInfo;