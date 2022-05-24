import { useEffect, useState } from "react"
import { useAlert } from "react-alert"
import { useDispatch, useSelector } from "react-redux"
import MetaData from "../../../component/layout/metadata/MetaData"
import { forgotPasswordAction } from "../../../redux/actions/userActions"

const ForgotPassword = ({history}) => {

    const {error, success, loading} = useSelector(state=>state.forgotPassword)
    const dispatch = useDispatch()
    const alert = useAlert()

    const [email, setEmail] = useState("")
    console.log(window.location)

    const formSubmitHandler =(e)=>{
        e.preventDefault()
        if(email){
            dispatch(forgotPasswordAction(email,window.location.origin))
        }
        else{
            alert.error("email filed is required !", {position:"top right"})
        }
    }

    useEffect(()=>{
        if(loading){
            alert.show("loading...")
        }
        if(success){
            alert.success(`Recobery password mail sent to ${email} !`)
            // history.push("/password/reset/:token")
        }
        if(error){
            alert.error(error)
        }
    },[loading, error, success])

    const changeUserDetailsHandle = (e) =>{
        setEmail(e.target.value)
    }
    return (
        <>
            <MetaData title={`FORGOT PASSWORD : ECOMMERCE`} />
            <form onSubmit={formSubmitHandler} style={{ maxWidth: "500px", width: "100%", margin: "0 auto", minHeight: "85vh" }}>
                <h2 style={{ width: "max-content", textAlign: "center", margin: "1rem auto" }}>Forgot Password</h2>
                <div className="form-group">
                    <label htmlFor="forgotPassword" className="px-3 py-2 mb-1" style={{ backgroundColor: "rgb(230, 229, 229", width: "100%", borderRadius: "3px" }}>Registered Email</label>
                    <input type="email" name="oldPassword" defaultValue={email} onChange={(e) => changeUserDetailsHandle(e)} placeholder="Enter Your Registered Email..." className="form-control" id="forgotPassword" />
                </div>

                <input style={{ width: "100%" }} type="submit" className="btn btn-primary px-3 mt-3 mb-5" value="Submit" />
            </form>
        </>
    );
}
export default ForgotPassword;