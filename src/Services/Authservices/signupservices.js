import axios from "axios";

export const signupService=async(signupData)=>{    
    try{
      const {data,status}=await axios.post("/api/auth/signup",signupData)
            
           return {data,status}; 
        }
        catch{
            console.error("signup failed");
        }
    
}