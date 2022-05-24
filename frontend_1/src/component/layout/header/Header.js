import React, { useEffect, useState } from 'react';
import "./header.css"
import { NavLink } from "react-router-dom"
import Search from '../../searchProduct/Search';
import { useSelector } from 'react-redux';

function Header(user) {

    const {cartItems} = useSelector(state=>state.cart)

    const [itemsIncart, setItemsInCart] = useState(0)

    useEffect(()=>{
        if(cartItems){
        var i = 0
        cartItems.map(v=> i+=+ v.quantity)
        setItemsInCart(i)
        }
    },[cartItems])

    return (
        <>
            <nav className='navbar navbar-light navbar-expand-lg p-0 py-2' style={{ minWidth: "260px", width:"100%", boxShadow: "0 0 4px grey", position:"fixed",top:"0", left:"0", zIndex:"10", background:"white" }}>
                <div className="container-fluid">

                    <div className="col col-lg-5 col-9 border-1">
                        <ul className='navbar-nav d-flex flex-row w-100 align-items-center'>

                            <li className='mx-1' style={{ minWidth: "100px", order:"3" }} >
                                <div className='p-0 m-0 bg-transparent border-0  w-lg-25 w-100' style={{ display: "flex", alignItems: "center", justifyContent: "between" }}>
                                    <Search />
                                </div>
                            </li>

                            <li className='nav-item mx-1'>
                                <NavLink to="/cart" className='nav-navlink p-2 bg-transparent border-0 btn' style={{ minWidth: "1rem", minHeight: "1rem", display:"flex", flexDirection:"column", position:"relative" }}>
                                {/* {user.userDetails.isAuthenticated &&   */}
                                <p className='p-0 m-0' style={{position:"absolute", fontSize:"70%", width:"50%", height:"55%", top:"-10%",right:"0", fontWeight:"650", background:"red", display:"grid", lineHeight:"110%", borderRadius:"50%", color:"white", placeItems:"center"}}>{itemsIncart}</p>
                                {/* } */}
                                    <svg style={{ minWidth: "1.5rem", fill: "blue" }} className="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                        <path d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z" />
                                    </svg>
                                </NavLink>
                            </li>

                            <li className="nav-item mx-1" style={{order:"1"}} >
                                {user.userDetails.isAuthenticated ?

                                    <NavLink to="/dashboard" className="nav-link p-1 bg-transparent border-0 btn d-flex flex-column align-items-center" style={{ minWidth: "1rem", minHeight: "1rem" }}>
                                        <img style={{ minWidth: "1.3rem", fill: "blue", maxHeight: "2rem", aspectRatio:"1/1", boxShadow:"0 0 3px grey", borderRadius:"50%"}} src={user.userDetails.user.avatar[0].url} alt="" />
                                        {/* <span title={user.userDetails.user.name} style={{fontSize:"70%", textTransform:"uppercase", whiteSpace:"nowrap", maxWidth:"3.3rem", textOverflow:"ellipsis", overflow:"hidden", fontWeight:"700", color:"tomato" }}>{user.userDetails.user.name}</span> */}
                                    </NavLink>
                                    :

                                    <NavLink to="/user" className="nav-link p-1 bg-transparent border-0 btn" style={{ minWidth: "1rem", minHeight: "1rem" }}>
                                        <svg style={{ minWidth: "1.3rem", fill: "blue", maxHeight: "2rem" }} className="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                            <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z" />
                                        </svg>
                                    </NavLink>}
                            </li>

                        </ul>
                    </div>

                    <div className="col col-3 d-flex justify-content-end" >
                        <button className='navbar-toggler' type='button p-0' data-bs-toggle="collapse" style={{ width: "auto" }} data-bs-target="#navbarSupportedContent" >
                            <span className="navbar-toggler-icon p-2"></span>
                        </button>
                    </div>


                    <div className="collapse navbar-collapse mt-lg-0 mt-5 mx-2" id="navbarSupportedContent">
                        <div className="col" id='id'>

                            <ul className='navbar-nav d-flex flex-row flex-lg-row w-100 flex-column justify-content-end'>
                                <li className="nav-item mx-2">
                                    <NavLink to="/" className="nav-navlink p-2  border-0 btn  w-lg-25 w-100 menubtn">Home</NavLink>
                                </li>
                                <li className="nav-item mx-2">
                                    <NavLink to="/products" className="nav-link p-2  border-0 btn  w-lg-25 w-100 menubtn">Products</NavLink>
                                </li>
                                <li className="nav-item mx-2">
                                    <NavLink to="/about" className="nav-link p-2  border-0 btn  w-lg-25 w-100 menubtn">About</NavLink>
                                </li>
                                <li className="nav-item mx-2">
                                    <NavLink to="/contact" className="nav-link p-2  border-0 btn  w-lg-25 w-100 menubtn" >Contact</NavLink>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>

            </nav>
        </>
    );
}

export default Header;