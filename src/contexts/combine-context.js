import axios from "axios";
import { Action } from "history";
import { createContext, useContext, useState,useEffect,useReducer  } from "react";
import toast from "react-hot-toast";
import { createPostService, getpostofParticularuser,deletePostService,editPostService,getallbookmarks,addTobookmarksservice,removeFrombookmarkservice, likedPostService,dislikedPostService} from "../Services";
import { useAuth } from "./auth-context";
import { combineReducer } from "./reducer/postreducer";
import { reducerTypes } from "./reducer/reducertypes";
const {LOAD_POSTS,LOAD_USERDATA,ADD_POST,USERS_POSTLIST,DELETE_POST,EDIT_POST,LOAD_BOOKMARKS,ADD_TO_BOOKMARK,REMOVE_FROM_BOOKMARK,LIKED_POST,DISLIKED_POST,LIKE_POST_FROM_BOOKMARK}=reducerTypes;

const PostContext=createContext();
const PostProvider=({children})=>{
    const {user:{userData,authenticationToken}}=useAuth();
    const initialState={
        postsList:[],
        userList:[],
        usersPostList:[],
        bookmarkList:[] ,     
    }

    const [state,dispatch]=useReducer(combineReducer,initialState);
     const [postData, setPostData] = useState({ content: "" });
     const [isEditing,setIsEditing]=useState(false);
    // get all posts
    useEffect(()=>{
        (async()=>{
            const {data}= await axios.get("/api/posts")
            const {data:{users}}=await axios.get("/api/users");
             const {data:{bookmarks}}= await getallbookmarks(authenticationToken);
            const {data:{posts}}=await getpostofParticularuser(userData.username);
            
            // DISPLAYING USER EXCEPT LOGGEDUSER
            const exceptLoggeduser= users.filter((item)=>item.username !==userData.username) 
            dispatch({type:LOAD_POSTS,payload:data.posts});
            dispatch({type:LOAD_USERDATA,payload:exceptLoggeduser})
            dispatch({type:USERS_POSTLIST,payload:posts})
            dispatch({type:LOAD_BOOKMARKS,payload:bookmarks})
        })();
      
    },[])

    const createPostHandler=async(postData)=>{
        const {data,status}=await createPostService(postData,authenticationToken)
        if(status===200 || status===201)
        {
            dispatch({type:ADD_POST,payload:data.posts})
        }
        else{
            toast( "could not complete the request",{icon:"❌"});
        }
    }

    const deletePostHandler=async(post)=>{
        const {data,status}=await  deletePostService(post._id,authenticationToken);
        if(status===200 || status===201)
        {
            dispatch({type:DELETE_POST,payload:data.posts})
            toast("post deleted",{icon:"✔"});
        }
        else{
            toast( "could not complete the request",{icon:"❌"});
        }

    }
    const editPostHandler =async(post)=>{
        const {data,status}=await editPostService(post,authenticationToken);
        if(status===200 || status===201)
        {
            dispatch({type:EDIT_POST,payload:data.posts})
        }
        else{
            toast( "could not complete the request",{icon:"❌"});
        }
    }

    const addPostToBookmark =async(post)=>{
        const {data,status}= await addTobookmarksservice(post,authenticationToken);
        console.log(data,"hello bookmark");
        if(status===200 || status===201)
        {
            dispatch({type:ADD_TO_BOOKMARK,payload:data.bookmarks})
            toast("Added to bookmarks",{icon:"✔👍"})
        }
        else{
            toast( "could not complete the request",{icon:"❌"});
        }
    }

    const removePostFromBookmark=async(post)=>{
        const {data,status}= await removeFrombookmarkservice(post,authenticationToken);
        if(status===200 || status===201)
        {
            dispatch({type:REMOVE_FROM_BOOKMARK,payload:data.bookmarks})
            toast("remove to bookmarks",{icon:"✔👍"})
        }
        else{
            toast( "could not complete the request",{icon:"❌"});
        }
    }

    const likedPostHandler=async(post)=>{
        const {data,status}= await likedPostService(post,authenticationToken);
         console.log(data,"hello hi");
        if(status===200 || status===201)
        {
            dispatch({type:LIKED_POST,payload:data.posts})
            // dispatch({type:LIKE_POST_FROM_BOOKMARK,payload:data.posts})
            toast("post liked",{icon:"✔👍"})
        }
        else{
            toast( "could not complete the request",{icon:"❌"});
        }
    }

    const dislikePostHandler=async(post)=>{
        const {data,status}= await dislikedPostService(post,authenticationToken);
        if(status===200 || status===201)
        {
            dispatch({type:DISLIKED_POST,payload:data.posts})
            toast("post disliked",{icon:"❌👍"})
        }
        else{
            toast( "could not complete the request",{icon:"❌"});
        }

    }

    return (<PostContext.Provider value={{state,dispatch,createPostHandler,deletePostHandler,editPostHandler,setPostData,postData,isEditing,setIsEditing,addPostToBookmark ,removePostFromBookmark,likedPostHandler,dislikePostHandler}}>{children}</PostContext.Provider>)
}

const usePosts=()=>useContext(PostContext);
export {PostProvider,usePosts};