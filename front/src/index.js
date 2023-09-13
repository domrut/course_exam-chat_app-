import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux"
import userReducer from "./features/userReducer";
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";

const store = configureStore({
    reducer: {
        users: userReducer
    }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Provider store={store}>
              <App />
          </Provider>
      </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
