import axios from "axios";

export const createPostService= async(postData,authenticationToken)=>{
    console.log(postData);
    console.log(authenticationToken);
    try {
        const {data,status}=await axios.post("/api/posts",{postData},{headers:{
            authorization: authenticationToken
            
        }})
        console.log(data,status);
        return {data,status}
    }
    catch(err)
    {
        console.log("could not complete the request",err)
    }
}