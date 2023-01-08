export const TRACKED_STATS = {
    PTS: "PTS",
    AST: "AST",
    REB: "REB",
    "3PM": "3PM/A",
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
        25: 25,
        999: -1,
    },
    [TRACKED_STATS.AST]: { 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 999: -1 },
    [TRACKED_STATS.REB]: {
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        10: 10,
        999: -1,
    },
    [TRACKED_STATS["3PM"]]: { 1: 1, 2: 2, 999: -1 },
};

export const apiKey = "6216562a9cmsh684f21707ccd0ffp1e0106jsnb7430c62ec7e";
export const apiHost = "api-nba-v1.p.rapidapi.com";
