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
import blopez from "./data/brook_lopez_game_log_10_22_2022.csv";
import bportis from "./data/bobby_portis_game_log_10_22_2022.csv";
import gallen from "./data/grayson_allen_game_log_10_22_2022.csv";
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
import ccunningham from "./data/cade_cunningham_game_log_10_22_2022.csv";
import sbey from "./data/saddiq_bey_game_log_10_22_2022.csv";
//import jivey from "./data/XXXXXXXXXXXXXX.csv";
import bojanbogdanovic from "./data/bojan_bogdanovic_game_log_10_22_2022.csv";
import istewart from "./data/isaiah_stewart_game_log_10_22_2022.csv";
//import pbanchero from "./data/XXXXXXXXXXXXXX.csv";
import fwagner from "./data/franz_wagner_game_log_10_22_2022.csv";
import canthony from "./data/cole_anthony_game_log_10_22_2022.csv";
import wcarter from "./data/wendell_carter_game_log_10_22_2022.csv";
import mbamba from "./data/mohamed_bamba_game_log_10_22_2022.csv";
import thaliburton from "./data/tyrese_haliburton_game_log_10_22_2022.csv";
//import bmathurin from "./data/XXXXXXXXXXXXXX.csv";
import bhield from "./data/buddy_hield_game_log_10_22_2022.csv";
import mturner from "./data/myles_turner_game_log_10_22_2022.csv";
import jsmith from "./data/jalen_smith_game_log_10_22_2022.csv";
import cduarte from "./data/chris_duarte_game_log_10_22_2022.csv";
import tjmcconnell from "./data/tj_mcconnell_game_log_10_22_2022.csv";
import bbeal from "./data/bradley_beal_game_log_10_22_2022.csv";
import kporzingis from "./data/kristaps_porzingis_game_log_10_22_2022.csv";
import kkuzma from "./data/kyle_kuzma_game_log_10_22_2022.csv";
import wbarton from "./data/will_barton_game_log_10_22_2022.csv";
import mmorris from "./data/monte_morris_game_log_10_22_2022.csv";
import rhachimura from "./data/rui_hachimura_game_log_10_22_2022.csv";
import kdurant from "./data/kevin_durant_game_log_10_22_2022.csv";
import kirving from "./data/kyrie_irving_game_log_10_22_2022.csv";
import bsimmons from "./data/ben_simmons_game_log_10_22_2022.csv";
import nclaxton from "./data/nicolas_claxton_game_log_10_22_2022.csv";
import jharris from "./data/joe_harris_game_log_10_22_2022.csv";
import roneale from "./data/royce_o'neale_game_log_10_22_2022.csv";
import zwilliamson from "./data/zion_williamson_game_log_10_22_2022.csv";
import bingram from "./data/brandon_ingram_game_log_10_22_2022.csv";
import cjmccollum from "./data/cj_mccollum_game_log_10_22_2022.csv";
import hjones from "./data/herbert_jones_game_log_10_22_2022.csv";
import jvalanciunas from "./data/jonas_valanciunas_game_log_10_22_2022.csv";
import jmorant from "./data/ja_morant_game_log_10_22_2022.csv";
import dbane from "./data/desmond_bane_game_log_10_22_2022.csv";
import sadams from "./data/steven_adams_game_log_10_22_2022.csv";
import dbrooks from "./data/dillon_brooks_game_log_10_22_2022.csv";
import jjackson from "./data/jaren_jackson_game_log_10_22_2022.csv";
import tjones from "./data/tyus_jones_game_log_10_22_2022.csv";
import jbrunson from "./data/jalen_brunson_game_log_10_22_2022.csv";
import rjbarrett from "./data/rj_barrett_game_log_10_22_2022.csv";
import jrandle from "./data/julius_randle_game_log_10_22_2022.csv";
import efournier from "./data/evan_fournier_game_log_10_22_2022.csv";
import mrobinson from "./data/mitchell_robinson_game_log_10_22_2022.csv";
import tyoung from "./data/trae_young_game_log_10_22_2022.csv";
import dmurray from "./data/dejounte_murray_game_log_10_22_2022.csv";
import ccapela from "./data/clint_capela_game_log_10_22_2022.csv";
import jcollins from "./data/john_collins_game_log_10_22_2022.csv";
import dhunter from "./data/deandre_hunter_game_log_10_22_2022.csv";
import jgreen from "./data/jalen_green_game_log_10_22_2022.csv";
import kporter from "./data/kevin_porter_game_log_10_22_2022.csv";
import asengun from "./data/alperen_sengun_game_log_10_25_2022.csv";
import dgarland from "./data/darius_garland_game_log_10_22_2022.csv";
import dmitchell from "./data/donovan_mitchell_game_log_10_22_2022.csv";
import emobley from "./data/evan_mobley_game_log_10_22_2022.csv";
import jallen from "./data/jarrett_allen_game_log_10_22_2022.csv";
import fvanvleet from "./data/fred_vanvleet_game_log_10_22_2022.csv";
import psiakam from "./data/pascal_siakam_game_log_10_22_2022.csv";
import sbarnes from "./data/scottie_barnes_game_log_10_22_2022.csv";
import oganunoby from "./data/og_anunoby_game_log_10_22_2022.csv";
import aedwards from "./data/anthony_edwards_game_log_10_22_2022.csv";
import kat from "./data/karl_anthony_towns_game_log_10_22_2022.csv";
import rgobert from "./data/rudy_gobert_game_log_10_22_2022.csv";
import drussell from "./data/d'angelo_russell_game_log_10_22_2022.csv";
import jgiddey from "./data/josh_giddey_game_log_10_22_2022.csv";
import ldort from "./data/luguentz_dort_game_log_10_22_2022.csv";
import sga from "./data/shai_gilgeous_alexander_game_log_10_22_2022.csv";
import njokic from "./data/nikola_jokic_game_log_10_22_2022.csv";
import jmurray from "./data/jamal_murray_game_log_10_22_2022.csv";
import mpj from "./data/michael_porter_game_log_10_22_2022.csv";
import agordon from "./data/aaron_gordon_game_log_10_22_2022.csv";
import kcp from "./data/kentavious_caldwell_pope_game_log_10_22_2022.csv";
import lmarkannen from "./data/lauri_markkanen_game_log_10_22_2022.csv";
import csexton from "./data/collin_sexton_game_log_10_22_2022.csv";
import mconley from "./data/mike_conley_game_log_10_22_2022.csv";
import jclarkson from "./data/jordan_clarkson_game_log_10_22_2022.csv";
import kolynyk from "./data/kelly_olynyk_game_log_10_22_2022.csv";
import jvanderbilt from "./data/jarred_vanderbilt_game_log_10_22_2022.csv";
import ldoncic from "./data/luka_doncic_game_log_10_22_2022.csv";
import cwood from "./data/christian_wood_game_log_10_22_2022.csv";
import dfinneysmith from "./data/dorian_finney_smith_game_log_10_22_2022.csv";
import rbullock from "./data/reggie_bullock_game_log_10_22_2022.csv";
import sdinwiddie from "./data/spencer_dinwiddie_game_log_10_22_2022.csv";
import thardaway from "./data/tim_hardaway_jr_game_log_10_22_2022.csv";
import cpaul from "./data/chris_paul_game_log_10_22_2022.csv";
import dbooker from "./data/devin_booker_game_log_10_22_2022.csv";
import dayton from "./data/deandre_ayton_game_log_10_22_2022.csv";
import mbridges from "./data/mikal_bridges_game_log_10_22_2022.csv";
import cjohnson from "./data/cameron_johnson_game_log_10_22_2022.csv";
import jbutler from "./data/jimmy_butler_game_log_10_22_2022.csv";
import badebayo from "./data/bam_adebayo_game_log_10_22_2022.csv";
import klowry from "./data/kyle_lowry_game_log_10_22_2022.csv";
import therro from "./data/tyler_herro_game_log_10_22_2022.csv";
import cmartin from "./data/caleb_martin_game_log_10_22_2022.csv";
import dderozan from "./data/demar_derozan_game_log_10_22_2022.csv";
import zlavine from "./data/zach_lavine_game_log_10_22_2022.csv";
import nvucevic from "./data/nikola_vucevic_game_log_10_22_2022.csv";
import adosunmu from "./data/ayo_dosunmu_game_log_10_22_2022.csv";
import pwilliams from "./data/patrick_williams_game_log_10_22_2022.csv";
import ghayward from "./data/gordon_hayward_game_log_10_22_2022.csv";
import lameloball from "./data/lamelo_ball_game_log_10_22_2022.csv";
import trozier from "./data/terry_rozier_game_log_10_22_2022.csv";
import pjwashington from "./data/pj_washington_game_log_10_22_2022.csv";
import mplumlee from "./data/mason_plumlee_game_log_10_22_2022.csv";
import kjohnson from "./data/keldon_johnson_game_log_10_22_2022.csv";
import dvassell from "./data/devin_vassell_game_log_10_22_2022.csv";
import trejones from "./data/tre_jones_game_log_10_22_2022.csv";
import jpoeltl from "./data/jakob_poeltl_game_log_10_22_2022.csv";
import dlillard from "./data/damian_lillard_game_log_10_22_2022.csv";
import asimons from "./data/anfernee_simons_game_log_10_22_2022.csv";
import jnurkic from "./data/jusuf_nurkic_game_log_10_22_2022.csv";
import jgrant from "./data/jerami_grant_game_log_10_22_2022.csv";
import jhart from "./data/josh_hart_game_log_10_22_2022.csv";
import dfox from "./data/de'aaron_fox_game_log_10_22_2022.csv";
import dsabonis from "./data/domantas_sabonis_game_log_10_22_2022.csv";
import hbarnes from "./data/harrison_barnes_game_log_10_22_2022.csv";
import kleonard from "./data/kawhi_leonard_game_log_10_25_2022.csv";
import pgeorge from "./data/paul_george_game_log_10_25_2022.csv";



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
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${blopez}`)
    .then((result) => {
        data = { ...data, "Brook Lopez": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${gallen}`)
    .then((result) => {
        data = { ...data, "Grayson Allen": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${bportis}`)
    .then((result) => {
        data = { ...data, "Bobby Portis": result };
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
        data = { ...data, "Saddiq Bey": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
/*
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
*/
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${bojanbogdanovic}`)
    .then((result) => {
        data = { ...data, "Bojan Bogdanovic": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${istewart}`)
    .then((result) => {
        data = { ...data, "Isaiah Stewart": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
/*
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
*/
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
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${mbamba}`)
    .then((result) => {
        data = { ...data, "Mo Bamba": result };
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
        data = { ...data, "Mikal Bridges": result };
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
        data = { ...data, "Luka Doncic": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${cwood}`)
    .then((result) => {
        data = { ...data, "Christian Wood": result };
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
        data = { ...data, "Collin Sexton": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${mconley}`)
    .then((result) => {
        data = { ...data, "Mike Conley": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${jclarkson}`)
    .then((result) => {
        data = { ...data, "Jordan Clarkson": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${kolynyk}`)
    .then((result) => {
        data = { ...data, "Kelly Olynyk": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${jvanderbilt}`)
    .then((result) => {
        data = { ...data, "Jarred Vanderbilt": result };
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
/*
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
*/
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
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${tjmcconnell}`)
    .then((result) => {
        data = { ...data, "TJ McConnell": result };
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
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${wbarton}`)
    .then((result) => {
        data = { ...data, "Will Barton": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${mmorris}`)
    .then((result) => {
        data = { ...data, "Monte Morris": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${rhachimura}`)
    .then((result) => {
        data = { ...data, "Rui Hachimura": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${jbutler}`)
    .then((result) => {
        data = { ...data, "Jimmy Butler": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${badebayo}`)
    .then((result) => {
        data = { ...data, "Bam Adebayo": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${klowry}`)
    .then((result) => {
        data = { ...data, "Kyle Lowry": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${therro}`)
    .then((result) => {
        data = { ...data, "Tyler Herro": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${cmartin}`)
    .then((result) => {
        data = { ...data, "Caleb Martin": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${dderozan}`)
    .then((result) => {
        data = { ...data, "DeMar DeRozan": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${zlavine}`)
    .then((result) => {
        data = { ...data, "Zach LaVine": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${nvucevic}`)
    .then((result) => {
        data = { ...data, "Nikola Vucevic": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${adosunmu}`)
    .then((result) => {
        data = { ...data, "Ayo Dosunmu": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${pwilliams}`)
    .then((result) => {
        data = { ...data, "Patrick Williams": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${ghayward}`)
    .then((result) => {
        data = { ...data, "Gordon Hayward": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${lameloball}`)
    .then((result) => {
        data = { ...data, "LaMelo Ball": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${trozier}`)
    .then((result) => {
        data = { ...data, "Terry Rozier": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${pjwashington}`)
    .then((result) => {
        data = { ...data, "PJ Washington": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${mplumlee}`)
    .then((result) => {
        data = { ...data, "Mason Plumlee": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${mplumlee}`)
    .then((result) => {
        data = { ...data, "Mason Plumlee": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${kjohnson}`)
    .then((result) => {
        data = { ...data, "Keldon Johnson": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${dvassell}`)
    .then((result) => {
        data = { ...data, "Devin Vassell": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${trejones}`)
    .then((result) => {
        data = { ...data, "Tre Jones": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${jpoeltl}`)
    .then((result) => {
        data = { ...data, "Jakob Poeltl": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${dlillard}`)
    .then((result) => {
        data = { ...data, "Damian Lillard": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${asimons}`)
    .then((result) => {
        data = { ...data, "Anfernee Simons": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${jnurkic}`)
    .then((result) => {
        data = { ...data, "Jusuf Nurkic": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${jgrant}`)
    .then((result) => {
        data = { ...data, "Jerami Grant": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${jhart}`)
    .then((result) => {
        data = { ...data, "Josh Hart": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${dfox}`)
    .then((result) => {
        data = { ...data, "De'Aaron Fox": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${dsabonis}`)
    .then((result) => {
        data = { ...data, "Domantas Sabonis": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${hbarnes}`)
    .then((result) => {
        data = { ...data, "Harrison Barnes": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${kleonard}`)
    .then((result) => {
        data = { ...data, "Kawhi Leonard": result };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/bb-stats" : ""}${pgeorge}`)
    .then((result) => {
        data = { ...data, "Paul George": result };
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
