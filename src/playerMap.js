/*
Not addressed here:

FOR SETH:
- Fill out player map with teams/players and CTG IDs and the players default stats, including -1 for replacing nulls

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
- Calculate and show desired odds for +EV based on success rate of current display

*/

import { TRACKED_STATS, FORMAT_THRESHOLDS, STAT_THRESHOLDS } from "./constants";

const PlayerDataMap = {

    
    Bucks: {
        /* INJURED
        "Khris Middleton": {
            ctgid: 2495,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
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
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Jrue Holiday": {
            ctgid: 1647,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Brook Lopez": {
            ctgid: 2222,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Grayson Allen": {
            ctgid: 4451,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Bobby Portis": {
            ctgid: 2953,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },

    Bulls: {
        "DeMar DeRozan": {
            ctgid: 867,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][15],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Zach LaVine": {
            ctgid: 2099,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][15],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Nikola Vucevic": {
            ctgid: 3799,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][6],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Ayo Dosunmu": {
            ctgid: 4901,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Patrick Williams": {
            ctgid: 4748,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999], // 4?
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },

    Cavaliers: {
        "Darius Garland": {
            ctgid: 4576,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][4],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        /* DIFF TEAM LAST YEAR
        "Donovan Mitchell": {
            ctgid: 4362,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][15], 
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        */
        "Evan Mobley": {
            ctgid: 4866,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Jarrett Allen": {
            ctgid: 4337,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },

    Celtics: {
        "Jaylen Brown": {
            ctgid: 454,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][15],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
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
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Marcus Smart": {
            ctgid: 3401,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
                // maybe steals?
            },
        },
        "Grant Williams": {
            ctgid: 4593,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        /* NEW TO TEAM // ast good tho
        "Malcolm Brogdon": {
            ctgid: 429,
            defaultStats: {
                //[TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][5],
                //[TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                //[TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                //[TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        }, 
        */
        /* NEW TO TEAM
        "Derrick White": {
            ctgid: 4304,
            defaultStats: {
                //[TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][5],
                //[TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                //[TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                //[TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        /* INJURED
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

    Clippers: {
        "Kawhi Leonard": {
            ctgid: 2173,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Paul George": {
            ctgid: 1271,
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
            ctgid: 4573,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][15],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Desmond Bane": {
            ctgid: 4774,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Steven Adams": {
            ctgid: 21,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][6],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Dillon Brooks": {
            ctgid: 4258,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Jaren Jackson Jr": {
            ctgid: 4439,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Tyus Jones": {
            ctgid: 1928,
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
            ctgid: 4423,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Dejounte Murray": {
            ctgid: 2630,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Clint Capela": {
            ctgid: 561,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "John Collins": {
            ctgid: 4253,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "DeAndre Hunter": {
            ctgid: 4575,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },

    Heat: {
        "Jimmy Butler": {
            ctgid: 526,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Bam Adebayo": {
            ctgid: 4249,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Kyle Lowry": {
            ctgid: 2236,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Tyler Herro": {
            ctgid: 4584,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Caleb Martin": {
            ctgid: 4662,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },

    Hornets: {
        "Gordon Hayward": {
            ctgid: 1555,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "LaMelo Ball": {
            ctgid: 4747,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Terry Rozier": {
            ctgid: 3190,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "PJ Washington": {
            ctgid: 4583,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Mason Plumlee": {
            ctgid: 2932,
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
            ctgid: 4314,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Collin Sexton": {
            ctgid: 4431,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Mike Conley": {
            ctgid: 695,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Jordan Clarkson": {
            ctgid: 653,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Jarred Vanderbilt": {
            ctgid: 4475,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Kelly Olynyk": {
            ctgid: 2784,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },

    Kings: {
        "De'Aaron Fox": {
            ctgid: 4296,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Domantas Sabonis": {
            ctgid: 3216,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Harrison Barnes": {
            ctgid: 183,
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
            ctgid: 4466,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "RJ Barrett": {
            ctgid: 4574,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Julius Randle": {
            ctgid: 3014,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Evan Fournier": {
            ctgid: 1176,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Mitchell Robinson": { 
            ctgid: 4479,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
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
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2], // major iffy 2
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][6],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },

    Magic: {
        /* ROOKIE
        "Paolo Banchero": {
            ctgid: 5090,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        */
        "Franz Wagner": {
            ctgid: 4871,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Cole Anthony": {
            ctgid: 4759,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Wendell Carter Jr": {
            ctgid: 4429,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Mo Bamba": {
            ctgid: 4443,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },

    Mavericks: {
        "Luka Doncic": {
            ctgid: 4432,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Christian Wood": {
            ctgid: 4077,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Dorian Finney-Smith": {
            ctgid: 1134,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Reggie Bullock": {
            ctgid: 495,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Spencer Dinwiddie": {
            ctgid: 916,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Tim Hardaway Jr": {
            ctgid: 1486,
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
            ctgid: 984,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Kyrie Irving": {
            ctgid: 1745,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        /* INJURY RETURN
        "Ben Simmons": {
            ctgid: 3361,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        */
        "Royce O'Neale": {
            ctgid: 4364,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Nic Claxton": {
            ctgid: 4602,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Joe Harris": {
            ctgid: 1515,
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
            ctgid: 1883,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        /* INJURY RETURN
        "Jamal Murray": {
            ctgid: 2631,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        */
        /* INJURY RETURN
        "Michael Porter Jr": {
            ctgid: 4433,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        */
        "Aaron Gordon": {
            ctgid: 1323,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Kentavious Caldwell-Pope": {
            ctgid: 547,
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
            ctgid: 4756,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        /* ROOKIE
        "Benedict Mathurin": {
            ctgid: 5095,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        */
        "Buddy Hield": {
            ctgid: 1608,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Myles Turner": {
            ctgid: 3729,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Jalen Smith": {
            ctgid: 4754,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Chris Duarte": {
            ctgid: 4876,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "TJ McConnell": {
            ctgid: 2393,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },

    Pelicans: {
        /* RETURN FROM INJURY
        "Zion Williamson": {
            ctgid: 4572,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        */
        "Brandon Ingram": {
            ctgid: 1742,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "CJ McCollum": {
            ctgid: 2390,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Herb Jones": {
            ctgid: 4898,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Jonas Valanciunas": {
            ctgid: 3749,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },

    Pistons: {
        "Cade Cunningham": {
            ctgid: 4864,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Saddiq Bey": {
            ctgid: 4763,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        /* ROOKIE
        "Jaden Ivey": {
            ctgid: 5094,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        */
        "Bojan Bogdanovic": {
            ctgid: 329,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Isaiah Stewart": {
            ctgid: 4760,
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
            ctgid: 3761,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Pascal Siakam": {
            ctgid: 3348,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Scottie Barnes": {
            ctgid: 4867,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "OG Anunoby": {
            ctgid: 4239,
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
            ctgid: 4865,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Kevin Porter Jr": {
            ctgid: 4601,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Alperen Sengun": {
            ctgid: 4879,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
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

    Spurs: {
        "Keldon Johnson": {
            ctgid: 4600,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Devin Vassell": {
            ctgid: 4755,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Tre Jones": {
            ctgid: 4785,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Jakob Poeltl": {
            ctgid: 2936,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },

    Suns: {
        "Chris Paul": {
            ctgid: 2857,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Devin Booker": {
            ctgid: 344,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "DeAndre Ayton": {
            ctgid: 4446,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Mikal Bridges": {
            ctgid: 4447,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Cameron Johnson": {
            ctgid: 4582,
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
            ctgid: 4745,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Karl-Anthony Towns": {
            ctgid: 3696,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Rudy Gobert": {
            ctgid: 1310,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "D'Angelo Russell": {
            ctgid: 3211,
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
            ctgid: 4869,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Shai Gilgeous-Alexander": {
            ctgid: 4436,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Lu Dort": {
            ctgid: 4693,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },

    Trailblazers: {
        "Damian Lillard": {
            ctgid: 2197,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Anfernee Simons": {
            ctgid: 4448,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Jusuf Nurkic": {
            ctgid: 2732,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Jerami Grant": {
            ctgid: 1352,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Josh Hart": {
            ctgid: 4234,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
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

    Wizards: {
        "Bradley Beal": {
            ctgid: 231,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Kristaps Porzingis": {
            ctgid: 2955,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Kyle Kuzma": {
            ctgid: 4230,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Will Barton": {
            ctgid: 206,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Monte Morris": {
            ctgid: 4228,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Rui Hachimura": {
            ctgid: 4580,
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
