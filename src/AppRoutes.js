import {Routes,Route} from "react-router";
import { Navbar, Sidebar } from "./components";
import { Bookmark, Explore, Home, LandingPage, Login, Signup,PageNotFound, UserProfile,MockMan } from "./pages";
import { useLocation } from "react-router-dom";
import { RequireAuth } from "./Router/RequireAuth";
export const AppRoutes = () => {
  const {pathname}=useLocation();
  return (
    <div>
      {pathname !=="/" && <Navbar/> }
      {(pathname !== "/" && pathname !=="/signup" && pathname !=="/login" && pathname !=="/mockman") && <Sidebar/>}
      <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/home" element={<RequireAuth children={<Home/>}/>}/>
          <Route path="/explore" element={<RequireAuth children={<Explore/>}/>}/>
          <Route path="/bookmark" element={<RequireAuth children={<Bookmark/>}></RequireAuth>}/>
          <Route path="/profile" element={<RequireAuth children={<UserProfile/>}></RequireAuth>}/>
          <Route path="*" element={<PageNotFound/>}/>
          <Route path="/mockman" element={<MockMan />} />
      </Routes>
    </div>
  )
}


