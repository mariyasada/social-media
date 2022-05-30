import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import {useAuth} from "../contexts";

export const RequireAuth = ({children}) => {
    
   const {isUserLoggedIn,user}=useSelector(state=>state.auth);
   console.log(isUserLoggedIn);
    const location=useLocation();
    const token=localStorage.getItem("token");
    // if(token)
    // {
    return (
        isUserLoggedIn ? children: <Navigate to="/login" state={{from:location}} replace/>
        )
    // }
    // else{
    //     console.log("could not complete the request");
    // }
}


