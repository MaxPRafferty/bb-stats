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
import rwilliams from "./data/robert_williams_game_log_10_19_2022.csv";
//import ccunningham from "./data/XXXXXXXXXXXXXX.csv";
//import sbey from "./data/XXXXXXXXXXXXXX.csv";
//import jivey from "./data/XXXXXXXXXXXXXX.csv";
//import pbanchero from "./data/XXXXXXXXXXXXXX.csv";
//import fwagner from "./data/XXXXXXXXXXXXXX.csv";
//import canthony from "./data/XXXXXXXXXXXXXX.csv";
//import wcarter from "./data/XXXXXXXXXXXXXX.csv";
//import thaliburton from "./data/XXXXXXXXXXXXXX.csv";
//import bmathurin from "./data/XXXXXXXXXXXXXX.csv";
//import bhield from "./data/XXXXXXXXXXXXXX.csv";
//import mturner from "./data/XXXXXXXXXXXXXX.csv";
//import jsmith from "./data/XXXXXXXXXXXXXX.csv";
//import cduarte from "./data/XXXXXXXXXXXXXX.csv";
//import bbeal from "./data/XXXXXXXXXXXXXX.csv";
//import kporzingis from "./data/XXXXXXXXXXXXXX.csv";
//import kkuzma from "./data/XXXXXXXXXXXXXX.csv";
//import kdurant from "./data/XXXXXXXXXXXXXX.csv";
//import kirving from "./data/XXXXXXXXXXXXXX.csv";
//import bsimmons from "./data/XXXXXXXXXXXXXX.csv";
//import nclaxton from "./data/XXXXXXXXXXXXXX.csv";
//import jharris from "./data/XXXXXXXXXXXXXX.csv";
//import roneale from "./data/XXXXXXXXXXXXXX.csv";
//import zwilliamson from "./data/XXXXXXXXXXXXXX.csv";
//import bingram from "./data/XXXXXXXXXXXXXX.csv";
//import cjmccollum from "./data/XXXXXXXXXXXXXX.csv";
//import hjones from "./data/XXXXXXXXXXXXXX.csv";
//import jvalanciunas from "./data/XXXXXXXXXXXXXX.csv";
//import jmorant from "./data/XXXXXXXXXXXXXX.csv";
//import dbane from "./data/XXXXXXXXXXXXXX.csv";
//import sadams from "./data/XXXXXXXXXXXXXX.csv";
//import dbrooks from "./data/XXXXXXXXXXXXXX.csv";
//import jjackson from "./data/XXXXXXXXXXXXXX.csv";
//import tjones from "./data/XXXXXXXXXXXXXX.csv";
//import jbrunson from "./data/XXXXXXXXXXXXXX.csv";
//import rjbarrett from "./data/XXXXXXXXXXXXXX.csv";
//import jrandle from "./data/XXXXXXXXXXXXXX.csv";
//import efournier from "./data/XXXXXXXXXXXXXX.csv";
//import mrobinson from "./data/XXXXXXXXXXXXXX.csv";
//import tyoung from "./data/XXXXXXXXXXXXXX.csv";
//import dmurray from "./data/XXXXXXXXXXXXXX.csv";
//import ccapela from "./data/XXXXXXXXXXXXXX.csv";
//import jcollins from "./data/XXXXXXXXXXXXXX.csv";
//import dhunter from "./data/XXXXXXXXXXXXXX.csv";
//import jgreen from "./data/XXXXXXXXXXXXXX.csv";
//import kporter from "./data/XXXXXXXXXXXXXX.csv";
//import asengun from "./data/XXXXXXXXXXXXXX.csv";
//import dgarland from "./data/XXXXXXXXXXXXXX.csv";
//import dmitchell from "./data/XXXXXXXXXXXXXX.csv";
//import emobley from "./data/XXXXXXXXXXXXXX.csv";
//import jallen from "./data/XXXXXXXXXXXXXX.csv";
//import fvanvleet from "./data/XXXXXXXXXXXXXX.csv";
//import psiakam from "./data/XXXXXXXXXXXXXX.csv";
//import sbarnes from "./data/XXXXXXXXXXXXXX.csv";
//import oganunoby from "./data/XXXXXXXXXXXXXX.csv";
//import aedwards from "./data/XXXXXXXXXXXXXX.csv";
//import kat from "./data/XXXXXXXXXXXXXX.csv";
//import rgobert from "./data/XXXXXXXXXXXXXX.csv";
//import drussell from "./data/XXXXXXXXXXXXXX.csv";
//import jgiddey from "./data/XXXXXXXXXXXXXX.csv";
//import ldort from "./data/XXXXXXXXXXXXXX.csv";
//import sga from "./data/XXXXXXXXXXXXXX.csv";
//import njokic from "./data/XXXXXXXXXXXXXX.csv";
//import jmurray from "./data/XXXXXXXXXXXXXX.csv";
//import mpj from "./data/XXXXXXXXXXXXXX.csv";
//import agordon from "./data/XXXXXXXXXXXXXX.csv";
//import kcp from "./data/XXXXXXXXXXXXXX.csv";
//import lmarkannen from "./data/XXXXXXXXXXXXXX.csv";
//import csexton from "./data/XXXXXXXXXXXXXX.csv";
//import ldoncic from "./data/XXXXXXXXXXXXXX.csv";
//import dfinneysmith from "./data/XXXXXXXXXXXXXX.csv";
//import rbullock from "./data/XXXXXXXXXXXXXX.csv";
//import sdinwiddie from "./data/XXXXXXXXXXXXXX.csv";
//import thardaway from "./data/XXXXXXXXXXXXXX.csv";
//import cpaul from "./data/XXXXXXXXXXXXXX.csv";
//import dbooker from "./data/XXXXXXXXXXXXXX.csv";
//import dayton from "./data/XXXXXXXXXXXXXX.csv";
//import mbridges from "./data/XXXXXXXXXXXXXX.csv";
//import cjohnson from "./data/XXXXXXXXXXXXXX.csv";

//import xxxxxxxxx from "./data/XXXXXXXXXXXXXX.csv";
//import xxxxxxxxx from "./data/XXXXXXXXXXXXXX.csv";
//import xxxxxxxxx from "./data/XXXXXXXXXXXXXX.csv";
//import xxxxxxxxx from "./data/XXXXXXXXXXXXXX.csv";
//import xxxxxxxxx from "./data/XXXXXXXXXXXXXX.csv";


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
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${rwilliams}`)
    .then((result) => {
        data = { ...data, "Robert Williams III": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
/*
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${ccunningham}`)
    .then((result) => {
        data = { ...data, "Cade Cunnningham": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${sbey}`)
    .then((result) => {
        data = { ...data, "Sadiq Bey": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${jivey}`)
    .then((result) => {
        data = { ...data, "Jaden Ivey": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${pbanchero}`)
    .then((result) => {
        data = { ...data, "Paolo Banchero": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${fwagner}`)
    .then((result) => {
        data = { ...data, "Franz Wagner": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${canthony}`)
    .then((result) => {
        data = { ...data, "Cole Anthony": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${wcarter}`)
    .then((result) => {
        data = { ...data, "Wendell Carter Jr": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${cpaul}`)
    .then((result) => {
        data = { ...data, "Chris Paul": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${dbooker}`)
    .then((result) => {
        data = { ...data, "Devin Booker": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${dayton}`)
    .then((result) => {
        data = { ...data, "DeAndre Ayton": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${mbridges}`)
    .then((result) => {
        data = { ...data, "Miles Bridges": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${cjohnson}`)
    .then((result) => {
        data = { ...data, "Cameron Johnson": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${ldoncic}`)
    .then((result) => {
        data = { ...data, "Luca Doncic": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${dfinneysmith}`)
    .then((result) => {
        data = { ...data, "Dorian Finney-Smith": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${rbullock}`)
    .then((result) => {
        data = { ...data, "Reggie Bullock": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${sdinwiddie}`)
    .then((result) => {
        data = { ...data, "Spencer Dinwiddie": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${thardaway}`)
    .then((result) => {
        data = { ...data, "Tim Hardaway Jr": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${lmarkannen}`)
    .then((result) => {
        data = { ...data, "Lauri Markkanen": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${csexton}`)
    .then((result) => {
        data = { ...data, "Lauri Markkanen": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${njokic}`)
    .then((result) => {
        data = { ...data, "Nikola Jokic": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${jmurray}`)
    .then((result) => {
        data = { ...data, "Jamal Murray": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${mpj}`)
    .then((result) => {
        data = { ...data, "Michael Porter Jr": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${agordon}`)
    .then((result) => {
        data = { ...data, "Aaron Gordon": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${kcp}`)
    .then((result) => {
        data = { ...data, "Kentavious Caldwell-Pope": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${jgiddey}`)
    .then((result) => {
        data = { ...data, "Josh Giddey": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${ldort}`)
    .then((result) => {
        data = { ...data, "Lu Dort": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${sga}`)
    .then((result) => {
        data = { ...data, "Shai Gilgeous-Alexander": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${aedwards}`)
    .then((result) => {
        data = { ...data, "Anthony Edwards": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${kat}`)
    .then((result) => {
        data = { ...data, "Karl-Anthony Towns": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${rgobert}`)
    .then((result) => {
        data = { ...data, "Rudy Gobert": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${drussell}`)
    .then((result) => {
        data = { ...data, "D'Angelo Russel": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${fvanvleet}`)
    .then((result) => {
        data = { ...data, "Fred VanVleet": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${psiakam}`)
    .then((result) => {
        data = { ...data, "Pascal Siakam": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${sbarnes}`)
    .then((result) => {
        data = { ...data, "Scottie Barnes": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${oganunoby}`)
    .then((result) => {
        data = { ...data, "OG Anunoby": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${dgarland}`)
    .then((result) => {
        data = { ...data, "Darius Garland": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${dmitchell}`)
    .then((result) => {
        data = { ...data, "Donovan Mitchell": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${emobley}`)
    .then((result) => {
        data = { ...data, "Evan Mobley": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${jallen}`)
    .then((result) => {
        data = { ...data, "Jarrett Allen": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${jgreen}`)
    .then((result) => {
        data = { ...data, "Jalen Green": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${kporter}`)
    .then((result) => {
        data = { ...data, "Kevin Porter Jr": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${asengun}`)
    .then((result) => {
        data = { ...data, "Alperen Sengun": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${tyoung}`)
    .then((result) => {
        data = { ...data, "Trae Young": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${dmurray}`)
    .then((result) => {
        data = { ...data, "Dejounte Murray": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${ccapela}`)
    .then((result) => {
        data = { ...data, "Clint Capela": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${jcollins}`)
    .then((result) => {
        data = { ...data, "John Collins": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${dhunter}`)
    .then((result) => {
        data = { ...data, "DeAndre Hunter": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${jbrunson}`)
    .then((result) => {
        data = { ...data, "Jalen Brunson": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${rjbarrett}`)
    .then((result) => {
        data = { ...data, "RJ Barrett": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${jrandle}`)
    .then((result) => {
        data = { ...data, "Julius Randle": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${efournier}`)
    .then((result) => {
        data = { ...data, "Evan Fournier": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${mrobinson}`)
    .then((result) => {
        data = { ...data, "Mitchell Robinson": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${jmorant}`)
    .then((result) => {
        data = { ...data, "Ja Morant": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${dbane}`)
    .then((result) => {
        data = { ...data, "Desmond Bane": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${sadams}`)
    .then((result) => {
        data = { ...data, "Steven Adams": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${dbrooks}`)
    .then((result) => {
        data = { ...data, "Dillon Brooks": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${jjackson}`)
    .then((result) => {
        data = { ...data, "Jaren Jackson Jr": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${tjones}`)
    .then((result) => {
        data = { ...data, "Tyus Jones": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${zwilliamson}`)
    .then((result) => {
        data = { ...data, "Zion Williamson": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${bingram}`)
    .then((result) => {
        data = { ...data, "Brandon Ingram": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${cjmccollum}`)
    .then((result) => {
        data = { ...data, "CJ McCollum": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${hjones}`)
    .then((result) => {
        data = { ...data, "Herb Jones": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${jvalanciunas}`)
    .then((result) => {
        data = { ...data, "Jonas Valanciunas": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${kdurant}`)
    .then((result) => {
        data = { ...data, "Kevin Durant": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${kirving}`)
    .then((result) => {
        data = { ...data, "Kyrie Irvin": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${bsimmons}`)
    .then((result) => {
        data = { ...data, "Ben Simmons": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${nclaxton}`)
    .then((result) => {
        data = { ...data, "Nic Claxton": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${jharris}`)
    .then((result) => {
        data = { ...data, "Joe Harris": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${roneale}`)
    .then((result) => {
        data = { ...data, "Royce O'Neale": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${thaliburton}`)
    .then((result) => {
        data = { ...data, "Tyrese Haliburton": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${bhield}`)
    .then((result) => {
        data = { ...data, "Buddy Hield": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${mturner}`)
    .then((result) => {
        data = { ...data, "Myles Turner": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${bmathurin}`)
    .then((result) => {
        data = { ...data, "Benedict Mathurin": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${jsmith}`)
    .then((result) => {
        data = { ...data, "Jalen Smith": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${cduarte}`)
    .then((result) => {
        data = { ...data, "Chris Duarte": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${bbeal}`)
    .then((result) => {
        data = { ...data, "Bradley Beal": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${kporzingis}`)
    .then((result) => {
        data = { ...data, "Kristaps Porzingis": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${kkuzma}`)
    .then((result) => {
        data = { ...data, "Kyle Kuzma": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
    */
    
renderApplication();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
