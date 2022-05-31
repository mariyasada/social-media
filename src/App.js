import "./App.css";
import { AppRoutes } from "./AppRoutes";
import { Toaster } from 'react-hot-toast';
import { useEffect } from "react";
import { useDispatch} from "react-redux";
import { getUserProfile } from "./redux/auth/authslice";


function App() {
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getUserProfile())
  },[dispatch])
  

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
