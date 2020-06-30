import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import BlogAppUpdated from "./App";
import LocalStorage from "./LocalStorage";

ReactDOM.render(
  <>
    <BlogAppUpdated />
    <LocalStorage />
  </>,
  document.getElementById("root")
);
