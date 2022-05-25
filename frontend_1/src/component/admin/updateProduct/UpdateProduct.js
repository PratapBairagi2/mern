import { useEffect, useRef, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { adminGetAllProducts, getProductDetails, reset_success, updateProductAction } from "../../../redux/actions/productActions";
import Loader from "../../loader/Loader";


const UpdateProduct = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const alert = useAlert()
    const history = useHistory()
    const { product } = useSelector(state => state.productDetails)
    const {loading : updateProductLoading , success : updateProductSuccess , error : updateProductError} = useSelector(state=> state.deleteProduct)

    const [productDetails, setProductDetails] = useState({
        name: "",
        category: "",
        description: "",
        price: "",
        stock: "",
        images: []
    })

    const load = useRef(false)

    useEffect(() => {
        load.current = false
        setProductDetails({
            ...productDetails,
            name: product.name,
            category: product.category,
            description: product.description,
            price: product.price,
            stock: product.stock,
            oldImages : product.images,
            images: []
        })
    }, [product])

    //  remove image from array
    const removeImageFromArrayHandler = (removeImage, e) =>{
        e.preventDefault()
        setProductDetails({...productDetails, images : []})
    }

    // product details change handler
    const productDetailsChangeHandler = (e) =>{
        const {name, value} = e.target

        if(name === "file"){
           const files = Array.from(e.target.files)

           files.forEach((itme)=>{
               const reader = new FileReader()

               reader.onload = () =>{
                   if(reader.DONE){
                    setProductDetails({...productDetails, images : [...productDetails.images, reader.result]})
                   }
               }
               reader.readAsDataURL(itme)
           })
        }
        else{
            setProductDetails({...productDetails, [name]: value})
        }
    }

    // submit product detail
    const submitUpdateProductDetailsHandler = (e) =>{
        e.preventDefault()
        dispatch(updateProductAction(productDetails, id))
        load.current = true
    }

    useEffect(() => {
        dispatch(getProductDetails(id))
    }, [dispatch, id])

    // get all data after deleting/update product
    useEffect(()=>{
        if(updateProductLoading){
        }
        if(updateProductSuccess){
            load.current = false
            alert.success("Product updated successfully")
            history.push("/admin")
            dispatch(reset_success())
            dispatch(adminGetAllProducts())
        }
        if(updateProductError){
            alert.error(updateProductError)
        }
    },[ updateProductLoading , updateProductSuccess , updateProductError, alert, dispatch, history])

       // categories 
       const categories = [
        { name: "laptop" },
        { name: "mobile" },
        { name: "footwear"},
        { name: "shirt" },
        { name: "t-shirt" },
        { name: "fridge" },
        { name: "television"},
        { name: "washing-machine"},
        { name: "pant"},
        { name: "machine" },
        { name: "other" }
    ]

    return (
        <>
           {load.current && <Loader /> }
            <div className="container-fluid " style={{ display: "grid", placeItems: "center", minHeight: "85vh" }}>
                <div style={{ maxWidth: "360px", minWidth: "220px", marginTop: "2rem", width: "100%", border: "1px solid red", position: "relative" }}>
                    <span style={{ width: "max-content", background: "white", position: "absolute", top: "-6%", left: "3%", padding: "2px 6px", color: "red", fontWeight: "500" }}>Edit Product</span>
                    <form onSubmit={submitUpdateProductDetailsHandler} action="" className="" style={{ margin: "4% auto", width: "90%" }}>
                        <input onChange={(e)=>productDetailsChangeHandler(e)} className="form-control" style={{ fontSize: "100%", padding: "1% 3%", width: "80%", marginTop: "3px" }} defaultValue={productDetails.name} type="text" name="name" placeholder="Product Name.." id="" />
                        <fieldset style={{width:"80%", display:"flex", alignItems:"center"}}>
                        <input onChange={(e)=>productDetailsChangeHandler(e)} className="form-control" style={{ fontSize: "100%", padding: "1% 3%", width: "60%", marginTop: "3px" }} defaultValue={productDetails.category} type="text" name="category" placeholder="Category Name.." id="" />
                            <select style={{width:"40%", outline:"none", border:"none"}}>
                                <option>Suggestion</option>
                                {categories.map((cat,catI)=>{
                                    return <option key={catI}>{cat.name}</option>
                                })}
                            </select>
                            </fieldset>
                        <textarea onChange={(e)=>productDetailsChangeHandler(e)} className="form-control" style={{ fontSize: "100%", padding: "1% 3%", width: "80%", marginTop: "3px" }} defaultValue={productDetails.description} type="text" name="description" placeholder="Description.." id="" />
                        <input onChange={(e)=>productDetailsChangeHandler(e)} className="form-control" style={{ fontSize: "100%", padding: "1% 3%", width: "30%", marginTop: "3px" }} defaultValue={productDetails.price} type="number" name="price" placeholder="Price.." id="" />
                        <input onChange={(e)=>productDetailsChangeHandler(e)} className="form-control" style={{ fontSize: "100%", padding: "1% 3%", width: "30%", marginTop: "3px" }} defaultValue={productDetails.stock} type="number" name="stock" placeholder="Stock.." id="" />
                        <input multiple onChange={(e)=>productDetailsChangeHandler(e)} className="form-control" style={{ fontSize: "100%", padding: "1% 3%", width: "80%", marginTop: "3px" }} defaultValue={productDetails.images} type="file" name="file" accept="image/*" placeholder="file.." id="" />
                        <span style={{ width: "80%", maxWidth: "80%", display: "flex", position:"relative", overflowX: "auto", marginTop: "5px" }}>
                            <button onClick={(e)=>removeImageFromArrayHandler(productDetails.images, e)} style={{width:"16px", height:"16px", fontSize:"50%", background:"rgba(255, 255, 255, 0.328)", border:"none", position:"absolute", top:"0", left:"0"}}>X</button>
                            {productDetails && productDetails.images && productDetails.images.length > 0 && productDetails.images.length > 0 && productDetails.images.map((p, i) => {
                               return <span key={i}>
                                 <img id="fileInput" style={{ width: "3rem", height:"4rem" , objectFit:"contain", margin: "0 3px" }}  src={p} alt="" />
                                </span>
                            })}
                        </span>
                        <input type="submit" value="Update" style={{ float: "right", margin: "3% 20% 3% 0", padding: "2px 8px", color: "white", background: "tomato", border: "none", borderRadius: "3px" }} />
                    </form>
                </div>
            </div>
        </>
    );
}
export default UpdateProduct;