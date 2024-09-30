import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import loginReducer, { setToken } from "./Reducers/loginReducer";
import { createStore } from "redux";
import Reducer from "./Reducers/loginReducer";

const store = createStore(
  Reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

const token = localStorage.getItem("token");
const userType = localStorage.getItem("userType");
// Extract token to check for authorization
if (token) {
  store.dispatch({ type: "SET_TOKEN", token: true });
  store.dispatch({ type: "SET_TYPE", userType: userType });
} else store.dispatch({ type: "SET_TOKEN", token: false });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
