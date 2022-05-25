import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({auth, component: Element, ...rest }) => {
    const {loading} = useSelector(state=>state.userRegister)
    return (
    <>
       {/* { loading && <Route {...rest} render={(props)=>{
            if(auth ) <Component {...props}/>;
            if( !auth ) <Redirect to={{path:"/", state:{from:props.location}}} />
        }}
        />} */}
        <Route {...rest} render={(props)=>{
                if(auth) return <Element {...props}/>
                if(!auth) return <Redirect to={{path: "/", state:{from:props.location}}}/>
            }}
            />
    </>
    );
}
export default ProtectedRoute;