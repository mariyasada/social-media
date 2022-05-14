import axios from "axios";
export const removeFrombookmarkservice= async(postData,authenticationToken)=>{
    try {
        const {data,status}=await axios.post(`/api/users/remove-bookmark/${postData._id}`,{},{headers:{
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