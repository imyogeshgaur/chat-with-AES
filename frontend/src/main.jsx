import App from "./App";
import rootReducers from "./store/reducer/index";
import ReactDOM from 'react-dom/client'
import { legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";
import React from "react";
import { BrowserRouter } from "react-router-dom";

//here we create an object to store the current state of the application
const store = createStore(rootReducers);
const root = ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);