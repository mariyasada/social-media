import {Routes,Route} from "react-router";
import { Home, Login, Signup } from "./pages";


export const AppRoutes = () => {
  return (
    <div>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          </Routes>
    </div>
  )
}


