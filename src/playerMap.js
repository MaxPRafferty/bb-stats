/*
Not addressed here:

FOR SETH:
- Fill out player map with teams/players and CTG IDs and the players default stats

FOR MAX:
- Automation of data pull based on CTG IDs (use to build appropriate URL and download the CSV and import)
- Allow modification of player stat categories and thresholds for those

LATER FOR SOMEONE:
- Show column for opponent next to game date -- probably do it when we pull the date ID
- Clean up game date string
- Player team changes are untracked

*/

import { TRACKED_STATS, FORMAT_THRESHOLDS, STAT_THRESHOLDS } from "./constants";

const PlayerDataMap = {

    Boston: {
        "Jaylen Brown": {
            ctgid: 454,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][15],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Jayson Tatum": {
            ctgid: 4268,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][15],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Al Horford": {
            ctgid: 1675,
            defaultStats: {
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
            },
        },
        "Marcus Smart": {
            ctgid: 3401,
            defaultStats: {
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
            },
        },
    },

    Milwaukee: {
        "Khris Middleton": {
            ctgid: 2495,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
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
    },
};

export default PlayerDataMap;
