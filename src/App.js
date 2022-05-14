import "./App.css";
import {Routes,Route} from "react-router";
import { AppRoutes } from "./AppRoutes";
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <div className="App">
      <AppRoutes/>
      <Toaster
        position="top-right"
        toastOptions={{ className: "toast-display", duration: 3500 }}
      />   
    </div>
  );
}

export default App;
