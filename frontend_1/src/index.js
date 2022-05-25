import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"
import store from './redux/store';
import {Provider} from "react-redux"

import { positions,  transitions, Provider as AlertProvider } from "react-alert"

import AlertTemplate from "react-alert-template-basic"

const alertOptions={
  transitions: transitions.SCALE,
  positions:positions.BOTTOM_LEFT,
  timeout:5000
  // containerStyle:{
  //   backgroundColor: "green"
  // }
}

// 9213239113

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...alertOptions}>
    <App />
    </AlertProvider>
    </Provider>
);


