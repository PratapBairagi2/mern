import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import MetaData from "../../../component/layout/metadata/MetaData"
import { clearAllError, updateProfileAction, userLoad } from "../../../redux/actions/userActions"
import {useAlert} from "react-alert"
import { useHistory } from "react-router-dom"
// import Loader from "../../../component/loader/Loader"

const UpdateProfile = () => {
    const {user, isAuthenticated} = useSelector(state=>state.userRegister)
    const { loading, success, error } = useSelector(state=>state.profileUpdated)

    const alert = useAlert()
    const dispatch = useDispatch()
    const history = useHistory()

    const [details, setDetails] = useState({
        name : isAuthenticated && user.name,
        email : isAuthenticated && user.email,
        avatar : isAuthenticated && user.avatar[0].url
    })

    const [profileAvatar, setProfileAvatar] = useState("")
    const [profileAvatarConvert, setProfileAvatarConvert] = useState("")

    useEffect(()=>{
        if( !profileAvatarConvert){
            setProfileAvatar(user.avatar[0].url)
        }
        else{
            setProfileAvatar(details.avatar)
        }
    },[user.avatar, profileAvatarConvert, profileAvatar, details.avatar])


    const changeUserDetailsHandle = (e) => {
        const { name, value } = e.target

        if (name === "avatar") {
            if(value){
                const reader = new FileReader()
                
                reader.onload = () =>{
                        setProfileAvatarConvert(reader.result)
                        setDetails({...details, [name]: reader.result})

                }

                reader.readAsDataURL(e.target.files[0])
            }else{
                setDetails({...details, [name]: value}) // send exisit image to details
            }
        }
        else{
            setDetails({...details, [name]: value})
        }
        
    }

    const formSubmitHandler = (e) => {
        e.preventDefault()
        if(details.name && details.email && details.avatar){
        dispatch(updateProfileAction(details))
        }
    }

    useEffect(()=>{
        if(loading){
             alert.show("Upate in process !")
        }
        
        if(error){
            alert.error(alert)
            dispatch(clearAllError())
        }

        if(success){
            alert.success("Profile Updated Successfully !",{position:"top right"})
            history.push("/dashboard")
            dispatch(userLoad())
        }

    },[success, loading, alert, dispatch, error, history])

    return (
        <>
        {isAuthenticated && user &&
        <>  
        <MetaData title={`${user.name} UPDATE YOUR PROFILE : ECOMMERCE`}/>
            <form onSubmit={formSubmitHandler} style={{ maxWidth: "500px", width: "94%", margin: "0 auto", minHeight:"85vh", marginTop:"13vh", }}>
                    <h2 style={{width:"max-content", textAlign:"center", margin:"1rem auto"}}>Edit Profile</h2>
                <div className="form-group">
                    <label htmlFor="registerName" className="px-3 py-2 mb-1" style={{ backgroundColor: "rgb(230, 229, 229", width: "100%", borderRadius: "3px" }}>Name</label>
                    <input type="text" name="name" defaultValue={details.name} onChange={(e) => changeUserDetailsHandle(e)} placeholder="Enter Your Name..." className="form-control" id="registerName" />
                </div>

                <div className="form-group mt-3">
                    <label htmlFor="registerEmail" className="px-3 py-2 mb-1" style={{ backgroundColor: "rgb(230, 229, 229", width: "100%", borderRadius: "3px" }}>Email</label>
                    <input type="email" name="email" defaultValue={details.email} onChange={(e) => changeUserDetailsHandle(e)} placeholder="Enter Your Emai-ID..." className="form-control" id="registerEmail" />
                </div>

                <div className="form-row d-flex align-items-center justify-content-start mt-3" style={{ width: "100%" }}>
                    <img style={{ width: "3rem", height: "3rem", borderRadius: "50%" }} src={profileAvatar} alt="" />
                  <input type="file" accept="image/*" name="avatar" defaultValue={""} onChange={(e) => changeUserDetailsHandle(e)} style={{ backgroundImage: `url(${user})`, color: "transparent", backgroundColor: "transparent" }} className="custom-file-input mx-2" id="registerImage" />
                </div>
                <input style={{ width: "100%" }} type="submit" className="btn btn-primary px-3 mt-3 mb-5" value="Update" />
            </form>
        </>
        }
        </>
    );
}
export default UpdateProfile
    ;