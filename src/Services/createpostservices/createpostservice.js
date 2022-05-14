import axios from "axios";

export const createPostService= async(postData,authenticationToken)=>{
    try {
        const {data,status}=await axios.post("/api/posts",{postData},{headers:{
            authorization: authenticationToken
            
        }})
        
        return {data,status}
    }
    catch(err)
    {
        console.log("could not complete the request",err)
    }
}