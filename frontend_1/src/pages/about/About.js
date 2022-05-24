import React from 'react';
import service from "./images/service.jpg"

function About() {
    return (
        <>
            <div className="container-fluid" style={{ minHeight: "85vh", marginTop: "6vh", padding:"4%" }}>
                <h2 style={{ width: "max-content", margin: "2% auto", padding: "3px 16px", borderRadius: "6px", background: "tomato", color: "white" }}>About Us</h2>
                <div style={{display:"flex", flexWrap:"wrap"}}>
                    <div className="col col-md-6 col-12" style={{ padding: "5%", boxShadow:"0 0 3px tomato" }}>
                        <img style={{ width: "100%" }} src={service} alt="" />
                    </div>

                    <div className="col col-md-6 col-12" style={{ display: "flex", flexDirection: "column", border:"1px solid tomato", background:"rgb(232, 232, 232)" }}>
                        <div style={{width:"100%", }}>
                        <h3 style={{ width: "max-content", margin: "2% auto", color:"tomato" }}>About Services</h3>
                        <div style={{ width: "90%", margin: "2% auto", padding: "4%", boxShadow:"0 0 2px grey" }}>
                            <p style={{color:"grey"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum vel aliquid velit dolorem illo quas eos! Officiis nostrum ducimus totam nesciunt aliquam aspernatur sit ipsa maxime? Animi maiores et deleniti rerum ab, molestiae sint quos provident doloremque tenetur ullam saepe reiciendis quae tempora? Quia facere tempore cum voluptatibus laboriosam. Quidem!</p>
                        </div>
                        <div style={{ width: "90%", margin: "2% auto", display: "flex", flexWrap: "wrap", listStyle: "none", gap:"5px" }}>

                            <li style={{borderRadius:"6px", boxShadow:"0 1px 2px red", width: "max-content", minWidth: "4rem", display: "flex", flexWrap: "nowrap", alignItems: "center", padding: "3px 6px" }}>
                                <svg fill='tomato' width="2rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path d="M326.3 218.8c0 20.5-16.7 37.2-37.2 37.2h-70.3v-74.4h70.3c20.5 0 37.2 16.7 37.2 37.2zM504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-128.1-37.2c0-47.9-38.9-86.8-86.8-86.8H169.2v248h49.6v-74.4h70.3c47.9 0 86.8-38.9 86.8-86.8z" />
                                </svg>
                                <span style={{ fontSize: "100%", fontWeight: "600", color: "tomato", marginLeft: "4px" }}>Best Product</span>
                            </li>

                            <li style={{borderRadius:"6px", boxShadow:"0 1px 2px red", width: "max-content", minWidth: "4rem", display: "flex", flexWrap: "nowrap", alignItems: "center", padding: "3px 6px" }}>
                            <svg fill='tomato' width="2rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                <path d="M352 288h-16v-88c0-4.42-3.58-8-8-8h-13.58c-4.74 0-9.37 1.4-13.31 4.03l-15.33 10.22a7.994 7.994 0 0 0-2.22 11.09l8.88 13.31a7.994 7.994 0 0 0 11.09 2.22l.47-.31V288h-16c-4.42 0-8 3.58-8 8v16c0 4.42 3.58 8 8 8h64c4.42 0 8-3.58 8-8v-16c0-4.42-3.58-8-8-8zM608 64H32C14.33 64 0 78.33 0 96v320c0 17.67 14.33 32 32 32h576c17.67 0 32-14.33 32-32V96c0-17.67-14.33-32-32-32zM48 400v-64c35.35 0 64 28.65 64 64H48zm0-224v-64h64c0 35.35-28.65 64-64 64zm272 192c-53.02 0-96-50.15-96-112 0-61.86 42.98-112 96-112s96 50.14 96 112c0 61.87-43 112-96 112zm272 32h-64c0-35.35 28.65-64 64-64v64zm0-224c-35.35 0-64-28.65-64-64h64v64z"/>
                            </svg>
                                <span style={{ fontSize: "100%", fontWeight: "600", color: "tomato", marginLeft: "4px" }}>Best Price</span>
                            </li>

                            <li style={{borderRadius:"6px", boxShadow:"0 1px 2px red", width: "max-content", minWidth: "4rem", display: "flex", flexWrap: "nowrap", alignItems: "center", padding: "3px 6px" }}>
                            <svg fill='tomato' width="2rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                <path d="M624 352h-16V243.9c0-12.7-5.1-24.9-14.1-33.9L494 110.1c-9-9-21.2-14.1-33.9-14.1H416V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48v320c0 26.5 21.5 48 48 48h16c0 53 43 96 96 96s96-43 96-96h128c0 53 43 96 96 96s96-43 96-96h48c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM160 464c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm320 0c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm80-208H416V144h44.1l99.9 99.9V256z"/>
                            </svg>
                                <span style={{ fontSize: "100%", fontWeight: "600", color: "tomato", marginLeft: "4px" }}>Best Delivery</span>
                            </li>

                            <li style={{borderRadius:"6px", boxShadow:"0 1px 2px red", width: "max-content", minWidth: "4rem", display: "flex", flexWrap: "nowrap", alignItems: "center", padding: "3px 6px" }}>
                            <svg fill='tomato' width="2rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                <path d="M434.7 64h-85.9c-8 0-15.7 3-21.6 8.4l-98.3 90c-.1.1-.2.3-.3.4-16.6 15.6-16.3 40.5-2.1 56 12.7 13.9 39.4 17.6 56.1 2.7.1-.1.3-.1.4-.2l79.9-73.2c6.5-5.9 16.7-5.5 22.6 1 6 6.5 5.5 16.6-1 22.6l-26.1 23.9L504 313.8c2.9 2.4 5.5 5 7.9 7.7V128l-54.6-54.6c-5.9-6-14.1-9.4-22.6-9.4zM544 128.2v223.9c0 17.7 14.3 32 32 32h64V128.2h-96zm48 223.9c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zM0 384h64c17.7 0 32-14.3 32-32V128.2H0V384zm48-63.9c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16c0-8.9 7.2-16 16-16zm435.9 18.6L334.6 217.5l-30 27.5c-29.7 27.1-75.2 24.5-101.7-4.4-26.9-29.4-24.8-74.9 4.4-101.7L289.1 64h-83.8c-8.5 0-16.6 3.4-22.6 9.4L128 128v223.9h18.3l90.5 81.9c27.4 22.3 67.7 18.1 90-9.3l.2-.2 17.9 15.5c15.9 13 39.4 10.5 52.3-5.4l31.4-38.6 5.4 4.4c13.7 11.1 33.9 9.1 45-4.7l9.5-11.7c11.2-13.8 9.1-33.9-4.6-45.1z"/>
                            </svg>
                                <span style={{ fontSize: "100%", fontWeight: "600", color: "tomato", marginLeft: "4px" }}>Best Offers</span>
                            </li>

                            <li style={{borderRadius:"6px", boxShadow:"0 1px 2px red", width: "max-content", minWidth: "4rem", display: "flex", flexWrap: "nowrap", alignItems: "center", padding: "3px 6px" }}>
                            <svg fill='tomato' width="2rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                <path d="M0 432c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V256H0v176zm192-68c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H204c-6.6 0-12-5.4-12-12v-40zm-128 0c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM576 80v48H0V80c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48z"/>
                            </svg>
                                <span style={{ fontSize: "100%", fontWeight: "600", color: "tomato", marginLeft: "4px" }}>All Type Payments</span>
                            </li>

                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default About;