import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDoc,collection, addDoc, getDocs, deleteDoc, query,where, updateDoc,doc, arrayUnion } from "firebase/firestore";
import { app,db } from "../../firebaseconfige";
import { LikedPost,disLikedPost } from "../post/postSlice";

const initialState = {
  bookmarks:[],
  error:null,
  status:"idle",
  getbookmarkStatus:"idle",
  deletebookmarkStatus:"idle"
};

const collectionRef=collection(db,"bookmarks")

export const addToBookmark =createAsyncThunk("bookmark/addToBookmark",async(post,{getState})=>{
    console.log(post,"addtobookmark");
    const userState=getState();
  const userData=userState.auth.user;
  console.log(userData,"bookmark");
    try {
        const bookmarkRef = await addDoc(collectionRef,post);
        await updateDoc(bookmarkRef,{bookmarkId:bookmarkRef.id,userId:userData.id});
        const bookmarkSnapData= await getDoc(bookmarkRef);
        console.log(bookmarkRef);
        console.log(bookmarkSnapData);
        if(bookmarkSnapData.exists()){
        return bookmarkSnapData.data();
      } 
      else{         
        console.log("could not complete the request");
      }
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
    // const bookmarkQuery=query(collectionRef,where("user.id", "==", user.id)) 
    const bookmarkQuery=query(collectionRef,where("userId", "==", user.id)) 
    console.log(bookmarkQuery);
    const allBookmarkSnap=await getDocs(bookmarkQuery);
    const allbookmarks=allBookmarkSnap.docs.map(bookmark=>bookmark.data())
    console.log(allbookmarks,"all bookmarks");
    return allbookmarks;
  }
  catch(err){
    console.log(err,"something went wrong");
    return Promise.reject(err);
  }
})

export const deletePostFromBookmark= createAsyncThunk("bookmark/deletePostFromBookmark",async({bookmarkId,id})=>{
    console.log(bookmarkId);
   
  try
  {
    const bookmarkRef=await deleteDoc(doc(db,"bookmarks",bookmarkId));
    console.log(bookmarkRef);
    return id;
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
        console.log(action.payload);
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
    state.bookmarks=state.bookmarks.filter((post)=>post.id !==action.payload); 
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
        if(bookmark.id ===action.payload.PostId){
          return{...bookmark,likes:bookmark.likes.concat(action.payload.userId)}
        }
        return bookmark;        
      })
      
    },
    [disLikedPost.fulfilled]:(state,action)=>{
      state.bookmarks=state.bookmarks.map((bookmark)=>{
        if(bookmark.id===action.payload.PostId){
          return {...bookmark,likes:bookmark.likes.filter((id=>id !==action.payload.userId))}
        }
        return bookmark;
      })
    }
  }
})

export default BookmarkSlice.reducer;