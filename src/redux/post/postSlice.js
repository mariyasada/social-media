import { async } from "@firebase/util";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getFirestore,query, setDoc,getDoc,collection, addDoc, getDocs, deleteDoc,updateDoc,onSnapshot,arrayUnion,arrayRemove, where, limit } from "firebase/firestore";
import { app,db } from "../../firebaseconfige";


const initialState = {
  Posts:[],
  comments:[],
  userPosts:[],
  error:null,
  status:"idle",
  getpoststatus:"idle",
  deletepoststatus:"idle",
  editPostStatus:"idle",
  likedPostStatus:"idle",
  dislikedPostStatus:"idle",
};
export const addPosts = createAsyncThunk(
  "post/addPosts",
  async ( postData ) => {
    try {
      const postRef = await addDoc(collection(db,"posts"),{...postData,likes:[]});
      updateDoc(postRef,{id:postRef.id})
      const postSnapData=await getDoc(postRef);
      const post=postSnapData.data();
      const userSnap=await getDoc(doc(db,"users",post.userId))    
        return{...post,id:postSnapData.id,user:userSnap.data()};
     
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }
);

export const getPosts=createAsyncThunk("post/getPosts",async()=>{
  try{
    const allPostsSnap=await getDocs(collection(db,"posts"));
    let posts=[];
    for await (const post of allPostsSnap.docs){      
      const postData=post.data();
      const userRef= await getDoc(doc(db,"users",postData.userId))
      posts =[...posts,{user:userRef.data(), ...postData}];
      
    }
    return posts;
  }
  catch(err){
    console.log(err,"something went wrong");
    return Promise.reject(err);
  }
})

export const deletePost=createAsyncThunk("post/deletePost",async({postId,bookmarkId})=>{
  const postRef=doc(db,"posts",postId);
  try{
     const deletedPost=await deleteDoc(postRef);
     if(bookmarkId){
        deleteDoc(doc(db,"bookmarks",bookmarkId))
     }
     return postRef.id;

    
  }
  catch(err){
    console.log(err,"something went wrong");
    return Promise.reject(err);
  }
})

export const editPost=createAsyncThunk("post/editPost",async(postData)=>{
  const newPostData={...postData}
  delete newPostData.user;
  const postDataRef=doc(db,"posts",postData.id);
  try {
     
      await updateDoc(postDataRef,newPostData);
     const docRef=await getDoc(postDataRef);
     const editedData={...docRef.data(),id:postDataRef.id}
    return postData;
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

  return {PostId,userId:userData.id,isLiked:false}
}

catch(err){
  console.log(err);
  return Promise.reject(err);
}
})


export const addCommentsToPost=createAsyncThunk("post/addCommentsToPost",async({PostId,comment},{getState})=>{

  console.log(PostId,comment,"comment section")
 const userState=getState();
  const userData=userState.auth.user;
  try{
  const postscommentRef=await addDoc(collection(db,"comments"),{comment,PostId,userData});
      updateDoc(postscommentRef,{id:postscommentRef.id})
      const postSnapData=await getDoc(postscommentRef);     
        return {...postSnapData.data(),id:postSnapData.id};
      
  }
  catch(err){
  console.log(err);
  return Promise.reject(err);
}

})
export const FetchComments=createAsyncThunk("post/FetchComments",async()=>{
  try{
    const allcommentsSnap=await getDocs(collection(db,"comments"));
    const allcomments=allcommentsSnap.docs.map((postdocument=>postdocument.data()))
    return allcomments;
  }
  catch(err){
    console.log(err,"something went wrong");
    return Promise.reject(err);
  }
})

export const deleteComment=createAsyncThunk("post/deleteComment",async(commentId)=>{
  const commentRef=doc(db,"comments",commentId);
  try{
     const deletedComment=await deleteDoc(commentRef);
     return commentRef.id;
  }
  catch(err){
    console.log(err,"something went wrong");
    return Promise.reject(err);
  }

})


const PostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setLoading:(state,action)=>{
      state.status="loading";
    }
  },
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
     state.Posts=state.Posts.map((post)=>post.id===action.payload.id ?{...post,...action.payload}:post); 
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
     state.likedPostStatus="succeed"
    },
    [LikedPost.pending]:(state,action)=>{
      state.likedPostStatus="loading"
    },
    [disLikedPost.fulfilled]: (state, action) => {
     state.Posts=state.Posts.map((post)=>post.id === action.payload.PostId ?({...post,likes:post.likes.filter(id=>id !==action.payload.userId)}):post); 
    state.dislikedPostStatus="succeed"
    },
    [disLikedPost.pending]:(state,action)=>{
       state.dislikedPostStatus="loading"
    },
    [addCommentsToPost.fulfilled]:(state,action)=>{
    state.comments=state.comments.concat(action.payload);
    },
    [FetchComments.fulfilled]: (state, action) => {
     state.comments=action.payload; 
    },
    [deleteComment.fulfilled]: (state, action) => {
     state.comments=state.comments.filter((comment)=>comment.id !==action.payload); 
    },
    
    
  },
});
export default PostSlice.reducer;
export const {setLoading}=PostSlice.actions;