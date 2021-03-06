import {Routes,Route} from "react-router";
import { Navbar, Sidebar } from "./components";
import { Bookmark, Explore, Home, LandingPage, Login, Signup,PageNotFound, UserProfile, } from "./pages";
import { useLocation } from "react-router-dom";
import { RequireAuth } from "./Router/RequireAuth";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const AppRoutes = () => {
  const {pathname}=useLocation();
  const {isUserLoggedIn}=useSelector(state=>state.auth);
  
  return (
    <div>
      {pathname !=="/" && <Navbar/> }
      {(pathname !== "/" && pathname !=="/signup" && pathname !=="/login") && <Sidebar/>}
      <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/signup" element={<Signup/>}/>
          {!isUserLoggedIn && <Route path="/login" element={<Login/>}/>}
          {/* <Route path="/login" element={<Login/>}/> */}
          <Route path="/home" element={<RequireAuth children={<Home/>}/>}/>
          <Route path="/explore" element={<RequireAuth children={<Explore/>}/>}/>
          <Route path="/bookmark" element={<RequireAuth children={<Bookmark/>}></RequireAuth>}/>
          <Route path="/profile/:currentUserId" element={<RequireAuth children={<UserProfile/>}></RequireAuth>}/>
          <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </div>
  )
}


