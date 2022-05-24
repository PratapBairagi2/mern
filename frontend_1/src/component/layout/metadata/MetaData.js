import Helmet from "react-helmet"
const functionName = ({title}) => {
    return(
        <>
            <Helmet>
                <title style={{textTransform:"uppercase"}}>{title}</title>
            </Helmet>
        </>
    )
}
export default functionName;