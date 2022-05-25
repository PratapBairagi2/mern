import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { passwordUpdateAction } from "../../../redux/actions/userActions";
import { useAlert } from "react-alert";
import MetaData from "../../../component/layout/metadata/MetaData"

const ChangePassword = ({history}) => {

    const {user, isAuthenticated} = useSelector(state=>state.userRegister)
    const {loading, error, success} = useSelector(state=>state.changePassword)


    const dispatch = useDispatch()
    const alert = useAlert()

    const [passwords, setPasswords] = useState({
        oldPassword :"", 
        newPassword :"", 
        newConfirmPassword : ""
    })

    const formSubmitHandler = (e) => {
        e.preventDefault()
        if(passwords.newPassword && passwords.newConfirmPassword){
            if(passwords.newPassword === passwords.newConfirmPassword){
                dispatch(passwordUpdateAction(passwords))
            }
            else{
            alert.error("New Password and new Confirm Password does not match !", {position:"top right"})
            }
        }else{
            alert.error("All fields are required !", {position:"top right"})
        }

    }

    const changeUserDetailsHandle = (e) => {
        const {name, value} = e.target
        setPasswords({...passwords, [name]: value})
    }

    useEffect(()=>{
      
        if(error){
            alert.error(error)
        }
        
    },[loading, error, success, isAuthenticated, dispatch, alert])
    
    return (
        <>
        {isAuthenticated && user &&
        <>  
        <MetaData title={`${user.name} UPDATE YOUR PROFILE : ECOMMERCE`}/>
            <form onSubmit={formSubmitHandler} style={{ maxWidth: "500px", width: "100%", margin: "0 auto", minHeight:"85vh" }}>
                    <h2 style={{width:"max-content", textAlign:"center", margin:"1rem auto"}}>Change Password</h2>
                <div className="form-group">
                    <label htmlFor="registerName" className="px-3 py-2 mb-1" style={{ backgroundColor: "rgb(230, 229, 229", width: "100%", borderRadius: "3px" }}>Old Password</label>
                    <input type="password" name="oldPassword" defaultValue={passwords.oldPassword} onChange={(e) => changeUserDetailsHandle(e)} placeholder="Enter Old Password..." className="form-control" id="changeOldPassword" />
                </div>

                <div className="form-group mt-4">
                    <label htmlFor="registerEmail" className="px-3 py-2 mb-1" style={{ backgroundColor: "rgb(230, 229, 229", width: "100%", borderRadius: "3px" }}>New Password</label>
                    <input type="password" name="newPassword" defaultValue={passwords.newPassword} onChange={(e) => changeUserDetailsHandle(e)} placeholder="Enter New Password..." className="form-control" id="changeNewPassword" />
                </div>

                <div className="form-group mt-2">
                    <label htmlFor="registerEmail" className="px-3 py-2 mb-1" style={{ backgroundColor: "rgb(230, 229, 229", width: "100%", borderRadius: "3px" }}>New Confirm Password</label>
                    <input type="password" name="newConfirmPassword" defaultValue={passwords.newConfirmPassword} onChange={(e) => changeUserDetailsHandle(e)} placeholder="Re-Enter New Password..." className="form-control" id="changenewConfirmPassword" />
                </div>

                <input style={{ width: "100%" }} type="submit" className="btn btn-primary px-3 mt-3 mb-5" value="Submit" />
            </form>
        </>
        }
        </>
    );
}
export default ChangePassword;