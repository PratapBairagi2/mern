import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAllError, deleteReviewByAdminAction, GetAllReviewOfAllProductsAction, reset_success } from "../../../redux/actions/reviewAction";
import { Rating } from "@material-ui/lab"
import { getProducts } from "../../../redux/actions/productActions";
import Loader from "../../loader/Loader";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";

const ReviewsList = () => {

    const dispatch = useDispatch()
    const alert = useAlert()
    const history = useHistory()
    const { loading, success, error, reviews } = useSelector(state => state.allProductReviews)
    const { loading : deleteReviewLoading , success: deleteReviewSuccess, error: deleteReviewError } = useSelector(state => state.deleteReviewAdmin)

    

    useEffect(() => {
        if (deleteReviewSuccess) {
            alert.success("Review Deleted successfully !")
            dispatch(GetAllReviewOfAllProductsAction("", ""))
            dispatch(reset_success())
            history.push("/admin")
        }
        if(deleteReviewError){
            alert.error(deleteReviewError)
            dispatch(clearAllError())
        }
    }, [deleteReviewSuccess, deleteReviewError])

    useEffect(() => {
        dispatch(getProducts())
        dispatch(GetAllReviewOfAllProductsAction("", ""))
    }, [])

    const searchReviewFun = (e) => {
        const reviewId = "rgerigherohvo"
        const productId = e.target.value
        if (e.target.value.length === 24 || e.target.value.length === 0) {
            dispatch(GetAllReviewOfAllProductsAction(productId, reviewId))
        }

    }

    // all reviews of a product
    const [allReviews, setAllReviews] = useState([])
    const showReviewListFun = (id) => {
        document.getElementById("revs"+id).style.display== "flex" ?  
        document.getElementById("revs"+id).style.display= "none" :  document.getElementById("revs"+id).style.display= "flex"

        const reviewShowToggleId = document.getElementById("reviewShowToggleId"+id)

        reviewShowToggleId.style.transform == "" ? 
        reviewShowToggleId.style.transform = "rotateZ(180deg)" :  reviewShowToggleId.style.transform = ""
    }

    //  delete review fun
     const deleteReviewFun = (productId, reviewId) =>{
         dispatch(deleteReviewByAdminAction(productId, reviewId))
     }

    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                <input type="search" style={{textAlign:"center", width:"96%", padding:"2px 6px", color:"grey", outline:"none"}} placeholder="Search product id..." onChange={searchReviewFun} name="" id="" />
            <div className="container-fluid p-0 m-0" style={{ width: "100%", overflowX:"auto" }}>



                <div style={{ width: "100%", minWidth:"40rem", height: "85vh", overflowY: "auto", marginTop: "3px", overflowX:"auto" }}>
                    <div className="" style={{ width: "100%", height:"max-content",  boxShadow: "0 0 2px grey", display:"flex", flexDirection:"column" }} >
                        <div className="col" style={{ background: "tomato", color: "white" }}>
                            <ul style={{display:"flex", flexDirection:"row", listStyle:"none"}}>
                                <li className="col col-2">Product ID</li>
                                <li className="col col-2">Product Name</li>
                                <li className="col col-1">Image</li>
                                <li className="col col-2">Ratings</li>
                                <li className="col col-3">Reviews</li>
                                <li className="col col-1">Edit</li>
                                <li className="col col-1">Delete</li>
                            </ul>
                        </div >

                        <div className="col" style={{ padding:"0", margin:"0"}}>
                            {loading && <Loader />}
                            {success && reviews.map((v, i) => {
                                return <Fragment key={i}>
                                    <ul style={{ fontSize: "80%", display:"flex", listStyle:"none" }}>
                                        <li className="col col-2" style={{fontSize:"90%", wordBreak:"break-word"}}>{v._id}</li>

                                        <li className="col col-2">{v.name}</li>

                                        <li className="col col-1">
                                            <img style={{ width: "2rem" }} src={v.images[0].url} alt="" />
                                        </li>

                                        <li className="col col-2">
                                            <Rating
                                                readOnly={true}
                                                precision={.1}
                                                value={v.reviews && v.reviews.length > 0 ? v.ratings : 0}
                                                size="small"
                                            />
                                        </li>

                                        <li className="col col-3" style={{ display: "flex", flexDirection: "column", alignItems:"center" }}>
                                            <button disabled style={{ color: `${v.reviews.length === 0 ? "red" : "green"}`, border: "none", background: "transparent" }}>{v.reviews.length === 0 ? "No Review" : v.reviews.length}</button>
                                            <button id={"reviewShowToggleId"+v._id} onClick={() => showReviewListFun(v._id)} style={{ transition:".8s", color: "red", display:"flex", border: "2.5px solid transparent", justifyContent:"center", alignItems:"center", width:"1rem",height:"1rem", background: "transparent" }}>▼</button>
                                        </li>

                                        <li className="col col-1">
                                            <svg style={{ cursor: "pointer", width: "1.6rem", fill: "blue" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                                <path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z" />
                                            </svg>
                                        </li>

                                        <li className="col col-1">
                                            <svg style={{ fill: "red", width: "1rem", cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                <path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z" />
                                            </svg>
                                        </li>

                                    </ul>


                                    
                                            <div id={"revs"+v._id} style={{width:"98%", display:"none", flexDirection:"column", margin:"5px auto", boxShadow:"0 0 3px grey"}}>
                                        <ul id={"revHead"+v._id} style={{ background: "tomato", display:"flex", listStyle:"none", flexDirection:"row", color: "white", fontSize: "70%", padding:"4px 2px" }}>
                                            <li className="col col-2">User ID</li>
                                            <li className="col col-2">Rating</li>
                                            <li className="col col-1">Comment</li>
                                            <li className="col col-2">User Name</li>
                                            <li className="col col-3">Comment</li>
                                            <li className="col col-1">Link</li>
                                            <li className="col col-1">Delete</li>


                                        </ul>
                                        { v.reviews.map((r, ri) => {
                                            return <ul style={{ display:"flex", flexDirection:"row", listStyle:"none", fontSize:"70%", borderBottom:"1px solid grey", padding:"4px 2px"}}  key={ri}>
                                                
                                                <li className="col col-2" style={{fontSize:"80%", wordBreak:"break-word", padding:"0 2%"}}>{r.user}</li>
                                                <li className="col col-2">
                                                    
                                                    <Rating
                                                    value={r.rating > 0 ? r.rating : 0}
                                                    precision={.1}
                                                    readOnly={true}
                                                    color="grey"
                                                    size="small"
                                                    />
                                                </li>
                                                <li className="col col-1"></li>
                                                <li className="col col-2">{r.name}</li>
                                                <li className="col col-3" style={{padding:"0 2%"}}>
                                                {r.comment}
                                                </li>

                                                <li className="col col-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="blue" className="bi bi-link" viewBox="0 0 16 16">
                                                        <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
                                                        <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z" />
                                                    </svg>
                                                </li>
                                                <li className="col col-1">
                                                    <svg onClick={()=>deleteReviewFun(v._id, r._id)} style={{ fill: "red", width: ".8rem", cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                        <path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z" />
                                                    </svg>
                                                </li>
                                            </ul>

                                        })}
                                        </div>
                                        

                                </Fragment>


                            })}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
export default ReviewsList;