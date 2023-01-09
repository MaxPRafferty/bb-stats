/* Old Mapping
export const TRACKED_STATS = {
    PTS: "PTS",
    AST: "AST",
    REB: "REB",
    "3PM": "3PM/A",
    "         ": "         ",
};
*/

/* player data shape
    assists : 13
    blocks : 1
    comment : null
    defReb : 3
    fga : 22
    fgm : 7
    fgp : "31.8"
    fta : 8
    ftm : 8
    ftp : "100.0"
    game : {id: 11054}
    min : "38"
    offReb : 0
    pFouls : 1
    player : {id: 1046, firstname: 'Trae', lastname: 'Young'}
    plusMinus : "+16"
    points : 23
    pos : "PG"
    steals : 1
    team : {id: 1, name: 'Atlanta Hawks', nickname: 'Hawks', code: 'ATL', logo: 'https://upload.wikimedia.org/wikipedia/fr/e/ee/Hawks_2016.png'}
    totReb : 3
    tpa : 9
    tpm : 1
    tpp : "11.1"
    turnovers : 3
    */
export const TRACKED_STATS = {
    PTS: "points",
    AST: "assists",
    REB: "totReb",
    "3PM": "tpm",
    "3PA": "tpa",
    MIN: "min",
    "         ": "         ",
};

export const FORMAT_THRESHOLDS = {
    [TRACKED_STATS.PTS]: [15],
    [TRACKED_STATS.AST]: [2],
    [TRACKED_STATS.REB]: [4],
    [TRACKED_STATS["3PM"]]: [1],
    [TRACKED_STATS["         "]]: [0],
};

export const STAT_THRESHOLDS = {
    [TRACKED_STATS.PTS]: {
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        10: 10,
        11: 11,
        12: 12,
        13: 13,
        14: 14,
        15: 15,
        16: 16,
        17: 17,
        18: 18,
        19: 19,
        20: 20,
        21: 21,
        22: 22,
        23: 23,
        24: 24,
        25: 25,
        26: 26,
        27: 27,
        28: 28,
        29: 29,
        30: 30,
        999: -1,
    },
    [TRACKED_STATS.AST]: {
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        10: 10,
        999: -1,
    },
    [TRACKED_STATS.REB]: {
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        10: 10,
        999: -1,
    },
    [TRACKED_STATS["3PM"]]: {
        1: 1,
        2: 2,
        3: 3,
        999: -1,
    },
    [TRACKED_STATS["         "]]: { 0: " " },
};

export const apiKey = "78e5128993msh6a03849b448f145p1b0357jsn714da3c76509";
export const apiHost = "api-nba-v1.p.rapidapi.com";

export const THEME_COLORS = {
    green: "#1f5f1f",
    red: "#A33B20",
    yellow: "yellow",
    orange: "#F18F01",
    black: "#16161d",
    blue: "#2E86AB",
    purple: "#4A2545",
};
