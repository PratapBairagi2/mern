import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../loader/Loader";
import { adminGetAllProducts, createNewProductAction, deleteProductAction, reset_success } from "../../../redux/actions/productActions";
import {useAlert} from "react-alert"
import {NavLink, useHistory} from "react-router-dom"


const ProductsList = () => {

    
    const dispatch = useDispatch()
    const { loading, success, products } = useSelector(state => state.products)
    const { loading: loadingDeleteProduct, success: successDeleteProduct, error: errorDeleteProduct } = useSelector(state => state.deleteProduct)
    const {loading : createProductLoading, success : createProductSuccess, error: createProductError} = useSelector(state=>state.newProduct)
    const alert = useAlert()
    const history = useHistory()

    useEffect(() => {
        dispatch(adminGetAllProducts())
        if(successDeleteProduct){
            alert.success("Product deleted successfully !")
            dispatch(reset_success())
        }
        if(createProductSuccess){
            alert.success("New product added successfully !")
            dispatch(reset_success())
        }
        if(errorDeleteProduct){
            alert.error("something went wring while deleting error, re-login and try !")
        }
        if(createProductError){
            alert.error("something went wring while deleting error, re-login and try !")
        }
        
    }, [dispatch, successDeleteProduct,errorDeleteProduct,createProductError, createProductSuccess, alert])

    const deleteProductFun = async (e) => {
        const id = e
        dispatch(deleteProductAction(id))
    }

    // create new product 
    const [newProduct, setNewProduct] = useState({
        name: "",
        category: "",
        description: "",
        price: "",
        stock: "",
        images: []
    })

    const productDetailsHandler = (e) => {
        const { name, value } = e.target

        if (name === "file") {

            const files = Array.from(e.target.files)
            files.forEach((file) => {

                const reader = new FileReader()

                reader.onload = () => {
                    if (reader.DONE) {
                        setNewProduct({ ...newProduct, images : [...newProduct.images, reader.result]})
                    }
                }
                reader.readAsDataURL(file)
            })
        }
        else {
            setNewProduct({ ...newProduct, [name]: value })
        }
    }

    const constnNewProductSubmitHandler = (e) => {
        e.preventDefault()
        if(newProduct.name && newProduct.category && newProduct.description && newProduct.images && newProduct.stock && newProduct.price){
            dispatch(createNewProductAction(newProduct))
        }
        else{
            alert.error("All Fields are required !")
        }
    }

    //  updatew producr route handler
    const updateProductRoute = (id) =>{
        history.push(`/product/update/${id}`)
    }

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
        {(loading || loadingDeleteProduct || createProductLoading) && <Loader/>}
        
            <div style={{ height: "94vh", overflowX: "hidden", overflowY: "auto", width: "100%", padding: "2%", display: "flex", flexWrap: "wrap" }}>
                <div style={{ display: "flex", overflow: "hidden", flexWrap: "wrap", width: "max-content", minWidth: "100%", justifyContent: "space-evenly" }}>

                    <div style={{ width: "max-content", minWidth: "100%", overflow: "auto" }}>
                        <table className="table table-responsive" style={{ width: "100%", boxShadow: "0 0 2px grey" }} >
                            <thead style={{ background: "tomato", color: "white", border: "2px solid tomato" }}>
                                <tr>
                                    <td>ID</td>
                                    <td>Name</td>
                                    <td>Created</td>
                                    <td>Image</td>
                                    <td>Stock</td>
                                    <td>Price</td>
                                    <td>Link</td>
                                    <td>Edit</td>
                                    <td>Delete</td>
                                </tr>
                            </thead>

                            <tbody>
                                {loading ? <Loader /> :
                                    success && products.map((v, i) => {
                                        return <tr key={i} style={{ fontSize: "80%" }}>

                                            <td>{v._id}</td>

                                            <td>{v.name}</td>

                                            <td>
                                                <span style={{ display: "flex", flexDirection: "column" }}>
                                                    <span style={{ width: "max-content" }}>{new Date(v.createdAt).toLocaleString().split(",")[0]}</span>
                                                    <span style={{ width: "max-content" }}>{new Date(v.createdAt).toLocaleString().split(",")[1]}</span>
                                                </span>
                                            </td>

                                            <td>
                                                <img style={{ width: "2rem" }} src={v.images[0].url} alt="" />
                                            </td>

                                            <td>{v.stock}</td>

                                            <td>{v.price}</td>

                                            <td>
                                                <NavLink to={`/product/${v._id}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="blue" className="bi bi-link" viewBox="0 0 16 16">
                                                        <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
                                                        <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z" />
                                                    </svg>
                                                    </NavLink>
                                            </td>

                                            <td>
                                                <svg onClick={()=>updateProductRoute(v._id)} style={{ cursor: "pointer", width: "1.6rem", fill: "blue" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                                    <path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z" />
                                                </svg>
                                            </td>

                                            <td>
                                                <svg onClick={() => deleteProductFun(v._id)} style={{ fill: "red", width: "1rem", cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                    <path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z" />
                                                </svg>
                                            </td>
                                        </tr>

                                    })}
                            </tbody>
                        </table>
                    </div>

                    <div style={{ maxWidth: "360px", minWidth: "220px", marginTop: "2rem", width: "100%", border: "1px solid red", position: "relative" }}>
                        <span style={{ width: "max-content", background: "white", position: "absolute", top: "-6%", left: "3%", padding: "2px 6px", color: "red", fontWeight: "500" }}>Create New Product</span>
                        <form onSubmit={constnNewProductSubmitHandler} className="" style={{ margin: "4% auto", width: "90%" }}>
                            <input onChange={(e) => productDetailsHandler(e)} defaultValue={newProduct.name} className="form-control" style={{ fontSize: "90%", padding: "1% 3%", width: "80%", marginTop: "3px" }} type="text" name="name" placeholder="Product Name.." id="" />
                           <fieldset style={{width:"80%", display:"flex", alignItems:"center"}}>
                           <input onChange={(e) => productDetailsHandler(e)} defaultValue={newProduct.category} className="form-control" style={{ fontSize: "90%", padding: "1% 3%", width: "60%", marginTop: "3px" }} type="text" name="category" placeholder="Category Name.." id="" /> 
                            <select style={{width:"40%", outline:"none", border:"none"}}>
                                <option>Suggestion</option>
                                {categories.map((cat,catI)=>{
                                    return <option key={catI}>{cat.name}</option>
                                })}
                            </select>
                            </fieldset>

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
                    </div>

                </div>
            </div>
        </>
    );
}
export default ProductsList;