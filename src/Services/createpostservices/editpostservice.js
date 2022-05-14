import axios from "axios";

export const editPostService= async(postData,authenticationToken)=>{
    try {
        const {data,status}=await axios.post(`/api/posts/edit/${postData._id}`,{postData},{headers:{
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