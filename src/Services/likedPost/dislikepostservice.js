import axios from "axios";

export const dislikedPostService= async(postData,authenticationToken)=>{
    try {
        const {data,status}=await axios.post(`/api/posts/dislike/${postData._id}`,{},{headers:{
            authorization: authenticationToken  
        }})
        return {data,status}
    }
    catch(err)
    {
        console.log("could not complete the request",err)
    }
}