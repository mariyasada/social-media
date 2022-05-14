import { reducerTypes } from "./reducertypes";
const {LOAD_POSTS,LOAD_USERDATA,ADD_POST,USERS_POSTLIST,DELETE_POST,EDIT_POST}=reducerTypes;

export const combineReducer=(state,action)=>{
    switch (action.type) {
        case LOAD_POSTS:
        case ADD_POST:
         case DELETE_POST:  
         case EDIT_POST:  
         return {...state,postsList:action.payload} 
         
        case LOAD_USERDATA:
            return {...state,userList:action.payload} 
         
        case USERS_POSTLIST:
            return {...state,usersPostList:action.payload} 

    
        default:
            return state;
    }
}