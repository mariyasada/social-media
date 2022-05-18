import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { logInService } from "../../Services";

export const logIn=createAsyncThunk("auth/logIn",async(loginData)=>{
  try{
    const {data}=await logInService(loginData);
    return data
  }
  catch(err){
     console.log(err);
     return Promise.reject(err);
  }
})

export const authSlice=createSlice({
    name:"auth",
    initialState:{
    isLoggedIn:false,
    authenticationToken:null,
    userData:{},
    loginstatus:"idle",
    IsOpen:false
    },
    reducer:{ 
        openModal:(state,action)=>{
            state.IsOpen=true;
        }    ,
        closeModal:(state,action)=>{
             state.IsOpen=false;
        }  
    },
    extraReducers:{
     [logIn.fulfilled]:(state,action)=>{
         state.userData=action.payload.foundUser;
         state.isLoggedIn=true;
         state.authenticationToken=action.payload.encodedToken;
          state.loginstatus="success"
     },
     [logIn.pending]:(state,action)=>{
          state.loginstatus="loading"
     },
     [logIn.rejected]:(state,action)=>{
          state.loginstatus="failed"
     },

    }
})
export const {openModal,closeModal}=authSlice.actions
export default authSlice.reducer;