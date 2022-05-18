import axios from "axios";

export const logInService=async(logInData)=>{    
    try{
      const {data,status}=await axios.post("/api/auth/login",logInData)
             
           return {data,status}; 
        }
        catch(err){
            console.error("LogIn failed");
            return Promise.reject(err);
        }
    
}