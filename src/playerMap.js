/*
Not addressed here:
1) Player data not automatically pulled
2) Player team is not known
3) Opponent data does not exist
4) Player team changes are untracked
5) Custom stat thresholds cannot be automatic
*/

import { TRACKED_STATS, FORMAT_THRESHOLDS } from "./constants";

const PlayerDataMap = {
    "Jaylen Brown": {
        ctgid: 454,
        validTrackedStats: {
            [TRACKED_STATS.PTS]: null,
            [TRACKED_STATS["3PM"]]: null,
        },
    },
    "Jayson Tatum": { ctgid: 4268 },
    "Al Horford": {
        ctgid: 1675,
        validTrackedStats: { [TRACKED_STATS.REB]: null },
    },
    "Marcus Smart": {
        ctgid: 3401,
        validTrackedStats: { [TRACKED_STATS.AST]: null },
    },
    "Khris Middleton": {
        ctgid: 2495,
        validTrackedStats: {
            [TRACKED_STATS.PTS]: 10,
            [TRACKED_STATS.AST]: null,
            [TRACKED_STATS["3PM"]]: null,
        },
    },
    "Giannis Antetokuonmpo": {
        ctgid: 96,
        validTrackedStats: {
            [TRACKED_STATS.PTS]: 20,
            [TRACKED_STATS.REB]: 6,
            [TRACKED_STATS.AST]: null,
        },
    },
    "Jrue Holiday": {
        ctgid: 1647,
        validTrackedStats: {
            [TRACKED_STATS.PTS]: 10,
            [TRACKED_STATS.AST]: null,
        },
    },
};

export default PlayerDataMap;
