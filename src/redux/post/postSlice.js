import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getFirestore,query, setDoc,getDoc,collection, addDoc, getDocs, deleteDoc,updateDoc,onSnapshot,arrayUnion,arrayRemove, where, limit } from "firebase/firestore";
import { app,db } from "../../firebaseconfige";

const initialState = {
  Posts:[],
  error:null,
  status:"idle",
  getpoststatus:"idle",
  deletepoststatus:"idle",
  editPostStatus:"idle"
};
export const addPosts = createAsyncThunk(
  "post/addPosts",
  async ( postData ) => {
    try {
      const postRef = await addDoc(collection(db,"posts"),postData);
      const postSnapData=await getDoc(postRef);
      if(postSnapData.exists()){
        return{...postSnapData.data(),id:postSnapData.id};
      } 
      else{
        console.log("something went wrong");
      }
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }
);

export const getPosts=createAsyncThunk("post/getPosts",async()=>{
  try{
    const allpostsSnap=await getDocs(collection(db,"posts"));
    const allPosts=allpostsSnap.docs.map((postdocument=>({...postdocument.data(),id:postdocument.id})))
    return allPosts;
  }
  catch(err){
    console.log(err,"something went wrong");
    return Promise.reject(err);
  }
})

export const deletePost=createAsyncThunk("post/deletePost",async(postId)=>{
  const postRef=doc(db,"posts",postId);
  try{
     const deletedPost=await deleteDoc(postRef);
     return postRef.id;
  }
  catch(err){
    console.log(err,"something went wrong");
    return Promise.reject(err);
  }
})

export const editPost=createAsyncThunk("post/editPost",async(postData)=>{
  const postDataRef=doc(db,"posts",postData.id);
  try {
     const updatedPost= await updateDoc(postDataRef,postData);
     const docRef=await getDoc(postDataRef);
     const editedData={...docRef.data(),id:postDataRef.id}
     return editedData;
  }
  catch(err){
    console.log(err,"something went wrong");
    return Promise.reject(err);
  }

})
export const LikedPost=createAsyncThunk("post/LikedPost",async(PostId,{getState})=>{
  const userState=getState();
  const userData=userState.auth.user;

  
try{
 const postDocumentRef =doc(db,"posts",PostId);
  const postRef=await updateDoc(postDocumentRef,{
      likes:arrayUnion(userData.id)
    });

  const bookmarkRef= await getDocs(query(collection(db,"bookmarks"),where("id","==",PostId),limit(1)))

   bookmarkRef.forEach((bookmark)=>{
     if(bookmark.data().user.id===userData.id)
     {
     updateDoc(doc(db,"bookmarks",bookmark.id),{
        likes:arrayUnion(userData.id)
     })
    }
   });
 
  return {PostId,userId:userData.id}
}
catch(err){
  console.log(err);
  return Promise.reject(err);
}

})

export const disLikedPost=createAsyncThunk("post/disLikedPost",async(PostId,{getState})=>{
  const userState=getState();
  const userData=userState.auth.user;
try {
  const postDocumentRef =doc(db,"posts",PostId);
  const postRef=await updateDoc(postDocumentRef,{
    likes:arrayRemove(userData.id)
  });

  const bookmarkRef= await getDocs(query(collection(db,"bookmarks"),where("id","==",PostId),limit(1)))

 bookmarkRef.forEach((bookmark)=>{
   if(bookmark.data().user.id===userData.id){
   updateDoc(doc(db,"bookmarks",bookmark.id),{
     likes:arrayRemove(userData.id)
   })
  }
 });
  return {PostId,userId:userData.id}
}

catch(err){
  console.log(err);
  return Promise.reject(err);
}
})


const PostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: {
    [addPosts.fulfilled]: (state, action) => {
     state.Posts=state.Posts.concat(action.payload); 
     state.status="succeed"
    },
    [addPosts.pending]: (state, action) => {
      state.status = "loading";
    },
    [addPosts.rejected]: (state, action) => {
      state.error = `could not complete the request`;
      state.status = "rejected";
    },
    [getPosts.fulfilled]: (state, action) => {
     state.Posts=action.payload; 
     state.getPostStatus="succeed"
    },
    [getPosts.pending]: (state, action) => {
      state.getPostStatus = "loading";
    },
    [getPosts.rejected]: (state, action) => {
      state.error = `could not complete the request`;
      state.getPostStatus = "rejected";
    },
    [deletePost.fulfilled]: (state, action) => {
     state.Posts=state.Posts.filter((post)=>post.id !==action.payload); 
     state.deletePostStatus="succeed"
    },
    [deletePost.pending]: (state, action) => {
      state.deletePostStatus = "loading";
    },
    [deletePost.rejected]: (state, action) => {
      state.error = `could not complete the request`;
      state.deletePostStatus = "rejected";
    },
    [editPost.fulfilled]: (state, action) => {
     state.Posts=state.Posts.map((post)=>post.id===action.payload.id ?action.payload:post); 
     state.editPostStatus="succeed"
    },
    [editPost.pending]: (state, action) => {
      state.editPostStatus = "loading";
    },
    [editPost.rejected]: (state, action) => {
      state.error = `could not complete the request`;
      state.editPostStatus = "rejected";
    },
    [LikedPost.fulfilled]: (state, action) => {
     state.Posts=state.Posts.map((post)=>post.id===action.payload.PostId ?({...post,likes:post.likes.concat(action.payload.userId)}):post); 
     state.editPostStatus="succeed"
    },
    [disLikedPost.fulfilled]: (state, action) => {
     state.Posts=state.Posts.map((post)=>post.id===action.payload.PostId ?({...post,likes:post.likes.filter(id=>id !==action.payload.userId)}):post); 
     state.editPostStatus="succeed"
    },
  },
});
export default PostSlice.reducer;