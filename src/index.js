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
import awiggins from "./data/andrew_wiggins_game_log_10_18_2022.csv";
import adavis from "./data/anthony_davis_game_log_10_18_2022.csv";
import dmelton from "./data/de'anthony_melton_game_log_10_18_2022.csv";
import dwhite from "./data/derrick_white_game_log_10_18_2022.csv";
import ddivincenzo from "./data/donte_divincenzo_game_log_10_18_2022.csv";
import dgreen from "./data/draymond_green_game_log_10_18_2022.csv";
import gwilliams from "./data/grant_williams_game_log_10_18_2022.csv";
import jharden from "./data/james_harden_game_log_10_18_2022.csv";
import jwiseman from "./data/james_wiseman_game_log_10_18_2022.csv";
import jembiid from "./data/joel_embiid_game_log_10_18_2022.csv";
import jkuminga from "./data/jonathan_kuminga_game_log_10_18_2022.csv";
import jpoole from "./data/jordan_poole_game_log_10_18_2022.csv";
import klooney from "./data/kevon_looney_game_log_10_18_2022.csv";
import ljames from "./data/lebron_james_game_log_10_18_2022.csv";
import kthompson from "./data/klay_thompson_game_log_10_18_2022.csv";
import mbrogdon from "./data/malcolm_brogdon_game_log_10_18_2022.csv";
import pjtucker from "./data/pj_tucker_game_log_10_18_2022.csv";
import stephcurry from "./data/stephen_curry_game_log_10_18_2022.csv";
import tharris from "./data/tobias_harris_game_log_10_18_2022.csv";
import tmaxey from "./data/tyrese_maxey_game_log_10_18_2022.csv";


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
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${awiggins}`)
    .then((result) => {
        data = { ...data, "Andrew Wiggins": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${adavis}`)
    .then((result) => {
        data = { ...data, "Anthony Davis": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${dmelton}`)
    .then((result) => {
        data = { ...data, "De'Anthony Melton": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${dwhite}`)
    .then((result) => {
        data = { ...data, "Derrick White": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${ddivincenzo}`)
    .then((result) => {
        data = { ...data, "Donte DiVincenzo": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${dgreen}`)
    .then((result) => {
        data = { ...data, "Draymond Green": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${gwilliams}`)
    .then((result) => {
        data = { ...data, "Grant Williams": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${jharden}`)
    .then((result) => {
        data = { ...data, "James Harden": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
/*
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${jwiseman}`)
    .then((result) => {
        data = { ...data, "James Wiseman": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
    */
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${jembiid}`)
    .then((result) => {
        data = { ...data, "Joel Embiid": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${jkuminga}`)
    .then((result) => {
        data = { ...data, "Jonathan Kuminga": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${jpoole}`)
    .then((result) => {
        data = { ...data, "Jordan Poole": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${klooney}`)
    .then((result) => {
        data = { ...data, "Kevon Looney": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${ljames}`)
    .then((result) => {
        data = { ...data, "LeBron James": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${kthompson}`)
    .then((result) => {
        data = { ...data, "Klay Thompson": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${mbrogdon}`)
    .then((result) => {
        data = { ...data, "Malcolm Brogdon": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${pjtucker}`)
    .then((result) => {
        data = { ...data, "PJ Tucker": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${stephcurry}`)
    .then((result) => {
        data = { ...data, "Stephen Curry": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${tharris}`)
    .then((result) => {
        data = { ...data, "Tobias Harris": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${tmaxey}`)
    .then((result) => {
        data = { ...data, "Tyrese Maxey": result };
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
