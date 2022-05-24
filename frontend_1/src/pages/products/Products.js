
import "./product.css"
import { clearAllError, getProducts } from "../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useAlert } from "react-alert"
import Product from "../../component/product/Product";
import Loader from "../../component/loader/Loader";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination"
import MetaData from "../../component/layout/metadata/MetaData"

import washing from "./images/reshot-icon-washing-machine-GCVKUPWTBN.svg"
import laptop from "./images/reshot-icon-notebook-line-UBN45VM6ZE.svg"
import mobile from "./images/reshot-icon-mobile-phone-line-TPSAB4RY3H.svg"
import shirt from "./images/reshot-icon-shirt-G2A7JLM6HN.svg"
import footwear from "./images/reshot-icon-heel-6KJRXQHPTG.svg"
import pant from "./images/reshot-icon-shorts-J9AMTPQRKH.svg"
import tv from "./images/reshot-icon-tv-HR8QLZCPJS.svg"
import tshirt from "./images/reshot-icon-t-shirt-43SPM859QE.svg"
import fridge from "./images/reshot-icon-fridge-LT4Y3BWQUP.svg"
import other from "./images/reshot-icon-idea-question-SYJGL9DWCX.svg"
import machine from "./images/reshot-icon-machine-WGPZ5EUMLY.svg"
import noFilter from "./images/noFilter.svg"
import searchSvg from "./images/search.svg"









const Products = () => {
    const dispatch = useDispatch()
    const data = useSelector(pro => pro.products)

    const keyword = useParams()

    const [currentPage, setCurrentPage] = useState(1)
    const [category, setCategory] = useState("")
    var [ratings, setRatings] = useState(0)


    const resultPerPage = data.success ? data.resultPerPage : 0
    const productsCount = data.success ? data.productCount : 0

    // for filtered/particular searched product keyword
    const alert = useAlert()

    const currentPageNoHandler = (e) => {
        setCurrentPage(e)
    }

    useEffect(() => {
        if (data.error) {
            alert.error(data.error)
            dispatch(clearAllError())
        }

        dispatch(getProducts(keyword, currentPage, price, category, ratings))
    }, [dispatch, data.error, keyword, currentPage, category, ratings, alert])


    const [price, setPrice] = useState({ priceStart: Number(0), priceEnd: Number(99999) })

    const priceChangeHandler = (e) => {
        const { name, value } = e.target
        setPrice({ ...price, [name]: value })
    }

    const submitFilterPriceHandler = (e) => {
        dispatch(getProducts(keyword, currentPage, price, category))
    }

    // categories 
    const categories = [
        {all:"", image:noFilter},
        { name: "laptop", image: laptop },
        { name: "mobile", image: mobile },
        { name: "footwear", image: footwear },
        { name: "shirt", image: shirt },
        { name: "t-shirt", image: tshirt },
        { name: "fridge", image: fridge },
        { name: "television", image: tv },
        { name: "washing-machine", image: washing },
        { name: "pant", image: pant },
        { name: "machine", image: machine },
        { name: "other", image: other }
    ]

    // sidebar
    const lis = document.querySelectorAll("aside ul button")
    lis.forEach((effect, i) => {
        effect.addEventListener("click", function () {
          
            if (this.parentElement.lastChild.style.display == "flex") {
                this.parentElement.lastChild.style.display = "none"
                this.children[1].innerText = "+"
                this.classList.add("active")

            }
            else {
                this.parentElement.lastChild.style.display = "flex"
                this.children[1].innerText = "-"
            }
            lis.forEach(classR=>{
                classR.classList.remove("active")
                // this.classList.add("active")
            })
          

        })
    })

    // filter toggle
    const  filterContainerToggleFun = () =>{
        document.getElementById("filterContainer").style.display =="flex"?
         document.getElementById("filterContainer").style.display ="none"
         : 
         document.getElementById("filterContainer").style.display ="flex"
    }

    return (
        <>

            <MetaData title={`PRODUCT SEARCH : ECOMMERCE`} />

            <div className="" style={{ display: "flex", marginTop:"10vh", minHeight:"85vh" , flexDirection:"column"}}>

                {/* <aside className="aside" style={{ width: "20%", minWidth: "5rem", maxWidth: "7rem",  padding: "0", background:"tomato" }}>

                    <ul style={{ width: "100%", position:"relative", marginTop: "24%", padding: "0", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", alignContent: "flex-start", justifyItems: "flex-start" }}>
                        <button className="li" style={{ display: "flex", height: "2rem", border:"none", outline:"none", alignItems: "center", justifyContent: "center", width: "100%", fontSize:"80%" }}>
                            <p style={{ padding: "0", margin: "0", width: "max-content" }}>Price</p>
                            <p style={{  width: "20%", margin: "0", padding: "0", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "600" }}>+</p>
                        </button>
                        <form className="filterTypes" style={{ width: "100%", display: "none", flexDirection: "column", margin: "20% auto", alignItems: "center" }} action="">
                            <input style={{ maxWidth: "5rem", width: "100%", height: "2rem", textAlign: "center", padding: "5px 10px" }} onChange={(e) => priceChangeHandler(e)} type="number" value={price.priceStart} name="priceStart" placeholder="price" id="" />
                            <span style={{ width: "100%", maxWidth: "5rem", textAlign: "center" }}>To</span>
                            <input style={{ maxWidth: "5rem", width: "100%", height: "2rem", textAlign: "center", padding: "5px 5px" }} onChange={(e) => priceChangeHandler(e)} type="number" value={price.priceEnd} name="priceEnd" placeholder="price" id="" />

                            <input type="button" style={{ width: "100%", maxWidth: "5rem" }} value="search" onClick={submitFilterPriceHandler} />
                        </form>
                    </ul>

                    <ul style={{ width: "100%", position:"relative", padding: "0", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", alignContent: "flex-start", justifyItems: "flex-start" }}>
                    <button className="li" style={{ display: "flex", height: "2rem", border:"none", outline:"none", alignItems: "center", justifyContent: "center", width: "100%", fontSize:"80%" }}>
                            <p style={{ padding: "0", margin: "0", width: "max-content",  }}>Category</p>
                            <p style={{  width: "20%", margin: "0", padding: "0", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "600" }}>+</p>

                        </button>
                        <ul className=" filterTypes" style={{ width: "100%", maxWidth: "530px", margin: "20% auto", display: "none", flexWrap: "wrap" }}>
                            {categories.map((cat, i) => {
                                return <li className="btn mx-2 p-2" style={{ border: "none", backgroundImage: `url(${cat.image})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center", width: "2rem", height: "2rem", color: "transparent" }} onClick={(e) => setCategory(e.target.innerText)} value={category} key={cat.name}>{cat.name}</li>
                            })}
                        </ul>
                    </ul>

                    <ul style={{ width: "100%", position:"relative", height: "max-content", padding: "0", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", alignContent: "flex-start", justifyItems: "flex-start" }}>
                    <button className="li" style={{ display: "flex", height: "2rem", border:"none", outline:"none", alignItems: "center", justifyContent: "center", width: "100%", fontSize:"80%" }}>
                            <p style={{ padding: "0", margin: "0", width: "max-content" }}>Ratings</p>
                            <p style={{  width: "20%", margin: "0", padding: "0", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "600" }}>+</p>

                        </button>
                        <div className="filterTypes" style={{ margin: "20% auto", height: "9rem", width: "100%", maxWidth: "5rem", position: "relative", maxHeight: "auto", display: "none", flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
                            <div style={{ width: "100%", position: "relative", textAlign: "right" }}>{ratings}</div>
                            <span style={{ width: "50%", position: "absolute", bottom: "0", textAlign: "center" }}>0</span>
                            <input onChange={(e) => setRatings(e.target.value)} value={ratings} className="mt-1" style={{ height: "3px", width: "6rem", position: "absolute", transform: "rotateZ(-90deg)" }} type="range" name="" max="5" min="0" step="0.5" id="" />
                            <span style={{ width: "50%", textAlign: "center", position: "absolute", top: "0" }}>5</span>
                        </div>
                    </ul>

                </aside> */}

                <h2 className="px-1 py-0 mt-3" style={{ width: "max-content", borderBottom: "2px solid red", margin: "0 auto" }}>PRODUCTS</h2>
                {data.loading ?
                    <Loader /> :
                    <div className="row featureProducts p-lg-3 p-1 py-3 mt-3 justify-content-evenly" style={{ width: "100%", margin: "0 auto" }}>
                        {data.success && data.products.map((prod, i) => {
                            return <Product key={prod._id} product={prod} />
                        })}
                    </div>
                }

            </div>

                <button style={{marginTop:"3%", width:"2rem", height:"2rem", position:"fixed", background:"transparent", top:"8%", zIndex:"6", border:"none"}} onClick={filterContainerToggleFun}>
                    <svg width="1.5rem" height="1.5rem" fill="blue" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z"/>
                    </svg>
                </button>

            <div id="filterContainer" style={{width:"96%", maxWidth:"360px", height:"83.2%", display:"none", flexDirection:"column", alignItems:"center", justifyContent:"center", position:"fixed", zIndex:"5", background:"white", top:"9.6%", left:"0" , padding:"0"}}>
            {/* price */}
            <div  className="container priceSearchContainer" style={{ maxWidth:"600px",minWidth:"240px", margin:"0 auto", marginTop:"6%", width:"70%"}}>
                <p className="fw-bold text-danger" style={{ width: "max-content", margin: "0 auto" }}>PRICE RANGE</p>
                <form style={{ width: "100%", display:"flex", flexWrap:"wrap", justifyContent:"center", alignItems:"center", margin: "4% auto", height: "max-content", padding:"0 0 3% 0"  }} action="">
                    <input style={{ maxWidth: "5rem", width:"25%", height: "2rem", textAlign:"center", padding:"5px 10px", marginTop:"4%" }} onChange={(e) => priceChangeHandler(e)} type="number" value={price.priceStart} name="priceStart" placeholder="price" id="" />
                    <span className="mx-2" style={{width:"15%", maxWidth:"2rem", textAlign:"center", marginTop:"4%"}}>To</span>
                    <input className="mx-2" style={{ maxWidth: "5rem",width:"25%", height: "2rem", textAlign:"center", padding:"5px 6px", marginTop:"4%" }} onChange={(e) => priceChangeHandler(e)} type="number" value={price.priceEnd} name="priceEnd" placeholder="price" id="" />
                    <button type="submit" style={{width:"2.2rem", background:"transparent", height:"1.8rem", maxWidth:"5rem", marginTop:"4%",border:"none",}} value="" onClick={submitFilterPriceHandler} >
                        <svg fill="blue" xmlns="http://www.w3.org/2000/svg" width="1.8rem" height="1.8rem" viewBox="0 0 512 512">
                            <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/>
                        </svg>
                    </button>
                </form>
            </div>

            {/* category */}
            <div className="container categoryContainer my-2" style={{width:"70%",maxWidth:"600px", minWidth:"240px", marginTop:"2%"}}>
                <p className="fw-bold text-danger" style={{ width: "100%", textAlign:"center", margin: "4% auto" }}>CATEGORY</p>
                <ul style={{width:"100%", maxWidth:"530px", height:"max-content", margin: "0 auto", display:"flex", flexWrap:"wrap", alignItems:"center",justifyContent:"center", padding:"0"}}>
                    {categories.map((cat, i) => {
                        return <li className="btn mx-2 p-2" style={{ border: "none", backgroundImage: `url(${cat.image})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center", width: "2rem", height: "2rem", color: "transparent" }} onClick={(e) => setCategory(e.target.innerText)} value={category} key={i}>{cat.name}</li>
                    })}
                </ul>
            </div>

            {/* rating */}
             <div className="container " style={{ maxWidth: "600px", width:"70%",marginTop:"2%" }} >
                <p className="p-0 text-danger fw-bold" style={{ width: "max-content", margin: "4% auto"}}>RATINGS</p>

                <div className="col col-12 d-flex align-items-center justify-content-center">
                    <span className="mx-1">0</span> <input onChange={(e) => setRatings(e.target.value)} value={ratings} className="mt-1" style={{ height: "3px" }} type="range" name="" max="5" min="0" step="0.5" id="" /><span className="mx-1">5</span>
                </div>
                <div className="col col-12 p-0 text-center">{ratings}</div>
            </div>
        </div>

            <div style={{ width: "max-content", margin: "1rem auto" }}>
                {data.success && resultPerPage < data.filteredProductsCount &&

                    <Pagination
                        onChange={currentPageNoHandler}
                        activePage={currentPage}
                        prevPageText="Prev"
                        nextPageText="Next"
                        firstPageText="First Page"
                        lastPageText="Last Page"
                        itemClass="pageItemClass"
                        linkClass="pageLinkClass"
                        itemsCountPerPage={resultPerPage}
                        totalItemsCount={Number(productsCount)}
                        activeClass="pageItemActive"
                        activeLinkClass="pageLinkActive"
                    //    pageRangeDisplayed={5}
                    />
                }
            </div>

            <div>
            </div>

        </>
    );
}
export default Products;