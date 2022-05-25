import { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../component/loader/Loader";
import { cleareError, myOrdersAction } from "../../redux/actions/orderAction";
import { NavLink } from "react-router-dom"


const MyOrders = () => {
    const alert = useAlert()
    const dispatch = useDispatch()
    const { orders, error, success, loading } = useSelector(state => state.myOrders)

    useEffect(() => {
        dispatch(myOrdersAction())
    }, [dispatch])

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(cleareError())
        }
    }, [error, loading, success, alert, dispatch])

    return (
        <>  {loading ? <Loader /> :
            <div className="container-fluid" style={{ minHeight: "85vh", width: "100%", marginTop:"10vh", padding: "2% 4%", overflow:"auto" }}>
                <h4 style={{ width: "max-content", margin: "1% auto", borderBottom: "1px solid grey" }}>My Orders</h4>
                <div style={{ width: "100%",minWidth:"500px", height: "100%", display: "flex" }}>
                    <div className="col">
                        <table className="table table-hover">
                            <thead>
                                <tr className="table-dark" style={{ fontWeight: "600", textAlign: "center" }}>
                                    <td >Order ID</td>
                                    <td >Order Date</td>
                                    <td >Order Status</td>
                                    <td >Item Quantity</td>
                                    <td >Order Amount</td>
                                    <td >Order Preview</td>
                                </tr>
                            </thead>
                            <tbody>
                                {orders &&
                                    orders.map(o => {
                                        return <tr key={o._id} style={{ textAlign: "center" }}>
                                            <td title={o._id} style={{textOverflow:"ellipsis",maxWidth:"2rem", overflow:"hidden"}}>{o._id}</td>
                                            <td>{ new Date(o.createdAt).toLocaleString() }</td>
                                            <td style={{color:`${o.orderStatus==="delivered"?"green":"red"}`}}>{o.orderStatus}</td>
                                            <td>{
                                                o.orderItems.map(({ quantity, ...rest }) => {
                                                    return quantity
                                                }).reduce((total, amount, i) => {
                                                    return total + amount
                                                })
                                            }
                                            </td>
                                            <td>{o.totalPrice}</td>
                                            <td>
                                                <NavLink to={`/order/preview/${o._id}`} style={{padding:"2% 3%"}}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-link" viewBox="0 0 16 16">
                                                        <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
                                                        <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z" />
                                                    </svg>
                                                </NavLink>
                                            </td>
                                        </tr>
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        }
        </>
    );
}
export default MyOrders;