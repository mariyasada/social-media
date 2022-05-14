import axios from "axios";

export const addTobookmarksservice= async(postData,authenticationToken)=>{
    try {
        const {data,status}=await axios.post(`/api/users/bookmark/${postData._id}`,{},{headers:{
            authorization: authenticationToken  
        }})
        return {data,status}
    }
    catch(err)
    {
        console.log("could not complete the request",err)
    }
}