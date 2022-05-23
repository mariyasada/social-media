import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,setPersistence ,browserLocalPersistence} from "firebase/auth";
import { doc, getFirestore, setDoc,getDoc,collection, query, where,getDocs, arrayUnion,updateDoc,arrayRemove  } from "firebase/firestore";
import toast from "react-hot-toast";
import { app,db } from "../../firebaseconfige";


const userdata=JSON.parse(localStorage.getItem("user_data"));
const initialState = {
  isUserLoggedIn: false,
  user: {},
  users:[],
  error:null,
  loginstatus:"idle",
  signupstatus:"idle",
  signoutstatus:"idle",
  userStatus:"ideal",
};
export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ firstName, lastName, email, password,username }) => {
    try {
      const auth = getAuth(app);
      const {user} = await createUserWithEmailAndPassword(auth, email, password); 
      console.log(user.accessToken,"authentication"); 
      const userObject={firstName,lastName,username,email,id:user.uid,photoURL:"https://ik.imagekit.io/qrhnvir8bf0/videolibararyimages/avatar-gfa750efa1_1280_28DURVv8c.png?ik-sdk-version=javascript-1.4.3&updatedAt=1652948272807",followers:[],following:[]}
     
      await setDoc(doc(db, "users",user.uid),userObject);
        return userObject;
    } catch (error) {
      console.error(error);
    }
  }
);

export const logIn=createAsyncThunk(
  "auth/logIn",
  async ({  email, password}) => {
    try {
      const auth = getAuth(app);
      // const {user}= await setPersistence(auth, browserLocalPersistence).then(()=>{
      //   return signInWithEmailAndPassword(auth, email, password);
      // })
      const {user} = await signInWithEmailAndPassword(auth, email, password);
      const userDoc=await getDoc(doc(db, "users",user.uid));
      return (userDoc.data());
    } catch (error) {
      console.error(error);
    }
  }
);
export const logOut=createAsyncThunk(
  "auth/logOut", () => {
    try {
      const auth = getAuth(app);
      signOut(auth)
    .then(() => {
      toast('logout successfully',{icon:"✔"})
    })
  }
    catch(err){
      console.log("something went wrong",err);
    }        
  });

  export const getUsers=createAsyncThunk("auth/getUsers",async(arg,{getState})=>{
    try{
    const userstate=getState();
    const user=userstate.auth.user;
    const userRef = collection(db, "users");

// Create a query against the collection.
   const userQuery = query(userRef, where("email", "!=",user.email ));
   const userquerySnapshot = await getDocs(userQuery);
   const users= userquerySnapshot.docs.map(userdocument=>({...userdocument.data(),id:userdocument.id}));
   const userdataRef= await getDoc(doc(db,"users",user.id));
   return users;
    }
    catch(err){
      console.log("something went wrong",err);
      return Promise.reject(err);
    }

  })

export const followUser=createAsyncThunk("auth/followUser",async(followuserId,{getState})=>{
    console.log(followuserId);
    const userstate=getState();
    const user=userstate.auth.user;
    console.log(user);
 try
 {
  const userRef = doc(db,"users",user.id);
  const userUpdatedRef=await updateDoc(userRef,{
    following:arrayUnion(followuserId)
  });

  const followrUserRef=doc(db,"users",followuserId);
  const followersUserRef=await updateDoc(followrUserRef,{
    followers:arrayUnion(user.id)
  })
  return {followuserId,userId:user.id}
}
catch(err) {
  console.log(err);
  return Promise.reject(err);
}
  })

  export const unfollowUser=createAsyncThunk("auth/unfollowUser",async(followuserId,{getState})=>{
    const userstate=getState();
    const user=userstate.auth.user;
    console.log(user);
    try {
          const userDataRef =doc(db,"users",user.id);
          const postRef=await updateDoc(userDataRef,{
            following:arrayRemove(followuserId)
          });
          const followerUserRef=doc(db,"users",followuserId);
          const followersUserRef=await updateDoc(followerUserRef,{
            followers:arrayRemove(user.id)
          })
            return {followuserId,userId:user.id}
    }
    catch(err) {
                console.log(err);
                return Promise.reject(err);
            }
  })
  

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser:(state,action)=>{
      state.user=action.payload;
      // state.isUserLoggedIn=true;
    }
  },
  extraReducers: {
    [signUp.fulfilled]: (state, action) => {
     state.user=action.payload;
     state.isUserLoggedIn=true;
     state.signupstatus="succeed"
    },
    [signUp.pending]: (state, action) => {
      state.signupstatus = "loading";
    },
    [signUp.rejected]: (state, action) => {
      state.error = "could not complete the request";
      state.signupstatus = "rejected";
    },
    [logIn.fulfilled]: (state, action) => {
     state.isUserLoggedIn=true;
     state.loginstatus="succeed";
     state.user=action.payload;
    },
    [logIn.pending]: (state, action) => {
      state.loginstatus = "loading";
    },
    [logIn.rejected]: (state, action) => {
      state.error = "could not complete the request";
       state.loginstatus = "rejected";
    },
    [getUsers.fulfilled]: (state, action) => {
      state.userStatus="succeed";
      state.users=action.payload;
    },
    [getUsers.pending]: (state, action) => {
      state.userStatus = "loading";
    },
    [getUsers.rejected]: (state, action) => {
      state.error = "could not complete the request";
       state.userStatus = "rejected";
    },
    [logOut.fulfilled]: (state, action) => {
      state.isUserLoggedIn=false;
      state.signoutstatus="succeed"
    },
    [followUser.fulfilled]:(state,action)=>{
      state.user.following.push(action.payload.followuserId);
      state.users=state.users.map((user)=>user.id===action.payload.followuserId?({...user,followers:[user.followers,action.payload.userId]}):user);
      
    },
    [unfollowUser.fulfilled]:(state,action)=>{
      console.log(action.payload.userId,action.payload.followerId,"unfollower");
      state.user={...state.user,following:state.user.following.filter(id=> id !== action.payload.followuserId)};
      state.users=state.users.map((user)=>user.id===action.payload.followuserId?({...user,followers:user.followers.filter(id=>id !==action.payload.userId)}):user);
    }
  },
});
export default AuthSlice.reducer;
export const {setUser} =  AuthSlice.actions;
