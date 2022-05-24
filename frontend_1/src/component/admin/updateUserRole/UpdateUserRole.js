import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAdminUserAction, reset_success, updateUserByAdminAction } from "../../../redux/actions/userActions"
import { useHistory, useParams } from "react-router-dom"
import {useAlert} from "react-alert"

const UpdateUserByAdmin = () => {

    // const id = useParams() // not working
    const id = window.location.href.split("/")[6]
    
    const dispatch = useDispatch()
    const alert = useAlert()
    const history = useHistory()
    const {loading : userLoading, success : userSuccess, error : userError, user } = useSelector(state=> state.getAdminSingleUser)
    const {loading : userUpdateLoading, success : userUpdateSuccess , error : userUpdateError, user :updatedUser } = useSelector(state=> state.updateUserByAdmin)


    // const [profileAvatar, setProfileAvatar] = useState([])
    const [details, setDetails] = useState({
        name:"",
        email:"",
        role:"",
        oldAvatar:[],
        newAvatar :""
    })

    useEffect(()=>{
        dispatch(getAdminUserAction(id))
    },[dispatch, id])

    useEffect(()=>{
        if(user._id){
            setDetails({
                ...details,
                name : user.name,
                email : user.email,
                role: user.role,
                oldAvatar : user.avatar,
            })
        }
    },[userSuccess, userError, user])

    // show success or error message after updated user
    useEffect(()=>{
        if(userUpdateSuccess){
            alert.success("User updated successfully !")
            dispatch(reset_success())
            history.push("/profile")
        }
    },[userUpdateSuccess, userUpdateError, updatedUser])


    // submit update details
    const updateUserSubmitHandler = (e) =>{
        e.preventDefault()
        dispatch(updateUserByAdminAction(id, details))
    }

    
    const changeUserDetailsHandle = (e) =>{
        const {name, value} = e.target
        if(name === "avatar"){
            const file = e.target.files[0]

            const reader = new FileReader()
            reader.onload = () =>{
                if(reader.DONE){
                setDetails({...details, newAvatar : reader.result })
            }
            }
            reader.readAsDataURL(file)
        }
        else{
            setDetails({...details, [name]: value})
        }
    }

    return (
    <>
         <form onSubmit={updateUserSubmitHandler} style={{ maxWidth: "500px", width: "100%", margin: "0 auto", minHeight:"85vh" }}>
                    <h2 style={{width:"max-content", textAlign:"center", margin:"1rem auto"}}>Edit Profile</h2>
                <div className="form-group">
                    <label htmlFor="registerName" className="px-3 py-2 mb-1" style={{ backgroundColor: "rgb(230, 229, 229", width: "100%", borderRadius: "3px" }}>Name</label>
                    <input type="text" name="name" defaultValue={details.name} onChange={(e) => changeUserDetailsHandle(e)} placeholder="Enter Your Name..." className="form-control" id="registerName" />
                </div>

                <div className="form-group mt-3">
                    <label htmlFor="registerEmail" className="px-3 py-2 mb-1" style={{ backgroundColor: "rgb(230, 229, 229", width: "100%", borderRadius: "3px" }}>Email</label>
                    <input type="email" name="email" defaultValue={details.email} onChange={(e) => changeUserDetailsHandle(e)} placeholder="Enter Your Emai-ID..." className="form-control" id="registerEmail" />
                </div>

                <div className="form-group mt-3">
                    <select onChange={(e) => changeUserDetailsHandle(e)} name="role" id="">
                    <option value="user">Choose Role</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <div className="form-row d-flex align-items-center justify-content-start mt-3" style={{ width: "100%" }}>
                    <img style={{ width: "3rem", height: "3rem", borderRadius: "50%" }} src={details.newAvatar} alt="" />
                  <input type="file" accept="image/*" name="avatar" defaultValue={""} onChange={(e) => changeUserDetailsHandle(e)} style={{ backgroundImage: `url(${user})`, color: "transparent", backgroundColor: "transparent" }} className="custom-file-input mx-2" id="registerImage" />
                </div>
                <input style={{ width: "100%" }} type="submit" className="btn btn-primary px-3 mt-3 mb-5" value="Update" />
            </form>
    </>
    );
}
export default UpdateUserByAdmin;