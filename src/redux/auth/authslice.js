import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,setPersistence ,browserLocalPersistence} from "firebase/auth";
import { doc, getFirestore, setDoc,getDoc,collection, query, where,getDocs  } from "firebase/firestore";
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
      await setDoc(doc(db, "users",user.uid),{firstName,lastName,username,email,id:user.uid,photoURL:"https://ik.imagekit.io/qrhnvir8bf0/videolibararyimages/avatar-gfa750efa1_1280_28DURVv8c.png?ik-sdk-version=javascript-1.4.3&updatedAt=1652948272807"});
        return {firstName,lastName,username,email,id:user.uid,photoURL:"https://ik.imagekit.io/qrhnvir8bf0/videolibararyimages/avatar-gfa750efa1_1280_28DURVv8c.png?ik-sdk-version=javascript-1.4.3&updatedAt=1652948272807"};
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
   return users;
    }
    catch(err){
      console.log("something went wrong",err);
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
  },
});
export default AuthSlice.reducer;
export const {setUser} =  AuthSlice.actions;

