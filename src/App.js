import "./App.css";
import { AppRoutes } from "./AppRoutes";
import { Toaster } from 'react-hot-toast';
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app,db } from "./firebaseconfige";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/auth/authslice";
import {useNavigate} from "react-router-dom";


function App() {
  const auth=getAuth(app);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  
  // useEffect(()=>{
  //    const unsubscribe = onAuthStateChanged(auth,async(user)=>{
  //     const userRef=await getDoc(doc(db,"users",user.uid))
  //     const userData=userRef.data();
  //     dispatch(setUser(userData));
      
  //      console.log(userData);
  //      navigate("/home")
  //    })
  //    return ()=>unsubscribe();
  // },[])

//   useEffect(async()=>{
//       const userRef=await getDoc(doc(db,"users",user.uid))
//       const userData=userRef.data();
//       onAuthStateChanged(auth,(userData)=>{
//         if(userData){
//           dispatch(setUser(userData));
//           navigate("/home");
//         }
//         else{
//           navigate("/login");
//         }
      
//   })
// }
//   ,[]);

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
