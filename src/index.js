import React from "react";
import ReactDOM from "react-dom";
import Routes from "./routes";
import { Provider } from "react-redux";
import { createStore } from 'redux';
import "./App.css";
import "./index.css";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";


// const store = createStore(reducer);
ReactDOM.render(
  // <Provider store={store}>
  // <Router>
  //     <Routes />
  //   </Router>
  //</Provider>, */},
    <Router>
      <Routes />
    </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
