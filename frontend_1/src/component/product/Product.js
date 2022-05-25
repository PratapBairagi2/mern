import ReactStars from "react-rating-stars-component"
import {NavLink} from "react-router-dom"


const Product = (prod) => {
    
    const ratingStarOptions ={
        // count:"4",
        edit:false,
        value:Number(prod.product.ratings),
        isHalf:true,
        activeColor:"tomato",
        size: window.innerWidth > 600 ? 24 : 15
    }


    return (
        <NavLink to={`/product/${prod.product._id}`} key={prod.product._id} className="row d-flex flex-column py-2 px-0 productCard text-decoration-none mt-2" style={{width:"45%", maxWidth:"300px", boxShadow:"0 0 2px grey", borderRadius:"3px", margin:"4px"}}>
            <img style={{width:"100%", margin:"0 auto"}} src={prod.product.images[0].url} alt={prod.product.name} />
            <p className="productName fw-bold text-center text-danger m-0 mt-2">{prod.product.name}</p>
            <p className="productPrice fw-bold text-danger fs-5 text-center m-0 p-0">$ {prod.product.price}</p>

            <div className="ratingStars d-flex flex-row justify-content-center align-items-center" style={{ width:"98%", flexWrap:"wrap"}}>
                <ReactStars  {...ratingStarOptions}/>
                <span style={{width:"max-content"}}>( { prod.product.reviews.length} reviews )</span>
            </div>

        </NavLink>
    );
}
export default Product;