/*
Not addressed here:
1) Player data not automatically pulled
2) Player team is not known
3) Opponent data does not exist
4) Player team changes are untracked
5) Custom stat thresholds cannot be automatic
*/

import { TRACKED_STATS, FORMAT_THRESHOLDS, STAT_THRESHOLDS } from "./constants";

const PlayerDataMap = {
    "Jaylen Brown": {
        ctgid: 454,
        defaultStats: {
            [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][15],
            [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
        },
    },
    "Jayson Tatum": { 
        ctgid: 4268,
        defaultStats: {
            [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][15],
            [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
            [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
            [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
        },
    },
    "Al Horford": {
        ctgid: 1675,
        defaultStats: { [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4] },
    },
    "Marcus Smart": {
        ctgid: 3401,
        defaultStats: { [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2] },
    },
    "Khris Middleton": {
        ctgid: 2495,
        defaultStats: {
            [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
            [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
            [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
        },
    },
    "Giannis Antetokuonmpo": {
        ctgid: 96,
        defaultStats: {
            [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][20],
            [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][6],
            [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
        },
    },
    "Jrue Holiday": {
        ctgid: 1647,
        defaultStats: {
            [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
            [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
        },
    },
};

export default PlayerDataMap;
