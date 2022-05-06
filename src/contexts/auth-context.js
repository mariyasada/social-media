import { createContext,useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { logInService,signupService,signOutService } from "../Services";
import toast from "react-hot-toast";

const authContext=createContext();
const token=JSON.parse(localStorage.getItem("auth_token"));
const initialAuthState={
    isLoggedIn:token?true:false,
    authenticationToken:token,
}
const AuthProvider=({children})=>{
    const [user,setUser]=useState(initialAuthState);
    const navigate=useNavigate();

    const logInHandler= async(logInData)=>{
        const {data,status}= await logInService(logInData);
        if(status===200)
        {
            localStorage.setItem("auth_token",JSON.stringify(data.encodedToken));
            setUser({isLoggedIn:true,authenticationToken:data.encodedToken});
             toast("Successfully loggedIn", { icon:  "✔️"  });
             navigate("/");
        }
        else{
             toast("Something went wrong", { icon:  "❌"  });
        }
    }

    const signUpHandler=async({signupData})=>{
        const {data,status}= await signupService(signupData);
        if(status===201)
        {
            localStorage.setItem("auth_token",JSON.stringify(data.encodedToken))
            toast("Successfully Registered", { icon:  "✔️"  });
            navigate("/login");
        }
         else{
             toast("Something went wrong", { icon:  "❌"  });
        }
    }

    const signOutHandler=()=>{
        signOutService();
        setUser({loginStatus:false})   
        toast("Logged out successfully", { icon:  "✔️"  }); 
        navigate("/");  
    }
    return <authContext.Provider value={{user,setUser,logInHandler,signUpHandler,signOutHandler}}>{children}</authContext.Provider>
}

const useAuth=()=>useContext(authContext);
export {useAuth,AuthProvider};