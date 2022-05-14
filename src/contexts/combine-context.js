import axios from "axios";
import { Action } from "history";
import { createContext, useContext, useState,useEffect,useReducer  } from "react";
import toast from "react-hot-toast";
import { createPostService, getpostofParticularuser,deletePostService,editPostService} from "../Services";
import { useAuth } from "./auth-context";
import { combineReducer } from "./reducer/postreducer";
import { reducerTypes } from "./reducer/reducertypes";
const {LOAD_POSTS,LOAD_USERDATA,ADD_POST,USERS_POSTLIST,DELETE_POST,EDIT_POST}=reducerTypes;

const PostContext=createContext();
const PostProvider=({children})=>{
    const {user:{userData,authenticationToken}}=useAuth();
    const initialState={
        postsList:[],
        userList:[],
        usersPostList:[],
        
    }

    const [state,dispatch]=useReducer(combineReducer,initialState);
     const [postData, setPostData] = useState({ content: "" });
     const [isEditing,setIsEditing]=useState(false);
    // get all posts
    useEffect(()=>{
        (async()=>{
            const {data}= await axios.get("/api/posts")
            const {data:{users}}=await axios.get("/api/users");
            const {data:{posts}}=await getpostofParticularuser(userData.username)
            
            // DISPLAYING USER EXCEPT LOGGEDUSER
            const exceptLoggeduser= users.filter((item)=>item.username !==userData.username) 
            dispatch({type:LOAD_POSTS,payload:data.posts});
            dispatch({type:LOAD_USERDATA,payload:exceptLoggeduser})
            dispatch({type:USERS_POSTLIST,payload:posts})
        })();
      
    },[])

    const createPostHandler=async(postData)=>{
        const {data,status}=await createPostService(postData,authenticationToken)
        console.log(data,status)
        if(status===200 || status===201)
        {
            dispatch({type:ADD_POST,payload:data.posts})
        }
        else{
            toast( "colud not complete the request",{icon:"❌"});
        }
    }

    const deletePostHandler=async(post)=>{
        const {data,status}=await  deletePostService(post._id,authenticationToken);
        if(status===200 || status===201)
        {
            dispatch({type:DELETE_POST,payload:data.posts})
        }
        else{
            toast( "colud not complete the request",{icon:"❌"});
        }

    }
    const editPostHandler =async(postData)=>{
        const {data,status}=await editPostService(postData,authenticationToken);
        if(status===200 || status===201)
        {
            dispatch({type:EDIT_POST,payload:data.posts})
        }
        else{
            toast( "colud not complete the request",{icon:"❌"});
        }
    }

    return (<PostContext.Provider value={{state,dispatch,createPostHandler,deletePostHandler,editPostHandler,setPostData,postData,isEditing,setIsEditing}}>{children}</PostContext.Provider>)
}

const usePosts=()=>useContext(PostContext);
export {PostProvider,usePosts};