/*
Not addressed here:

FOR SETH:
- Fill out player map with teams/players and CTG IDs and the players default stats, including -1 for replacing nulls
- Download new CSVs for players I wanna check if Max doesn't get to the below

FOR MAX:
- Add deploy instructions to the readme
- Automation of data pull based on CTG IDs (use to build appropriate URL and download the CSV and import)
- Allow modification of player stat categories and thresholds for those
    - Add a setting for "ignore this stat" (i.e. if threshold is -1, then color black, rather than if null)

LATER FOR SOMEONE:
- Per-column summary stats that shows the % and or win/total for that column -- to help identify weak spots in the bet design
- Add support for multi-year stats 
    - Add ability to change which years are shown (ideally including support for multi or single year views)
- Labels on the pulldown entries for changing the threshold of a given player's stat category:
    - Calculate the success rate at that threshold for that stat and show the % and/or "win/total" next to it -- to help with bet design
    - Default setting is the default option on the pulldown for that player
- Show column for opponent next to game date -- probably do it when we pull the date ID
- Clean up game date string
- Player team changes are untracked
- More stats: blocks, steals

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
        "Derrick White": {
            ctgid: 4304,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][2],
            },
        },
        "Grant Williams": {
            ctgid: 4593,
            defaultStats: {
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
            },
        },
        "Malcolm Brogdon": {
            ctgid: 429,
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

    Philadelphia: {
        "Joel Embiid": {
            ctgid: 1049,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "James Harden": {
            ctgid: 1487,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][20],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][6],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
            },
        },
        "Tyrese Maxey": {
            ctgid: 4765,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
            },
        },
        "Tobias Harris": {
            ctgid: 1521,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
            },
        },
        "De'Anthony Melton": {
            ctgid: 4480,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
            },
        },
        "PJ Tucker": {
            ctgid: 3715,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
            },
        },
    },
};

export default PlayerDataMap;
