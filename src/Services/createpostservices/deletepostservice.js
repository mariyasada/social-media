import axios from "axios";

export const deletePostService= async(postId,authenticationToken)=>{
    try {
        const {data,status}=await axios.delete(`/api/posts/${postId}`,{headers:{
            authorization: authenticationToken
            
        }})
        return {data,status}
    }
    catch(err)
    {
        console.log("could not complete the request",err)
    }
}