import LoginUser from "./login/Login";
import RegisterUser from "./registration.js/registration";
import MetaData from "../../component/layout/metadata/MetaData"

const LogReg = () => {
    // const auth = useSelector(state=>state.userRegister)

    return(
        <>
        <MetaData title="GUEST LOGIN OR REGISTRATION : ECOMMERCE"/>
        
            <div className="" style={{maxWidth:"50rem", width:"90%", margin:"0 auto", marginTop:"13vh", boxShadow:"0 0 3px grey"}}>
                <div className="row mx-0" >
                    
                    <div className="col col-12">
                        <ul className="nav nav-tabs d-flex" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" role="tab" data-bs-toggle="tab" data-bs-target="#login">Login</button>
                            </li>

                            <li className="nav-items" role="presentation">
                                <button className="nav-link" role="tab" data-bs-toggle="tab" data-bs-target="#registration">Registration</button>
                            </li>
                        </ul>
                    </div>

                    <div className="col col-12" style={{minHeight:"78vh"}} >
                        <div className="tab-content">
                            <div className="tab-pane active fade show" id="login" role="tabpanel">
                                <h1 className="text-center mt-4 fw-bold">LOGIN</h1>
                                <LoginUser/>
                            </div>

                            <div className="tab-pane" id="registration" role="tabpanel">
                                <h1 className="text-center mt-3 fw-bold">REGISTRATION</h1>
                                <RegisterUser/>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        
        </>
    )
}
export default LogReg;