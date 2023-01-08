import React from "react";
import ReactDOM from "react-dom/client";
import { parse } from "csv-parse";
import { snakeCase } from "lodash";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

window.S4_CONSTANTS = window.S4_CONSTANTS || {};
const IS_PRODUCTION = !!window.S4_CONSTANTS.isProd;
const GENERIC_ERROR =
    "Unexpected Error. Please refresh the page and try again.";

let applicationError;

/* small hack to make view height units consistent in mobile chrome, see https://css-tricks.com/the-trick-to-viewport-units-on-mobile/ */
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApplication = () => {
    root.render(
        <React.StrictMode>
            {applicationError}
            <App />
        </React.StrictMode>
    );
};

renderApplication();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
