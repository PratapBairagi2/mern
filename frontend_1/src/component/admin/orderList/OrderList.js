import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { deleteAdminOrderAction, getAdminOrdersAction, reset_success } from "../../../redux/actions/orderAction";
import Loader from "../../loader/Loader";

const OrderList = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const alert = useAlert()
    const {loading, orders} = useSelector(state=>state.getAdminOrders)
    const {loading : deleteOrderLoading, success : deleteOrderSuccess, error : deleteOrderError} = useSelector(state=>state.deleteOrderAdmin)




    useEffect(()=>{
        dispatch(getAdminOrdersAction())
        if(deleteOrderSuccess){
            alert.success("Order deleted successfully !")
            dispatch(reset_success())
        }
        if(deleteOrderError){
            alert.success(deleteOrderError)
        }
    },[dispatch, deleteOrderLoading, deleteOrderSuccess, deleteOrderError, alert])

    // 
    const updateOrderStatus = (id) => {
        history.push(`/admin/order/status/${id}`)
    }

    // 
    const deleteOrderFun = (id) => {
        dispatch(deleteAdminOrderAction(id))
    }
    return (
        <>
            <div style={{ height: "94vh", overflowX: "hidden", overflowY: "auto", width: "100%", padding: "2%", display: "flex", flexWrap: "wrap" }}>
                <div style={{ display: "flex", overflow: "hidden", flexWrap: "wrap", width: "max-content", minWidth: "100%", justifyContent: "space-evenly" }}>

                    <div style={{ width: "max-content", minWidth: "100%", overflow: "auto" }}>
                        <table className="table table-responsive" style={{ width: "100%", boxShadow: "0 0 2px grey" }} >
                            <thead style={{ background: "tomato", color: "white", border: "2px solid tomato" }}>
                                <tr>
                                    <td>Order ID</td>
                                    <td>Customer ID</td>
                                    <td>Created</td>
                                    <td>Products</td>
                                    {/* <td>Stock</td> */}
                                    <td>Price</td>
                                    <td>Total</td>
                                    <td>Status</td>

                                    <td>Edit</td>
                                    <td>Delete</td>
                                </tr>
                            </thead>

                            <tbody>
                                {loading && <Loader /> }
                                   { orders && orders.length >0 && orders.map((v, i) => {
                                        return <tr key={i} style={{ fontSize: "80%" }}>

                                            <td>{v._id}</td>

                                            <td>{v.user}</td>

                                            <td>
                                                <span style={{ display: "flex", flexDirection: "column" }}>
                                                    <span style={{ width: "max-content" }}>{new Date(v.createdAt).toLocaleString().split(",")[0]}</span>
                                                    <span style={{ width: "max-content" }}>{new Date(v.createdAt).toLocaleString().split(",")[1]}</span>
                                                </span>
                                            </td>

                                            <td>
                                                <select multiple style={{padding:" 0 6px", height:"max-content", minHeight:"max-content", outline:"none", border:"none"}}>
                                                    {v.orderItems.map((p,pi)=>{
                                                        return <option value={p._id} style={{display:"flex",  padding:"0 3px", minHeight:"max-content"}} key={pi}>
                                                            <input type="checkbox" value="" name="" id="" />
                                                            <span style={{margin:"2px 3px"}}>{p.name} </span>
                                                            <span style={{margin:"2px 3px"}}> ₹{p.price}</span>
                                                            <span style={{margin:"2px 3px"}}> X {p.quantity}</span>
                                                        </option>
                                                    })}
                                                    
                                                </select>
                                                {/* <img style={{ width: "2rem" }} src={v.images[0].url} alt="" /> */}
                                            </td>

                                            {/* <td></td> */}

                                            <td> ₹{v.itemPrice}</td>
                                            <td> ₹{v.totalPrice}</td>
                                            <td style={{color:`${v.orderStatus==="processing" ? "red" : v.orderStatus==="shipped" ? "goldenrod" : "green"}`}} >{v.orderStatus}</td>


                                            <td>
                                                <svg onClick={()=>updateOrderStatus(v._id)} style={{ cursor: "pointer", width: "1.6rem", fill: "blue" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                                    <path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z" />
                                                </svg>
                                            </td>

                                            <td>
                                                <svg onClick={() => deleteOrderFun(v._id)} style={{ fill: "red", width: "1rem", cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                    <path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z" />
                                                </svg>
                                            </td>
                                        </tr>

                                    })}
                            </tbody>
                        </table>
                    </div>

                    {/* <div style={{ maxWidth: "360px", minWidth: "220px", marginTop: "2rem", width: "100%", border: "1px solid red", position: "relative" }}>
                        <span style={{ width: "max-content", background: "white", position: "absolute", top: "-6%", left: "3%", padding: "2px 6px", color: "red", fontWeight: "500" }}>Create New Product</span>
                        <form onSubmit={constnNewProductSubmitHandler} className="" style={{ margin: "4% auto", width: "90%" }}>
                            <input onChange={(e) => productDetailsHandler(e)} defaultValue={newProduct.name} className="form-control" style={{ fontSize: "90%", padding: "1% 3%", width: "80%", marginTop: "3px" }} type="text" name="name" placeholder="Product Name.." id="" />
                            <input onChange={(e) => productDetailsHandler(e)} defaultValue={newProduct.category} className="form-control" style={{ fontSize: "90%", padding: "1% 3%", width: "80%", marginTop: "3px" }} type="text" name="category" placeholder="Category Name.." id="" />
                            <input onChange={(e) => productDetailsHandler(e)} defaultValue={newProduct.description} className="form-control" style={{ fontSize: "90%", padding: "1% 3%", width: "80%", marginTop: "3px" }} type="text" name="description" placeholder="Description.." id="" />
                            <input onChange={(e) => productDetailsHandler(e)} defaultValue={newProduct.price} className="form-control" style={{ fontSize: "90%", padding: "1% 3%", width: "30%", marginTop: "3px" }} type="number" name="price" placeholder="Price.." id="" />
                            <input onChange={(e) => productDetailsHandler(e)} defaultValue={newProduct.stock} className="form-control" style={{ fontSize: "90%", padding: "1% 3%", width: "30%", marginTop: "3px" }} type="number" name="stock" placeholder="Stock.." id="" />
                            <input onChange={(e) => productDetailsHandler(e)} defaultValue={""} accept="image/*" className="form-control" style={{ fontSize: "90%", padding: "1% 3%", width: "80%", marginTop: "3px" }} multiple type="file" name="file" id="" />
                            <span style={{ width: "80%", maxWidth:"80%", overflowX:"auto", marginTop: "5px", display: "flex" }}>
                                {newProduct.images.map((v, i) => {
                                    return <img style={{ width: "3rem", marginLeft: "3px" }} key={i} src={v} alt="" />
                                })}
                            </span>
                            <input type="submit" value="Create New" style={{ float: "right", margin: "3% 20% 3% 0", padding: "2px 8px", color: "white", background: "tomato", border: "none", borderRadius: "3px" }} />
                        </form>
                    </div> */}

                </div>
            </div>
        </>
    );
}
export default OrderList;