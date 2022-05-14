import axios from "axios";

export const getpostofParticularuser= async(username)=>{
    try {
        const {data,status}=await axios.get(`/api/posts/user/${username}`)
        return {data,status}
    }
    catch(err)
    {
        console.log("could not complete the request",err)
    }
}