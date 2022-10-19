/*
Not addressed here:

FOR SETH:
- Fill out player map with teams/players and CTG IDs and the players default stats, including -1 for replacing nulls
- Set up 2021 player data for everyone I can on their current team

FOR MAX:
- Per-column summary stats that shows the % and or win/total for that column (to identify weak spots in the bet)
- Add a pulldown for each column that allows you to pick what threshold to set the limit at
    - playerMap data define their default level: init the pulldown to that value and indicate it with a * or something
    - bonus: in the pulldown list, on each entry show a parenthetical with the count and percent for that player on that 
        stat to make it easier to figure out at what level a player is consistent


LATER FOR SOMEONE (roughly in order of priority):
- Add support for multi-year stats 
    - Control over years/date range used in calculating percentages and counts
- Automation of data pull based on CTG IDs (use to build appropriate URL and download the CSV and import)
- Labels on the pulldown entries for changing the threshold of a given player's stat category:
    - Calculate the success rate at that threshold for that stat and show the % and/or "win/total" next to it -- to help with bet design
    - Default setting is the default option on the pulldown for that player
- Show column for opponent next to game date -- probably do it when we pull the date ID
- Player team changes are untracked. Maybe some way to limit start date for a player as a hack fix?
- Clean up game date string
- More stats: blocks, steals

*/

import { TRACKED_STATS, FORMAT_THRESHOLDS, STAT_THRESHOLDS } from "./constants";

const PlayerDataMap = {

    Celtics: {
        "Jaylen Brown": {
            ctgid: 454,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][15],
                //[TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                //[TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
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
            defaultStats: {
                //[TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][5],
                //[TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                //[TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Marcus Smart": {
            ctgid: 3401,
            defaultStats: {
                //[TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][5],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                //[TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                //[TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
                // maybe steals?
            },
        },
        "Grant Williams": {
            ctgid: 4593,
            defaultStats: {
                //[TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][5],
                //[TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                //[TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                //[TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        /*
        "Malcolm Brogdon": {
            ctgid: 429,
            defaultStats: {
                //[TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][5],
                //[TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                //[TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                //[TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Derrick White": {
            ctgid: 4304,
            defaultStats: {
                //[TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][5],
                //[TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                //[TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                //[TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Robert Williams III": {
            ctgid: 4425,
            defaultStats: {
                //[TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][5],
                //[TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                //[TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                //[TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
                // maybe blocks?
            },
        },
        */
    },

    Bucks: {
        /* INJURED
        "Khris Middleton": {
            ctgid: 2495,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                //[TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        */
        "Giannis Antetokuonmpo": {
            ctgid: 96,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][20],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][6],
                //[TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Jrue Holiday": {
            ctgid: 1647,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                //[TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                //[TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
    },

    Sixers: {
        "Joel Embiid": {
            ctgid: 1049,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][20],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][8],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "James Harden": {
            ctgid: 1487,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][6],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999], // maybe 4 (effort)
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Tyrese Maxey": {
            ctgid: 4765,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999], // maybe 2
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999], // maybe 1
            },
        },
        "Tobias Harris": {
            ctgid: 1521,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999], // maybe 2
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        /*
        "De'Anthony Melton": {
            ctgid: 4480,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "PJ Tucker": {
            ctgid: 3715,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999], // maybe 4
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        */
    },

    Lakers: {
        "LeBron James": {
            ctgid: 1785,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][20],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1], // rarely only hits 1 two games in a row: if hit 1 last game, maybe push to 2
            },
        },
        "Anthony Davis": {
            ctgid: 816,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][15],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2], // iffy 2
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][6],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },

    Warriors: {
        "Stephen Curry": {
            ctgid: 787,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][15], // iffy 15
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Jordan Poole": {
            ctgid: 4599,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],// minor iffy 10
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999], // iffy 2
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999], // minor iffy 1
            },
        },
        "Andrew Wiggins": {
            ctgid: 3949,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999], // iffy 4 
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999], // iffy 1
            },
        },
        "Klay Thompson": {
            ctgid: 3653,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        /* NEW TO TEAM
        "Donte DiVincenzo": {
            ctgid: 4440,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        */
        "Draymond Green": {
            ctgid: 1373,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999], // minor iffy 4
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
                // maybe steals
            },
        },
        "Kevon Looney": {
            ctgid: 2221,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999], // iffy 2
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999], // iffy 4
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Jonathan Kuminga": {
            ctgid: 4870,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        /* DATA FROM DIFFERENT YEAR, WAS INJURED LAST YEAR
        "James Wiseman": {
            ctgid: 4746,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        */
    },

    Pistons: {
        "Cade Cunningham": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Sadiq Bey": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Jaden Ivey": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },

    Magic: {
        "Paolo Banchero": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Franz Wagner": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Cole Anthony": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Wendell Carter Jr": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },

    Grizzlies: {
        "Ja Morant": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][15],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Desmond Bane": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Steven Adams": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][6],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Dillon Brooks": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Jaren Jackson Jr": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Tyus Jones": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },

    Pelicans: {
        "Zion Williamson": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Brandon Ingram": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "CJ McCollum": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Herb Jones": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Jonas Valanciunas": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },

    Nets: {
        "Kevin Durant": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Kyrie Irving": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Ben Simmons": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Royce O'Neale": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Nic Claxton": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Joe Harris": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },

    Wizards: {
        "Bradley Beal": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Kristaps Porzingis": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Kyle Kuzma": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },

    Pacers: {
        "Tyrese Haliburton": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Benedict Mathurin": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Buddy Hield": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Myles Turner": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Jalen Smith": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Chris Duarte": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },

    Rockets: {
        "Jalen Green": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Kevin Porter Jr": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Alperen Sengun": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },

    Hawks: {
        "Trae Young": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Dejounte Murray": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Clint Capela": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "John Collins": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "DeAndre Hunter": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },

    Knicks: {
        "Jalen Brunson": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "RJ Barrett": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Julius Randle": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Evan Fournier": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Mitchell Robinson": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },
    
    Thunder: {
        "Josh Giddey": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Shai Gilgeous-Alexander": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Lu Dort": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },

    Timberwolves: {
        "Anthony Edwards": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Karl-Anthony Towns": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Rudy Gobert": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "D'Angelo Russell": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },

    Raptors: {
        "Fred VanVleet": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Pascal Siakam": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Scottie Barnes": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "OG Anunoby": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },

    Cavaliers: {
        "Darius Garland": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][4],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        /* NEW TO TEAM
        "Donovan Mitchell": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][15], 
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        */
        "Evan Mobley": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Jarrett Allen": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },

    Suns: {
        "Chris Paul": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Devin Booker": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "DeAndre Ayton": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Miles Bridges": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Cameron Johnson": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },

    Mavericks: {
        "Luca Doncic": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Dorian Finney-Smith": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Reggie Bullock": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Spencer Dinwiddie": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Tim Hardaway Jr": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },

    Jazz: {
        "Lauri Markannen": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Collin Sexton": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },

    Nuggets: {
        "Nikola Jokic": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Jamal Murray": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Michael Porter Jr": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Aaron Gordon": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Kentavious Caldwell-Pope": {
            ctgid: 99999999999999999999,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },
};

export default PlayerDataMap;
