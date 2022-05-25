
import { useEffect, useState } from "react"
import { useAlert } from "react-alert"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import MetaData from "../../../component/layout/metadata/MetaData"
import { resetPasswordAction } from "../../../redux/actions/userActions"

const ResetPassword = ({history}) => {

    const dispatch = useDispatch()
    const {error,loading, success} = useSelector(state=>state.resetPassword)
    const {token }= useParams()

    const alert = useAlert()

    const [passwords, setPasswords] = useState({
        newPassword:"",
        newConfirmPassword:"",
        resetToken: token
    })

    const formSubmitHandler = (e)=>{
        e.preventDefault()
        if(passwords.newPassword && passwords.newConfirmPassword){
            if(passwords.newPassword === passwords.newConfirmPassword){
                dispatch(resetPasswordAction(passwords))
            }
            else{
            alert.error("New Password and New Confirm Password does not match !", {position:"top right"})
            }
        }
        else{
            alert.error("All fields are required !", {position:"top right"})
            
        }
    }

    useEffect(()=>{
        if(loading){
            alert.show("Loading...",{position:"top right"})
        }
        if(success){
            alert.success("Password reset successfully !",{position:"middle"})
        }
        if(error){
            alert.error(error)
        }
    },[loading, error, success, alert])

   const changeUserDetailsHandle = (e) =>{
    const {name, value} = e.target
    setPasswords({...passwords, [name] : value})
    }
    return (
        <>
            <MetaData title={`RECOVER PASSWOR : ECOMMERCE`} />
            <form onSubmit={formSubmitHandler} style={{ maxWidth: "500px", width: "100%", margin: "0 auto", minHeight: "85vh" }}>
                <h2 style={{ width: "max-content", textAlign: "center", margin: "1rem auto" }}>Recover Password</h2>
                <div className="form-group">
                    <label htmlFor="newPassword" className="px-3 py-2 mb-1" style={{ backgroundColor: "rgb(230, 229, 229", width: "100%", borderRadius: "3px" }}>New Password</label>
                    <input type="password" name="newPassword" defaultValue={passwords.newPassword} onChange={(e) => changeUserDetailsHandle(e)} placeholder="Enter Your New Password..." className="form-control" id="newPassword" />
                </div>

                <div className="form-group">
                    <label htmlFor="newConfirmPassword" className="px-3 py-2 mb-1" style={{ backgroundColor: "rgb(230, 229, 229", width: "100%", borderRadius: "3px" }}>New Confirm Password</label>
                    <input type="password" name="newConfirmPassword" defaultValue={passwords.newConfirmPassword} onChange={(e) => changeUserDetailsHandle(e)} placeholder="Re-Enter Your New Password..." className="form-control" id="newConfirmPassword" />
                </div>

                <input style={{ width: "100%" }} type="submit" className="btn btn-primary px-3 mt-3 mb-5" value="Submit" />
            </form>
        </>
    );
}
export default ResetPassword;