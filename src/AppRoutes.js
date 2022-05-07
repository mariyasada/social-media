import {Routes,Route} from "react-router";
import { Navbar, Sidebar } from "./components";
import { Home, LandingPage, Login, Signup } from "./pages";
import { useLocation } from "react-router-dom";
import { useState } from "react";


export const AppRoutes = () => {
  const {pathname}=useLocation();
  console.log(pathname);
  return (
    <div>
      {pathname !=="/" && <Navbar/> }
      {(pathname !== "/" && pathname !=="/signup" && pathname !=="/login") && <Sidebar/>}
      <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/home" element={<Home/>}/>
      </Routes>
    </div>
  )
}


