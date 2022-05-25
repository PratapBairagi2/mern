import veg from "./images/colorful-veggies-frame-with-copy-space.jpg"
import shirtRack from "./images/clothing-rack-with-floral-hawaiian-shirts-hangers-hat.jpg"
import girlShopping from "./images/surprised-girl-pink-culottes-posing-with-trolley-full-multi-colored-packages-with-new-clothes.jpg"
import shop from "./images/front-view-woman-with-shopping-bag-concept.jpg"
import shirts from "./images/hawaiian-shirts-with-floral-print-hangers.jpg"

const HomeSlide = () => {
    return (
    <>
        <div  style={{minHeight:"0", width:"100%"}}>
            <div style={{minHeight:"0", display:"flex", flexDirection:"column"}}>
                <div style={{minHeight:"0", width:"100%"}}>
                    <div className="carousel slide" id="slideContainer" data-bs-ride="carousel" style={{minHeight:"0"}}>
                        <ol className="carousel-indicators" style={{marginTop:"-50%"}}>
                            <li data-bs-target="#slideContainer" className="active" data-bs-slide-to="0"></li>
                            <li data-bs-target="#slideContainer" data-bs-slide-to="1"></li>
                            <li data-bs-target="#slideContainer" data-bs-slide-to="2"></li>
                        </ol>

                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img style={{width:"100%", maxHeight:"88vh", objectFit:"cover"}} src={shirtRack} alt="" />
                            </div>
                            <div className="carousel-item">
                                <img style={{width:"100%", maxHeight:"88vh", objectFit:"cover"}}  src={veg} alt="" />
                            </div>
                            <div className="carousel-item">
                                <img style={{width:"100%", maxHeight:"88vh", objectFit:"cover"}} src={shirts} alt="" />
                            </div>
                        </div>

                        <a href="#slideContainer" data-bs-slide="prev" role="button" className="carousel-control-prev">
                            <span className="carousel-control-prev-icon"></span>
                        </a>
                        <a href="#slideContainer" data-bs-slide="next" role="button" className="carousel-control-next">
                            <span className="carousel-control-next-icon"></span>
                        </a>

                    </div>
                </div>
            </div>
        </div>
    </>
    );
}
export default HomeSlide;