import "./App.css";
import { AppRoutes } from "./AppRoutes";
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { getUserProfile } from "./redux/auth/authslice";
import { useLocation, useNavigate } from "react-router-dom";


function App() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const location=useLocation();
  const {isUserLoggedIn}=useSelector(state=>state.auth);
  const currentUserId=localStorage.getItem("user_id");
  useEffect(()=>{
    dispatch(getUserProfile())
    console.log(isUserLoggedIn,"hello");
    // if(!isUserLoggedIn)
    // {
    //   navigate(location?.pathname);
    // }
    // else{
    //   navigate("/");
    // }
    
  },[dispatch,isUserLoggedIn])
 

  return (
    <div className="App">
      <AppRoutes/>
      <Toaster
        position="top-right"
        toastOptions={{ className: "toast-display", duration: 3500 }}
      />   
    </div>
  );
}
export default App;
