

const Contact = () => {
    const messageSubmitFun = (e) =>{
        e.preventDefault()
    }


    return (
    <>
        <div className="container-fluid" style={{minHeight:"85vh", marginTop:"12vh"}}>
            <div className="row" style={{display:"flex", flexDirection:"column",alignItems:"center"}}>
                <div className="col col-12">
                    <h1 style={{width:"max-content", margin:"0 auto", borderBottom:"1px solid red"}}>Contact Us</h1>
                </div>
                <form onSubmit={messageSubmitFun} className="col col-12 form" style={{display:"flex", flexDirection:"column", alignItems:"center", width:"max-content",padding:"2%", margin:"2% 0", boxShadow:"0 2px 3px grey"}}>
                    <div className="form-group" style={{maxWidth:"20rem",minWidth:"15rem", width:"100%",margin:"2% 0", fontWeight:"600"}}>
                        <label style={{background:"tomato", color:"white", width:"100%",padding:"2px 4%"}} htmlFor="">Subject</label>
                        <input className="form-control" type="text" placeholder="Enter subject..." required/>
                    </div>
                    <div className="form-group" style={{maxWidth:"20rem",minWidth:"15rem", width:"100%",margin:"2% 0", fontWeight:"600"}}>
                        <label style={{background:"tomato", color:"white", width:"100%",padding:"2px 4%"}} htmlFor="">Email</label>
                        <input className="form-control" type="email" placeholder="Enter Mail ID..." required/>
                    </div>
                    <div className="form-group" style={{maxWidth:"30rem", width:"100%", minWidth:"20rem", margin:"2% 0"}}>
                        <label style={{background:"tomato", color:"white", width:"100%", padding:"2px 4%", textAlign:"right", fontWeight:"600"}} htmlFor="">Message</label>
                        <textarea className="form-control" type="text" placeholder="Enter message..." required/>
                    </div>
                    <input style={{background:"tomato", color:"white", maxWidth:"20rem",fontWeight:"600", border:"none", marginBottom:"4%", borderRadius:"6px", width:"100%", padding:"2px 4%"}} type="submit" value="Submit" />
                </form>
            </div>
        </div>
    </>
    );
}
export default Contact;