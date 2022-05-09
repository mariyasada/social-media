import {Routes,Route} from "react-router";
import { Navbar, Sidebar } from "./components";
import { Bookmark, Explore, Home, LandingPage, Login, Signup } from "./pages";
import { useLocation } from "react-router-dom";
import { RequireAuth } from "./Router/RequireAuth";


export const AppRoutes = () => {
  const {pathname}=useLocation();
  return (
    <div>
      {pathname !=="/" && <Navbar/> }
      {(pathname !== "/" && pathname !=="/signup" && pathname !=="/login") && <Sidebar/>}
      <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/explore" element={<Explore/>}/>
          <Route path="/bookmark" element={<RequireAuth children={<Bookmark/>}></RequireAuth>}/>
      </Routes>
    </div>
  )
}


