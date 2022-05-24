
import ReactStars from "react-rating-stars-component";
import { useSelector } from "react-redux";
import "./reviewCard.css"
import defaultUser from "./user.png"

const ReviewCard = ({ review }) => {

    const starOptions = {
        edit: false,
        isHalf: true,
        color:"grey",
        activeColor: "white",
        value:Number(review.rating)
    }

    const {user} = useSelector(state=>state.userRegister)




    return (
        <>
                    <div className="col col-xl-3 col-lg-4 col-md-6 col-12 d-flex flex-column align-items-center reviewBackground p-3">

                        <div className="reviewUserDetails d-flex flex-column align-items-center" style={{ width: "30%" }}>

                            <img style={{ width: "50%", aspectRatio: "1/1", marginLeft: "6px", borderRadius:"50%" }} src={user ? user.avatar[0].url : defaultUser} alt="" />
                            <p className="m-0 px-2 fw-bold" style={{ marginLeft: "10px", width: "max-content" }}>{review.name}</p>
                            <div className="stars bg-dark px-2 m-0" style={{ width: "max-content", borderRadius: "6px" }}>
                                <ReactStars {...starOptions} />
                            </div>
                        </div>

                        <p className="mt-2">{review.comment}</p>
                    </div>
               
        </>
    );
}
export default ReviewCard;