import { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { clearAllError, reset_success, userLogOut } from "../../redux/actions/userActions";
import MetaData from "../layout/metadata/MetaData"
import "./dashboard.css"


const Dashboard = () => {
  const auth = useSelector(state=>state.userRegister)
  const alert = useAlert()




    const dispatch = useDispatch()
    const history = useHistory()

    const logoutUser = () => {
        dispatch(userLogOut())
    }

    useEffect(()=>{
        if(auth.success){
            // alert.success("Logged out successfully !")
            dispatch(reset_success())
        }
    if(auth.error){
        alert.error(auth.error)
        dispatch(clearAllError())
    }
    },[auth.success, auth.error, alert, dispatch])

    // admin route fun
    const adminRouteFun = () =>{
        history.push("/admin")
    }


    return (
        <>
        <MetaData title={`${auth.isAuthenticated && auth.user.name} DASHBOARD : ECOMMERCE`}/>
                <div className="container-fluid p-md-3 d-flex flex-column" style={{ minHeight: "85vh", marginTop:"10vh" }}>
                            
                        <button onClick={logoutUser} className="btn btn-primary mt-1" style={{ width:"max-content", marginLeft:"3.5%" }}>Logout</button>
                    <div className="row justify-content-center py-2" >
                        {auth.isAuthenticated
                        && <>
                        <div className="col col-md-12 col-6" style={{backgroundColor:"whitesmoke", boxShadow:"0 0 2px grey", borderRadius:"5px", width:"100%", maxHeight:"40rem", maxWidth:"30rem", display:"flex", flexDirection:"column", justifyContent:"center", alignContent:"center", alignItems:"center"}}>
                            <div className="d-flex flex-column align-items-center justify-content-center" style={{border:"1px solid tomato", width:"80%", height:"80%", padding:"13% 4% 13% 4%", borderRadius:"5px"}}>
                            <img className="" style={{width:"100%", aspectRatio:"1/1.2"}} src={auth.user.avatar[0].url} alt="" />
                            </div>
                            <NavLink to="/profile/edit" className="btn" style={{width:"50%", boxShadow:"0 0 0 9px whitesmoke", fontSize:"100%", marginTop:"-4.5%", background:"tomato", color:"white"}}>Edit Profile</NavLink>
                        </div>

                        <div className="col col-md-12 col-6 d-flex flex-column py-4 px-5" style={{backgroundColor:"whitesmoke", boxShadow:"0 0 2px grey", width:"100%", maxWidth:"30rem",maxHeight:"40rem"}}>
                            <div  >
                                <div className=" px-1 profileNameStrong">Name</div>
                                <p className="p-0 py-2 px-1 m-0 text-center fw-bold" style={{border:"1px solid red", color:"grey", borderRadius:"4px"}}>{auth.user.name}</p>
                            </div>
                            
                            <div >
                                <div className=" px-1 profileEmailStrong">Email</div>
                                <p className="p-0 py-2 px-1 m-0 text-center fw-bold" style={{border:"1px solid red", color:"grey", borderRadius:"4px"}}>{auth.user.email}</p>
                            </div>

                            <div >
                                <div className=" px-1 profileCreatedStrong">Joined On</div>
                                <p className="p-0 py-2 px-1 m-0 text-center fw-bold" style={{border:"1px solid red", color:"grey", borderRadius:"4px"}}>08/04/2019</p>
                            </div>

                            <div className="col col-md-12 col-6 d-flex flex-column py-3" style={{marginTop:"4rem", width:"100%"}}>
                            {auth.user.role === "admin" &&
                            <button onClick={adminRouteFun}  className="btn " style={{backgroundColor:"tomato", color:"white"}}>Dashboard</button>
                            }
                            <NavLink to="/orders" className="btn " style={{backgroundColor:"tomato", color:"white", marginTop:"1rem"}}>My Orders</NavLink>
                            <NavLink to="/password/change" className="btn" style={{backgroundColor:"tomato", color:"white", marginTop:"1rem"}}>Change Password</NavLink>
                            </div>
                        </div>
                        </>
                        }
                    </div>
                </div>
        </>
    );
}
export default Dashboard;