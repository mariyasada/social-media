import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import {useAuth} from "../contexts";

export const RequireAuth = ({children}) => {
    
   const {isUserLoggedIn,user}=useSelector(state=>state.auth);
    const location=useLocation();
    // console.log(user);
    // if(user)
    // {

    return (isUserLoggedIn ?children:<Navigate to="/login" state={{from:location}} replace/>)
    // }
    // else{
    //     console.log("could not complete the request");
    // }
}


