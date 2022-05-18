import { reducerTypes } from "./reducertypes";
const {LOAD_POSTS,LOAD_USERDATA,ADD_POST,USERS_POSTLIST,DELETE_POST,EDIT_POST,LOAD_BOOKMARKS,ADD_TO_BOOKMARK,REMOVE_FROM_BOOKMARK,LIKED_POST,DISLIKED_POST,LIKE_POST_FROM_BOOKMARK}=reducerTypes;

export const combineReducer=(state,action)=>{
    switch (action.type) {
        case LOAD_POSTS:
        case ADD_POST:
         case DELETE_POST:  
         case EDIT_POST:
         case LIKED_POST: 
         case DISLIKED_POST: 
         return {...state,postsList:action.payload} 
         
        case LOAD_USERDATA:
            return {...state,userList:action.payload} 
         
        case USERS_POSTLIST:
            return {...state,usersPostList:action.payload} 

        case LOAD_BOOKMARKS:
        case ADD_TO_BOOKMARK:
        case REMOVE_FROM_BOOKMARK:
        case LIKE_POST_FROM_BOOKMARK:        
            return {...state,bookmarkList:action.payload} 






    
        default:
            return state;
    }
}