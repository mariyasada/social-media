import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import { makeServer } from "./server";
import {BrowserRouter as Router } from "react-router-dom";
import { CombineProvider } from "./contexts/combineProvider";
import { Provider } from "react-redux";
import { store } from "./redux/store";
console.log(store.getState());

// Call make Server
// makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
      {/* <CombineProvider> */}
         <App />
    {/* </CombineProvider> */}
    </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
