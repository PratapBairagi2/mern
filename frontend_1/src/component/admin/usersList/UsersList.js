
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAllError, deleteAdminUserAction, getUserListAction, reset_success } from "../../../redux/actions/userActions";
import Loader from "../../loader/Loader"
import { NavLink, useHistory } from "react-router-dom"
import { useAlert } from "react-alert";
import { adminGetAllProducts } from "../../../redux/actions/productActions";

const UsersList = () => {

    //  fetch users list
    const dispatch = useDispatch()
    const history = useHistory()
    const alert = useAlert()
    const { success, loading, users, error } = useSelector(state => state.usersList)
    const { success : deleteUserSuccess, loading: deleteUserLoading, error: deleteUserError } = useSelector(state => state.deleteAdminUser)

    useEffect(() => {
        dispatch(getUserListAction())
        dispatch(adminGetAllProducts())


        if(deleteUserSuccess){
            alert.success("User deleted successfully !")
            history.push("/profile")
            dispatch(reset_success())
        }
        if(deleteUserError){
            alert.error(deleteUserError)
            dispatch(clearAllError())
        }
    }, [dispatch, deleteUserSuccess, deleteUserError])


    //  delete user
    const deleteUserFun = (id) => {
        dispatch(deleteAdminUserAction(id))
    }

    // update user route fun
    const updateUserRouteFun = (id) =>{
        history.push(`/admin/user/update/${id}`)
    }


    return (
        <>
            <div className="table-response" style={{ overflow: "auto", width: "100%" }}>
                {success && users.users.length > 0 ?
                    <table className="table" style={{ minWidth: "100%" }}>
                        <thead className="thead table-success" style={{ border: "2px solid white", }}>
                            <tr style={{ color: "blue", fontWeight: "600" }} >
                                <td >ID</td>
                                <td >Name</td>
                                <td >Email</td>
                                <td >Image</td>
                                <td>Joined</td>
                                <td >Role</td>
                                <td >Edit</td>
                                <td >Delete</td>

                            </tr>
                        </thead>
                        <tbody className="tbody" >
                            {users.users.map((val, i) => {
                                return <tr key={val._id} style={{ fontSize: "80%" }}>
                                    <td title={val._id} >
                                        <span style={{ background: "grey", padding: "1% 3%", borderRadius: "5px", color: "white" }}>{val._id}</span>
                                    </td>

                                    <td>
                                        <p >{val.name}</p>
                                    </td>

                                    <td>
                                        <span style={{ padding: "1% 3%", borderRadius: "5px", background: `${val.role === "admin" ? "green" : "red"}`, fontWeight: "500", color: "white" }}>{val.email}</span>
                                    </td>

                                    <td style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", padding: "10% 1%", background: "transparent", border: "none" }}>
                                        <img style={{ width: "2.5rem", border: "none" }} src={val.avatar[0].url} alt="" />
                                    </td>

                                    <td style={{ minWidth: "7rem", color: "blue" }}>
                                        <span style={{ display: "flex", flexDirection: "column" }}>
                                            <span>{new Date(val.createAt).toLocaleString().split(",")[0]}</span>
                                            <span>{new Date(val.createAt).toLocaleString().split(",")[1]}</span>
                                        </span>
                                    </td>

                                    <td>
                                        <span style={{ background: `${val.role === "admin" ? "green" : "red"}`, padding: "1px 4px 3px 4px", borderRadius: "4px", color: "white", fontWeight: "500" }}>{val.role}</span>
                                    </td>

                                    <td >
                                        {/* <NavLink to={`/admin/user/update/${val._id}`}> */}
                                            <svg onClick={()=>updateUserRouteFun(val._id)} style={{ cursor: "pointer", width: "1.5rem", fill: "blue" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                                <path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z" />
                                            </svg>
                                        {/* </NavLink> */}
                                    </td>
                                    <td>
                                        <svg onClick={() => deleteUserFun(val._id)} style={{ fill: "red", width: "1rem", cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                            <path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z" />
                                        </svg>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                    :
                    <h1>No User yet !</h1>
                }
            </div>
        </>
    );
}
export default UsersList;