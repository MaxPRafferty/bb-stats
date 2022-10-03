import React from "react";
import ReactDOM from "react-dom/client";
import { parse } from "csv-parse";
import { snakeCase } from "lodash";

import al from "./data/al_horford_game_log_10_2_2022.csv";
import jaylen from "./data/jaylen_brown_game_log_10_2_2022.csv";
import jayson from "./data/jayson_tatum_game_log_10_2_2022.csv";
import marcus from "./data/marcus_smart_game_log_10_2_2022.csv";
import giannis from "./data/giannis_antetokounmpo_game_log_10_2_2022.csv";
import jrue from "./data/jrue_holiday_game_log_10_2_2022.csv";
import khris from "./data/khris_middleton_game_log_10_2_2022.csv";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import CSVObjectify from "./util.CSVObjectify";

window.S4_CONSTANTS = window.S4_CONSTANTS || {};
const IS_PRODUCTION = !!window.S4_CONSTANTS.isProd;
const GENERIC_ERROR =
    "Unexpected Error. Please refresh the page and try again.";

let applicationError;

/* small hack to make view height units consistent in mobile chrome, see https://css-tricks.com/the-trick-to-viewport-units-on-mobile/ */
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);

const root = ReactDOM.createRoot(document.getElementById("root"));

let data = {};

const renderApplication = () => {
    root.render(
        <React.StrictMode>
            {applicationError}
            <App data={data} />
        </React.StrictMode>
    );
};

const fetchAndNormalize = (path) => {
    return fetch(path)
        .then((res) => res.text())
        .then((rowData) => {
            return new Promise((s, f) => {
                parse(rowData, {}, (err, records) => {
                    if (err) {
                        f(err);
                        return;
                    }

                    const [transformErr, result] = CSVObjectify(records);
                    if (transformErr) {
                        f(err);
                        return;
                    }
                    s(result);
                });
            });
        });
};

fetchAndNormalize(`${IS_PRODUCTION ? "playerDataList" : ""}${al}`)
    .then((result) => {
        data = { ...data, "Al Horford": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "playerDataList" : ""}${jaylen}`)
    .then((result) => {
        data = { ...data, "Jaylen Brown": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "playerDataList" : ""}${jayson}`)
    .then((result) => {
        data = { ...data, "Jayson Tatum": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "playerDataList" : ""}${marcus}`)
    .then((result) => {
        data = { ...data, "Marcus Smart": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${giannis}`)
    .then((result) => {
        data = { ...data, "Giannis Antetokuonmpo": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${jrue}`)
    .then((result) => {
        data = { ...data, "Jrue Holiday": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${khris}`)
    .then((result) => {
        data = { ...data, "Khris Middleton": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });

renderApplication();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
