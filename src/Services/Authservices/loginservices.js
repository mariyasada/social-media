import axios from "axios";

export const logInService=async(logInData)=>{    
    try{
      const {data,status}=await axios.post("/api/auth/login",logInData)
            
            console.log(data,status) ;  
           return {data,status}; 
        }
        catch{
            console.error("LogIn failed");
        }
    
}