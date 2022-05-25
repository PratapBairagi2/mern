
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerNewUser } from "../../../redux/actions/userActions";
import {useAlert} from "react-alert"
import deafultUserAvatar from "./user_green.png"


const RegisterUser = () => {
    const alert = useAlert()

    const dispatch = useDispatch()
    const {error, user, registerUserCall} = useSelector(userState => userState.userRegister)
    const [userAvatar, setUserAvatar] = useState(deafultUserAvatar)

    const [registerUser, setRegisterUser] = useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:"",
        avatar:""
    })

    const registerUserDetailhandler = (e) =>{
        const {name, value} = e.target

        if(name==="avatar"){

            const reader = new FileReader()

            reader.onload = () =>{
                if(reader.DONE){
                    setUserAvatar(reader.result)

                    setRegisterUser({...registerUser, avatar: reader.result  })
                }
            }
            
            reader.readAsDataURL(e.target.files[0]);
        }
        else{
        setRegisterUser({...registerUser, [name]: value})
        }
    }

    const registerNewUserHandler = (e) =>{
        e.preventDefault()
            dispatch(registerNewUser(registerUser))
    }

    useEffect(()=>{
        if(registerUserCall){
        if(error){
            alert.error(error,{position:"top right",offset:"5"})
        }

        if(user !== null && user !== undefined){
            alert.success(`${user.name} : Logged In Successful !`, {position:"top right"})
        }
    }
    },[error, user, alert, registerUserCall])

    return (
    <>
        <form onSubmit={registerNewUserHandler} style={{maxWidth:"500px", width:"100%", margin:"0 auto"}}>

            <div className="form-group">
                <label htmlFor="registerName" className="px-3 py-2 mb-1" style={{backgroundColor:"rgb(230, 229, 229", width :"100%", borderRadius:"3px"}}>Name</label>
                <input type="text" name="name" defaultValue={registerUser.name} onChange={(e)=>registerUserDetailhandler(e)} placeholder="Enter Your Name..."  className="form-control" id="registerName" />
            </div>

            <div className="form-group mt-3">
                <label htmlFor="registerEmail" className="px-3 py-2 mb-1" style={{backgroundColor:"rgb(230, 229, 229", width :"100%", borderRadius:"3px"}}>Email</label>
                <input type="email" name="email" defaultValue={registerUser.email} onChange={(e)=>registerUserDetailhandler(e)} placeholder="Enter Your Emai-ID..." className="form-control" id="registerEmail" />
            </div>

            <div className="form-group mt-3">
                <label htmlFor="registerPassword" className="px-3 py-2 mb-1" style={{backgroundColor:"rgb(230, 229, 229", width :"100%", borderRadius:"3px"}}>Password</label>
                <input type="password" name="password" defaultValue={registerUser.password} onChange={(e)=>registerUserDetailhandler(e)} placeholder="Create New Password..." className="form-control" id="registerPassword" />
            </div>

            <div className="form-group mt-4">
                <label className="px-3 py-2 mb-1" style={{backgroundColor:"rgb(230, 229, 229", width :"100%", borderRadius:"3px"}} htmlFor="registerConfirmPassword">Confirm Password</label>
                <input type="password" name="confirmPassword" defaultValue={registerUser.confirmPassword} onChange={(e)=>registerUserDetailhandler(e)} placeholder="Confirm New Password..." className="form-control" id="registerConfirmPassword" />
            </div>

            <div className="form-row d-flex align-items-center justify-content-start mt-3" style={{width:"100%"}}>
                <img style={{width:"3rem", height:"3rem", borderRadius:"50%"}} src={userAvatar} alt="" />
                <input type="file" accept="image/*" name="avatar" defaultValue={registerUser.avatar} onChange={(e)=>registerUserDetailhandler(e)} style={{backgroundImage:`url(${user})`, color:"transparent", backgroundColor:"transparent"}} className="custom-file-input mx-2" id="registerImage" required/>
            </div>
                <input style={{width:"100%"}} type="submit" className="btn btn-primary px-3 mt-3 mb-5" value="Register" />
        </form>
    </>
    );
}
export default RegisterUser;