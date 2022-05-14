import axios from "axios";

export const getallbookmarks= async(authenticationToken)=>{
    try {
        const {data,status}=await axios.get(`/api/users/bookmark`,{headers:{
            authorization: authenticationToken
            
        }})
        
        return {data,status}
    }
    catch(err)
    {
        console.log("could not complete the request",err)
    }
}