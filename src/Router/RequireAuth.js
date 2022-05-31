import { Navigate, useLocation,useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile } from "../redux/auth/authslice";
import { useEffect } from "react";

export const RequireAuth = ({children}) => { 
   const {isUserLoggedIn}=useSelector(state=>state.auth);
   const location=useLocation();  
   const navigate = useNavigate();
   const dispatch = useDispatch();
  useEffect(() => {
    const currentUserId = localStorage.getItem("user_id");
    if (currentUserId) {
      (async () => {
        await dispatch(getUserProfile());
        navigate(`${location.pathname}`);
      })();
    } else {
      navigate("/login", { state: { from: location }, replace:true});
    }
  }, []);

  return <div>{children}</div>;
//    return (currentUserId ?children:<Navigate to="/login" state={{from:location}} replace/>)
}


