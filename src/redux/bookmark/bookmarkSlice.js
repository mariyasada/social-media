import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDoc,collection, addDoc, getDocs, deleteDoc, query,where, updateDoc,doc, arrayUnion } from "firebase/firestore";
import { app,db } from "../../firebaseconfige";
import { LikedPost,disLikedPost,deletePost ,editPost} from "../post/postSlice";

const initialState = {
  bookmarks:[],
  error:null,
  status:"idle",
  getbookmarkStatus:"idle",
  deletebookmarkStatus:"idle"
};

const collectionRef=collection(db,"bookmarks")

export const addToBookmark =createAsyncThunk("bookmark/addToBookmark",async(post,{getState})=>{
    const userState=getState();
  const userData=userState.auth.user;
    try {
        
      const bookmarkRef= await addDoc(collectionRef,{postId:post.id,userId:userData.id})
      await updateDoc(bookmarkRef,{bookmarkId:bookmarkRef.id});
      const bookmark={post,bookmarkId:bookmarkRef.id};
     return bookmark;

    }
    catch(err){
        console.log("something went wrong",err);
        return Promise.reject(err);
    }

})

export const getBookmarks=createAsyncThunk("bookmark/getBookmarks",async(arg,{getState})=>{
    
  try{
    const userstate=getState();
    const user=userstate.auth.user;
    const currentUserId=localStorage.getItem("user_id") ; 
    const bookmarkQuery=query(collectionRef,where("userId", "==", currentUserId)) 
    const allBookmarkSnap=await getDocs(bookmarkQuery);
    let bookmarks=[];
    for await (const bookmark of allBookmarkSnap.docs){         
      const bookmarkData=bookmark.data()
      const postRef= await getDoc(doc(db,"posts",bookmarkData.postId))
      const postData=postRef.data();
     const userSnap=await getDoc(doc(db,"users",postData.userId))     
      const userData=userSnap.data();  
      bookmarks = [
          ...bookmarks,
          { post: { ...postData, user:userData }, bookmarkId: bookmark.id },
        ];

    }
    return bookmarks;
  }
  catch(err){
    console.log(err,"something went wrong");
    return Promise.reject(err);
  }
})

export const deletePostFromBookmark= createAsyncThunk("bookmark/deletePostFromBookmark",async({bookmarkId,id})=>{   
  try
  {
    await deleteDoc(doc(db,"bookmarks",bookmarkId));
    return bookmarkId;
  }
  catch(err){
    console.log(err,"something went wrong");
    return Promise.reject(err);
  }
})

const BookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {},
  extraReducers: {
     [addToBookmark.fulfilled]: (state, action) => {
     state.bookmarks=state.bookmarks.concat(action.payload);
     state.status="succeed"
    },
    [addToBookmark.pending]: (state, action) => {
     state.status="loading"
    },
    [addToBookmark.rejected]: (state, action) => { 
     state.status="could not complete the request"
    },
    [getBookmarks.fulfilled]: (state, action) => {
     state.bookmarks=action.payload; 
     state.getbookmarkStatus="succeed"
    },
    [getBookmarks.pending]: (state, action) => {
      state.getbookmarkStatus = "loading";
    },
    [getBookmarks.rejected]: (state, action) => {
      state.error = `could not complete the request`;
      state.getbookmarkStatus = "rejected";
    },
    [deletePostFromBookmark.fulfilled]: (state, action) => {
    state.bookmarks=state.bookmarks.filter((bookmark)=>bookmark.bookmarkId !==action.payload); 
     state.deletebookmarkStatus="succeed"
    },
    [deletePostFromBookmark.pending]: (state, action) => {
      state.deletebookmarkStatus = "loading";
    },
    [deletePostFromBookmark.rejected]: (state, action) => {
      state.error = `could not complete the request`;
      state.deletebookmarkStatus = "rejected";
    },
    [LikedPost.fulfilled]:(state,action)=>{
      state.bookmarks=state.bookmarks.map((bookmark)=>{
        if(bookmark.post.id ===action.payload.PostId){
          return{...bookmark,post:{...bookmark.post,likes:bookmark.post.likes.concat(action.payload.userId)}}
        }
        return bookmark;        
      })
      
    },
    [disLikedPost.fulfilled]:(state,action)=>{
      state.bookmarks=state.bookmarks.map((bookmark)=>{
        if(bookmark.post.id===action.payload.PostId){
          return {...bookmark,post:{...bookmark.post,likes:bookmark.post.likes.filter(id=>id!==action.payload.userId)}}
          }
        return bookmark;
      })
    },
    [deletePost.fulfilled]: (state, action) => {
     state.bookmarks=state.bookmarks.filter((bookmark)=>bookmark.post.id !==action.payload); 
    },
    [editPost.fulfilled]:(state,action)=>{
      state.bookmarks= state.bookmarks.map((bookmark)=>bookmark.post.id === action.payload.id ?      
      {...bookmark,post:action.payload}:bookmark); 
    }
  }
})

export default BookmarkSlice.reducer;