import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProductDetails } from "../../redux/actions/productActions";
import ReactStars from "react-rating-stars-component"
import ReviewCard from "../reviewCard/ReviewCard"
import MetaData from "../layout/metadata/MetaData"
import { addItemsToCartAction } from "../../redux/actions/cartAction";
import { useAlert} from "react-alert"
import {Dialog, DialogActions, DialogContent, DialogTitle, Button} from "@material-ui/core"
import "./productDetails.css"
import { reviewCreateAction } from "../../redux/actions/reviewAction";
import {Rating} from "@material-ui/lab"



const ProductDetails = () => {
    const {id} = useParams()

    const dispatch = useDispatch()
    const alert = useAlert()

    const data = useSelector(det=>det.productDetails)
    const {success:itemQuantitySuccess, error:itemQuantityError, loading:itemQuantityLoading, cartItems} = useSelector(item=>item.cart)
    const {success :reviewSuccess, error:reviewError, loading : reviewLoading} = useSelector(item=>item.review)



    
    useEffect(()=>{
            dispatch(getProductDetails(id))
    },[dispatch,id, reviewSuccess])

    const [quantity, setQuantity] = useState(1)

    const cartQuantity = (e) =>{
        
        if(e=="+"){
            if(quantity < data.product.stock){
            setQuantity(quantity+1)
            }
        }
        if(e=="-"){
            if(quantity > 1){
            setQuantity(quantity-1)
            }
        }        
    }

    const addToCart = () =>{
        if(id && quantity){
            dispatch(addItemsToCartAction(id,quantity))
        }
        else{
            alert.error("something went wrong !")
        }
    }

    useEffect(()=>{
        if(itemQuantitySuccess){
            alert.success("Item added to cart",{position:"top right"})
        }
        if(itemQuantityError){
            alert.error("Item not added to cart , something went wrong !",{position:'top right'})
        }
        if(reviewSuccess){
            alert.success("Review Successfull !",{position:"top right"})
        }
        if(itemQuantityError){
            alert.error("Unable to review , something went wrong !",{position:'top right'})
        }
    },[itemQuantitySuccess, itemQuantityError, reviewSuccess, itemQuantityError])

    const [open, setOpen] = useState(false)

    const submitReviewToggle = () =>{
        open ? setOpen(false) : setOpen(true)
    }

    const [ rating, setRating] = useState("")
    const [ comment, setComment] = useState("")


    const submitReview = (e) =>{
        e.preventDefault()
        if(rating && comment){
            dispatch(reviewCreateAction({rating, comment,productId:id }))
            setOpen(false)
        }
    }

    const ratingOptions ={
        // edit: true,
        // isHalf:true,
        // activeColor:"tomato",
        // color:"grey",
        precision:.5,
        readOnly:false,
        size:"large",
        value:rating
    }

    return (
    <>
    {data.success && <MetaData title={`${data.product.name} DETAILS : ECOMMERCE`}/>}
    
    {data.success?
        <div className="container-fluid py-5 px-0" style={{minHeight:"90vh", width:"100%", maxWidth:"1400px"}}>
            <div className="row p-2" style={{boxShadow:"0 0 2px grey", width:"98%", margin:"0 auto"}}>
                <div className="col col-12 col-lg-4 mt-3" style={{height:"100%"}}>

                    <div className="carousel slide" id="sliderContainer" data-bs-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-bs-target="#sliderContainer" data-bs-slide-to="0" className=""></li>
                            <li data-bs-target="#sliderCountainer" data-bs-slide-to="1" className="active"></li>
                            <li data-bs-target="#sliderContainer" data-bs-slide-to="2" ></li>
                        </ol>

                        <div className="carousel-inner">
                            {data.product.images.map((p,i)=>{
                                console.log(p.url)
                               return <div key={i} className={`carousel-item ${i=== 0 && "active"}`}>
                                <img className="w-100" src={p.url} alt="" />
                               </div>
                            })}
                        </div>

                        <a href="#sliderContainer" className="carousel-control-prev" role="button" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon"></span>
                            {/* <span className="sr-only">Previous</span> */}
                        </a>

                        <a href="#sliderContainer" className="carousel-control-next" role="button" data-bs-slide="next">
                            <span className="carousel-control-next-icon"></span>
                            {/* <span className="sr-only">Next</span> */}
                        </a>

                        

                    </div>

                    
                </div>
                <div className="col col-12 col-lg-8 d-flex flex-column mt-3" style={{height:"100%"}}>
                    <h4 className="m-0">SUBSCRIBE</h4>
                    <p className="text-danger fw-bold" style={{wordWrap:"break-word"}}>PRODUCT # {data.product?._id}</p>

                    <div className="ratingStars d-flex align-items-center mt-1" style={{borderTop:"2px solid grey", borderBottom:"2px solid grey", width:"max-content"}}>
                    <ReactStars 
                    edit={false}
                    value={Number(data.product?.ratings)}
                    isHalf={true}
                    activeColor="tomato"
                    size={window.innerWidth >600 ? 25 : 15}
                    />
                    <span className="fw-bold mx-2 text-danger mt-1 px-2">( {data.product?.reviews?.length}  REVIEWS )</span>
                    </div>
                    <h4 className="fw-bold mt-4 py-2 px-3" style={{color:"tomato", borderBottom:"2px solid grey", width:"max-content"}}>$ {data.product?.price}</h4>
                    
                    <div className="addToCart d-flex align-items-center mt-2">
                    <button onClick={()=>cartQuantity("-")} className="btn btn-outline-success py-0 fw-bold" style={{height:"2rem"}}>-</button>
                    <span type="number" style={{width:"10%", height:"2rem", lineHeight:"2rem", maxWidth:"2rem", border:"1px solid grey", textAlign:"center"}} id="" >{quantity}</span>
                    <button  onClick={()=>cartQuantity("+")} className="btn btn-outline-success py-0 fw-bold" style={{height:"2rem"}} >+</button>
                    <button onClick={addToCart} className="btn btn-outline-success px-3 py-0 mx-2 fw-bold" style={{height:"2rem", borderRadius:"18px"}}>ADD TO CART</button>
                    </div>

                    <div className="stock d-flex my-2">
                        <span className="text-dark fw-bold">Stock :</span>
                        <span className="mx-2 fw-bold" style={{color:`${data.product.stock > 0 ? "green":"red"}`}}>{data.product.stock > 0? "Available":"Out Of Stock"} ( {data.product.stock} left )</span>
                    </div>

                    <h2 className="py-2 mt-1 fw-bold text-danger mt-2" style={{ width:"max-content", textTransform:"uppercase"}}>{data.product?.name}</h2>

                    <div className="productCategory d-flex py-1" style={{width:"max-content", borderTop:"1px solid gray", borderBottom:"1px solid gray"}}>
                        <span className="text-success" style={{fontWeight:"600"}}>Category :</span>
                        <span className="mx-2 text-success" style={{fontWeight:"700"}}> #{data.product.category}</span>
                    </div>

                    <p className="py-2 mt-3 d-flex flex-column" style={{border:"1px solid grey", borderLeft:"none", borderRight:"none"}}>
                    <span className="mt-3 p-2 bg-danger text-light" style={{width:"max-content", borderRadius:"6px"}}>Description</span>
                        
                      <span className="mt-2 p-1" style={{fontWeight:"600"}}>{data.product?.description}</span>  
                    </p>
                    <button onClick={submitReviewToggle} className="btn btn-outline-success" style={{width:"max-content", alignSelf:"flex-end"}}>Add Review</button>
                    <Dialog
                    open={open}
                    onClose={submitReviewToggle}
                    className="dialoBox"
                    // aria-labelledby="simple-dialog-title"
                    >
                        <DialogTitle>Submit Review</DialogTitle>
                        <DialogContent
                        // className="submitDialog"
                        >
                            {/* <ReactStars */}
                            <Rating
                            {...ratingOptions}
                            
                            
                            onChange={(e)=>{return setRating(e.target.value)}}
                            />
                            <textarea 
                            className="submitDialogTextArea"
                            rows="5"
                            cols="30"
                            value={comment}
                            
                            onChange={(e)=>{return setComment(e.target.value)}}
                            />
                            <DialogActions>
                                <Button color="secondary" onClick={submitReviewToggle}>Cancel</Button>
                                <Button onClick={submitReview} color="primary">Submit</Button>
                            </DialogActions>
                        </DialogContent>
                    </Dialog>

                </div>
            </div>
        </div> : <h3></h3>

}

    <h3 className="reviewHeader text-center px-3 my-4" style={{borderBottom:"3px solid red", width:"max-content", margin:"0 auto"}}>Reviews</h3>
    {data.success && data.product.reviews[0] ? 
       ( <div className="container-fluid reviews">
           <div className="row p-2">
           {data.product.reviews && data.product.reviews.map((rev,i)=>{
               return <ReviewCard key={rev._id}  review={rev}/>
           })}
        </div>
        </div> ): (<h4 className="text-center my-4">No Review Yet !</h4>)
    }
    </>
    );
}
export default ProductDetails;