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
            [TRACKED_STATS.points]: null,
            [TRACKED_STATS["three-point-makes"]]: null,
        },
    },
    "Jayson Tatum": { ctgid: 4268 },
    "Al Horford": {
        ctgid: 1675,
        validTrackedStats: { [TRACKED_STATS.rebounds]: null },
    },
    "Marcus Smart": {
        ctgid: 3401,
        validTrackedStats: { [TRACKED_STATS.assists]: null },
    },
    "Khris Middleton": {
        ctgid: 2495,
        validTrackedStats: {
            [TRACKED_STATS.points]: 10,
            [TRACKED_STATS.assists]: null,
            [TRACKED_STATS["three-point-makes"]]: null,
        },
    },
    "Giannis Antetokuonmpo": {
        ctgid: 96,
        validTrackedStats: {
            [TRACKED_STATS.points]: 20,
            [TRACKED_STATS.rebounds]: 6,
            [TRACKED_STATS.assists]: null,
        },
    },
    "Jrue Holiday": {
        ctgid: 1647,
        validTrackedStats: {
            [TRACKED_STATS.points]: 10,
            [TRACKED_STATS.assists]: null,
        },
    },
};

export default PlayerDataMap;
