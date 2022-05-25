import { useEffect, useState } from "react";


const ProgressStep = ({step}) => {

     const [steps, setSteps] = useState({
         one:"grey",
         two:"grey",
         three:"grey"
     })

    useEffect(()=>{
        if(step){
            if(step===1){
                setSteps({
                    ...steps, one:"green"
                })
            }
            if(step===2){
                setSteps({
                    ...steps, one:"green", two:"green"
                })
            }
            if(step===3){
                setSteps({
                    ...steps, one:"green", two:"green", three:"green"
                })
            }
        }
    },[step, steps ])

    return (
        <>
        <div className="container-fluid">
            <div style={{ width: "80%", height: "5px", maxWidth: "900px", margin: "0 auto", display: "flex", justifyContent: "center" }}>

                <div style={{ width: "40%", height: "2px", border: `1px solid ${steps.one}`, maxWidth: "900px" }}>
                    <div style={{ width: "1rem", height: "1rem", marginTop: "-.5rem", marginLeft: "23%", background: `${steps.one}`, borderRadius: "50%", fontSize: ".5rem", redSpace: "nowrap", lineHeight: "3rem" }}>
                        <span style={{ marginLeft: "-150%", color: `${steps.one}`,  whiteSpace:"nowrap" }}>Shipping Details</span>
                    </div>
                </div>

                <div style={{ width: "33%", height: "2px", border: `1px solid ${steps.two}`, maxWidth: "900px" }}>
                    <div style={{ width: "1rem", height: "1rem", marginTop: "-.5rem", marginLeft: "-1%", background: `${steps.two}`, borderRadius: "50%", fontSize: ".5rem", redSpace: "nowrap", lineHeight: "3rem" }}>
                        <span style={{ marginLeft: "-150%", color: `${steps.two}`,  whiteSpace:"nowrap" }}>Order Confirm</span>
                    </div>
                </div>

                <div style={{ width: "13.5%", height: "2px", border: `1px solid ${steps.three}`, maxWidth: "900px" }}>
                    <div style={{ width: "1rem", height: "1rem", marginTop: "-.5rem", marginLeft: "-1%", background: `${steps.three}`, borderRadius: "50%", fontSize: ".5rem", redSpace: "nowrap", lineHeight: "3rem" }}>
                        <span style={{ marginLeft: "-150%", color: `${steps.three}`,  whiteSpace:"nowrap" }}>Payment Success</span>
                    </div>
                </div>

            </div>
            </div>
        </>
    );
}
export default ProgressStep;