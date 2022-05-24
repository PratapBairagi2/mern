import { useState } from "react";
import { NavLink, useHistory } from "react-router-dom"

const Search = () => {

    const history = useHistory()
    const [keyword, setKeyword] = useState("")

    const searchSubmitHandler = (e) => {
        e.preventDefault()

        if (keyword.trim()) {
            history.push(`/products/${keyword}`)
            // navigate(`/products/${keyword}`)
        }
        else {
            history.push("/products")
            // navigate("/products")

        }
    }

    return (
        <>
            {/* <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
                <div className="row">
                    <div className="col"> */}
            <form className='p-0 bg-transparent border-0  w-lg-25 w-100' style={{ display: "flex", alignItems: "center", justifyContent: "between" }} action="" onSubmit={searchSubmitHandler}>
            <input type="search"  onChange={(e) => setKeyword(e.target.value)} style={{ border: "1px solid grey", height: "2rem", width:"90%", borderRight: "1px solid transparent", outline: "none", borderTopLeftRadius: "5px", borderBottomLeftRadius: "5px", padding: ".3vmax .6vmax" }} />
                <NavLink to={`/products/${keyword}`} className="btn m-0 px-1 py-02" type="submit" value="search" >
                    <svg style={{ height: "2rem", fill: "blue", border: "1px solid grey", borderLeft: "1px solid transparent", padding: "4px", marginLeft: "-8px", borderTopRightRadius: "5px", borderBottomRightRadius: "5px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
                    </svg>
                </NavLink>
                {/* <input  className="m-0 px-1 py-2 bg-success text-light" style={{border:"1.5px solid transparent", borderTopRightRadius:"3px", borderBottomRightRadius:"2px"}} type="submit" value="search" /> */}

            </form>
            {/* </div>
                </div>
            </div> */}
        </>
    );
}
export default Search;