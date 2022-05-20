import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authslice";
import postReducer from "./post/postSlice";


export const store=configureStore({
    reducer:{auth:authReducer, post:postReducer}

});
