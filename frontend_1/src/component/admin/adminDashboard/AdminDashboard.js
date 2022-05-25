
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminOrdersAction } from "../../../redux/actions/orderAction";
import { adminGetAllProducts } from "../../../redux/actions/productActions";
import "./adminDashboard.css"
import OrderList from "../orderList/OrderList";
import ProductsList from "../productsList/ProductsList";
import ReviewsList from "../reviewsList/ReviewsList";
import UsersList from "../usersList/UsersList";


// javascript interview questions / preparation
// lexican scope, funcftional scope
// host object and native obj
// generator

const Summary = () => {



    const dispatch = useDispatch()
    // const { loading, success, error, orders } = useSelector(state => state.getAdminOrders)

    useEffect(() => {
        dispatch(getAdminOrdersAction())
        dispatch(adminGetAllProducts())
    }, [dispatch])

    const list = document.querySelectorAll(".navigation li");
    const adminContents = document.querySelectorAll(".admin-contents .AdminContent")

    list.forEach((item) => {
        item.addEventListener("mouseover", function () {
            list.forEach((element, i) => {
                element.classList.remove("hovered")
                this.classList.add("hovered")


                if (element.className === "hovered") {
                    adminContents[i - 1]?.classList.add("activeAdminContent")
                }
                if (element.className !== "hovered") {

                    adminContents[i - 1]?.classList.remove("activeAdminContent")
                }
            })
        })
    })



    return (
        <>
            <div className="admin-container">


                <div className="navigation">
                    <ul className="m-0 p-0">
                        <li>
                            <button >
                                <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
                                    <title>Logo Apple</title><path d="M349.13 136.86c-40.32 0-57.36 19.24-85.44 19.24-28.79 0-50.75-19.1-85.69-19.1-34.2 0-70.67 20.88-93.83 56.45-32.52 50.16-27 144.63 25.67 225.11 18.84 28.81 44 61.12 77 61.47h.6c28.68 0 37.2-18.78 76.67-19h.6c38.88 0 46.68 18.89 75.24 18.89h.6c33-.35 59.51-36.15 78.35-64.85 13.56-20.64 18.6-31 29-54.35-76.19-28.92-88.43-136.93-13.08-178.34-23-28.8-55.32-45.48-85.79-45.48z" /><path d="M340.25 32c-24 1.63-52 16.91-68.4 36.86-14.88 18.08-27.12 44.9-22.32 70.91h1.92c25.56 0 51.72-15.39 67-35.11 14.72-18.77 25.88-45.37 21.8-72.66z" />
                                </svg>
                                <span className="title">Brand name</span>
                            </button>
                        </li>

                        <li>
                            <button >
                                <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
                                    <title>Person Circle</title><path d="M258.9 48C141.92 46.42 46.42 141.92 48 258.9c1.56 112.19 92.91 203.54 205.1 205.1 117 1.6 212.48-93.9 210.88-210.88C462.44 140.91 371.09 49.56 258.9 48zm126.42 327.25a4 4 0 01-6.14-.32 124.27 124.27 0 00-32.35-29.59C321.37 329 289.11 320 256 320s-65.37 9-90.83 25.34a124.24 124.24 0 00-32.35 29.58 4 4 0 01-6.14.32A175.32 175.32 0 0180 259c-1.63-97.31 78.22-178.76 175.57-179S432 158.81 432 256a175.32 175.32 0 01-46.68 119.25z" /><path d="M256 144c-19.72 0-37.55 7.39-50.22 20.82s-19 32-17.57 51.93C191.11 256 221.52 288 256 288s64.83-32 67.79-71.24c1.48-19.74-4.8-38.14-17.68-51.82C293.39 151.44 275.59 144 256 144z" />
                                </svg>

                                <span className="title">Summary</span>
                            </button>
                        </li>

                        <li>
                            <button >
                                <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
                                    <title>People Circle</title><path d="M256 464c-114.69 0-208-93.31-208-208S141.31 48 256 48s208 93.31 208 208-93.31 208-208 208zm0-384c-97 0-176 79-176 176s79 176 176 176 176-78.95 176-176S353.05 80 256 80z" /><path d="M323.67 292c-17.4 0-34.21-7.72-47.34-21.73a83.76 83.76 0 01-22-51.32c-1.47-20.7 4.88-39.75 17.88-53.62S303.38 144 323.67 144c20.14 0 38.37 7.62 51.33 21.46s19.47 33 18 53.51a84 84 0 01-22 51.3C357.86 284.28 341.06 292 323.67 292zm55.81-74zM163.82 295.36c-29.76 0-55.93-27.51-58.33-61.33-1.23-17.32 4.15-33.33 15.17-45.08s26.22-18 43.15-18 32.12 6.44 43.07 18.14 16.5 27.82 15.25 45c-2.44 33.77-28.6 61.27-58.31 61.27zM420.37 355.28c-1.59-4.7-5.46-9.71-13.22-14.46-23.46-14.33-52.32-21.91-83.48-21.91-30.57 0-60.23 7.9-83.53 22.25-26.25 16.17-43.89 39.75-51 68.18-1.68 6.69-4.13 19.14-1.51 26.11a192.18 192.18 0 00232.75-80.17zM163.63 401.37c7.07-28.21 22.12-51.73 45.47-70.75a8 8 0 00-2.59-13.77c-12-3.83-25.7-5.88-42.69-5.88-23.82 0-49.11 6.45-68.14 18.17-5.4 3.33-10.7 4.61-14.78 5.75a192.84 192.84 0 0077.78 86.64l1.79-.14a102.82 102.82 0 013.16-20.02z" />
                                </svg>

                                <span className="title">Customers</span>
                            </button>
                        </li>

                        <li>
                            <button >


                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                    <path d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z" />
                                </svg>
                                <span className="title">Reviews</span>
                            </button>
                        </li>

                        <li>
                            <button >
                                <svg enableBackground="new 0 0 64 64" height="64px" id="Layer_1" version="1.1" viewBox="0 0 64 64" width="64px" xmlns="http://www.w3.org/2000/svg" >
                                    <g><path d="M23.734,28.125c1.104,0,2-0.896,2-2v-7.8c0-3.487,2.837-6.325,6.324-6.325c3.487,0,6.325,2.838,6.325,6.325v7.8   c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2v-7.8C42.384,12.632,37.752,8,32.058,8c-5.692,0-10.324,4.632-10.324,10.325v7.8   C21.734,27.229,22.63,28.125,23.734,28.125z" /><path d="M55,23.631H44.384v2.494c0,2.206-1.794,4-4,4s-4-1.794-4-4v-2.494h-8.649v2.494c0,2.206-1.794,4-4,4s-4-1.794-4-4v-2.494H9   c-0.552,0-0.893,0.435-0.762,0.971l6.998,28.497C15.658,54.701,17.344,56,19,56h26c1.658,0,3.342-1.299,3.766-2.901l6.996-28.497   C55.893,24.065,55.553,23.631,55,23.631z" /></g>
                                </svg>
                                <span className="title">Orders</span>
                            </button>
                        </li>

                        <li>
                            <button >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M11,5.17157288 L9.34314575,6.82842712 C8.56209717,7.60947571 8.56209717,8.87580567 9.34314575,9.65685425 L10.715317,11.0290255 C10.3655671,11.6107838 9.72823668,12 9,12 L5,12 C3.8954305,12 3,11.1045695 3,10 L3,5 C3,3.8954305 3.8954305,3 5,3 L9,3 C10.1045695,3 11,3.8954305 11,5 L11,5.17157288 Z M15.7071068,3.29289322 L19.9497475,7.53553391 C20.3402718,7.9260582 20.3402718,8.55922318 19.9497475,8.94974747 L15.9333254,12.9841634 L14.0925387,12.9841634 L10.0502525,8.94974747 C9.65972824,8.55922318 9.65972824,7.9260582 10.0502525,7.53553391 L14.2928932,3.29289322 C14.6834175,2.90236893 15.3165825,2.90236893 15.7071068,3.29289322 Z M5,13 C3.8954305,13 3,13.8954305 3,15 L3,19 C3,20.1045695 3.8954305,21 5,21 L19,21 C20.1045695,21 21,20.1045695 21,19 L21,15 C21,13.8954305 20.1045695,13 19,13 L5,13 Z" />
                                </svg>
                                <span className="title">Products</span>
                            </button>
                        </li>

                        <li>
                            <button >
                                <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
                                    <title>Chatbubble Ellipses</title><path d="M87.48 380c1.2-4.38-1.43-10.47-3.94-14.86a42.63 42.63 0 00-2.54-3.8 199.81 199.81 0 01-33-110C47.64 139.09 140.72 48 255.82 48 356.2 48 440 117.54 459.57 209.85a199 199 0 014.43 41.64c0 112.41-89.49 204.93-204.59 204.93-18.31 0-43-4.6-56.47-8.37s-26.92-8.77-30.39-10.11a31.14 31.14 0 00-11.13-2.07 30.7 30.7 0 00-12.08 2.43L81.5 462.78a15.92 15.92 0 01-4.66 1.22 9.61 9.61 0 01-9.58-9.74 15.85 15.85 0 01.6-3.29z" fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" /><circle cx="160" cy="256" r="32" /><circle cx="256" cy="256" r="32" /><circle cx="352" cy="256" r="32" />
                                </svg>

                                <span className="title">Message</span>
                            </button>
                        </li>

                        <li>
                            <button >
                                <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
                                    <title>Help Circle</title><path d="M256 80a176 176 0 10176 176A176 176 0 00256 80z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32" /><path d="M200 202.29s.84-17.5 19.57-32.57C230.68 160.77 244 158.18 256 158c10.93-.14 20.69 1.67 26.53 4.45 10 4.76 29.47 16.38 29.47 41.09 0 26-17 37.81-36.37 50.8S251 281.43 251 296" fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="28" /><circle cx="250" cy="348" r="20" />
                                </svg>

                                <span className="title">Help</span>
                            </button>
                        </li>

                    </ul>
                </div>

                {/* admin pannel contents */}
                <div className="admin-contents">

                    <div className="AdminContent">

                    </div>

                    <div className="AdminContent">
                        <span style={{ maxWidth: "max-content", margin: "0 auto" }}>Users</span>
                        <UsersList />

                    </div>

                    <div className="AdminContent">
                        <span style={{ maxWidth: "max-content", margin: "0 auto" }}>Reviews</span>
                        <ReviewsList />
                    </div>

                    <div className="AdminContent">
                        <span style={{ maxWidth: "max-content", margin: "0 auto" }}>Orders</span>
                        <OrderList />
                    </div>
                    <div className="AdminContent">
                        <span style={{ maxWidth: "max-content", margin: "0 auto" }}>Products</span>
                        <ProductsList />
                    </div>
                    <div className="AdminContent">six</div>
                    <div className="AdminContent">seven</div>

                </div>

            </div>
        </>
    )
}
export default Summary