import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../redux/actions/userActions";
import {useAlert} from "react-alert"
import { NavLink } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const LoginUser = () => {
    // const navigate = useNavigate()
    const alert = useAlert()

    const dispatch = useDispatch()
    const {error, loading, success, loggedUserCall, loginUserCall, isAuthenticated, user} = useSelector(user=>user.userRegister)
    const [loginUserDetails, setLoginUserDetails] = useState({
        email:"",
        password:""
    })


    const loginUserInputHandler = (e) => {
        const {name, value} = e.target
        setLoginUserDetails({...loginUserDetails, [name]: value})
    }

    const loginUserDetailsSubmit = (e) => {
        e.preventDefault()
        dispatch(loginUser(loginUserDetails))
    }

    useEffect(()=>{
        if(loginUserCall){
        if(error){
            alert.error(error,{position:"top right",offset:"5"})
        }
    }

    if(success){
            alert.success(`${user.name} : Logged In Successful !`, {position:"top right"})
            // navigate("/dashboard")
        }
    
    },[error, user, isAuthenticated, loginUserCall, loggedUserCall, success])

    return (
    <>
        <form onSubmit={loginUserDetailsSubmit} style={{maxWidth:"500px", margin:"0 auto"}}>
            <div className="form-group">
                <label className="px-3 py-2 mb-1" style={{backgroundColor:"rgb(230, 229, 229", width :"100%", borderRadius:"3px"}} htmlFor="loginEmail">Email</label>
                <input name="email" defaultValue={loginUserDetails.email} onChange={(e)=>loginUserInputHandler(e)} type="text px-5 -y2" placeholder="Enter Registered Email..." className="form-control" id="loginEmail" />
            </div>

            <div className="form-group mt-3">
                <label className="px-3 py-2 mb-1" style={{backgroundColor:"rgb(230, 229, 229", width :"100%", borderRadius:"3px"}} htmlFor="loginPassword">Password</label>
                <input name="password" defaultValue={loginUserDetails.password} onChange={(e)=>loginUserInputHandler(e)} type="password px-5 -y2" placeholder="Enter Password..." className="form-control" id="loginPassword" />
            <div className="invalid-feedback">Invalid Email Or Password</div>
            </div>

        <div className="form-group d-flex justify-content-between mt-3">
        <NavLink to="/password/forgot" className="btn text-decoration-underline px-3"> Forget Password</NavLink>
        <input className="btn btn-primary px-4" value="Login" type="submit"/>
        </div>

            
        </form>
    </>
    );
}
export default LoginUser;