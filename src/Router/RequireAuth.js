import { Navigate, useLocation } from "react-router-dom";
import {useAuth} from "../contexts";

export const RequireAuth = ({children}) => {
    const {user:{isLoggedIn}}=useAuth();
    const location=useLocation();
    return (isLoggedIn ?children:<Navigate to="/login" state={{from:location}} replace/>)
  
}


