// src/index.tsx
import React from "react";
import ReactDOM from "react-dom";
import { store } from "./models/store";
import { Provider } from "react-redux";
import App from "./App";
import "antd/dist/antd.css";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
