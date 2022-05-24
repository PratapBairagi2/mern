import "./home.css"
import Product from "../../component/product/Product"
import MetaData from "../../component/layout/metadata/MetaData"
import { useEffect, useState } from "react"
import { getProducts } from "../../redux/actions/productActions"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../../component/loader/Loader"

import {useAlert} from "react-alert"
import HomeSlide from "./homeSlide"
import About from "../about/About"
import { useParams } from "react-router-dom"
import  Pagination  from "react-js-pagination"
import Contact from "../contact/Contact"

const Home = () => {

    const dispatch = useDispatch()

    const alert = useAlert()

    const data= useSelector(pro => pro.products)
    const [resultPerPage, setResultPerPage] = useState(0)
    const [totalItems, setTotalItems] = useState(0)
    const [currentPage, setSetCurrentPage] = useState(1)


     // pagination
     const pro = useSelector(state=>state.products)

    useEffect(() => {
        if(data.error){
           return alert.error(data.error)
        }
            dispatch(getProducts("",currentPage))

    }, [dispatch, data.error, currentPage])

    useEffect(()=>{
        if(pro.success){
            setResultPerPage(pro.resultPerPage)
            setTotalItems(pro.productCount)
        }
    },[pro])

    const currentPageHandler = (e) =>{
        setSetCurrentPage(e)
    }

   

    return (
        <>
        {data.loading? <Loader/> :
        <>
        
            <MetaData title={"Ecommerce - Home Page"} />
            <div className="homeContainer ">
                <div className="homeContainer_row">
                    <div className="homeContainer_banner">
                        <div className="home" >
                            <HomeSlide/>
                        </div>
                    </div>
                    <div className="homeContainer_products">
                        <h2 className="homeHeader fw-bold"> Feature Products </h2>

                        <div className="row featureProducts p-lg-3 p-1 py-3 mt-3 justify-content-evenly" style={{ margin: "0 auto" }}>
                            {data.loading === true? "Loading" : data.success === true && data.products.map((prod,i)=>{
                                return <Product key={prod._id} product={prod} />
                            })}
                        </div>
                        <div style={{ display:"flex", justifyContent:"center", alignItems:"center"}}>
                        <Pagination
                        onChange={currentPageHandler}
                        activePage={currentPage}
                        firstPageText="First Page"
                        lastPageText="Last Page"
                        prevPageText="Prev"
                        nextPageText="Next"
                        itemClass="pageItemClass"
                        linkClass="pageLinkClass"
                        activeClass="pageItemActive"
                        activeLinkClass="pageLinkActive"
                        itemsCountPerPage={resultPerPage}
                        totalItemsCount={totalItems}
                        />
                        </div>
                    </div>
                    <About/>
                    <Contact/>
                </div>
            </div>
            </>
        }
        </>
    );
}
export default Home;