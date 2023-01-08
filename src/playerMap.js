/*
Not addressed here:

FOR SETH:
- Fill out player map with teams/players and CTG IDs and the players default stats, including -1 for replacing nulls

FOR MAX:
- Per-column summary stats that shows the current value, win % and win/total for that column (to identify weak spots in the bet)
- Add a pulldown for each column that allows you to pick what threshold to set the limit at
    - playerMap data define their default level: init the pulldown to that value and indicate it with a * or something
    - bonus: in the pulldown list, on each entry show a parenthetical with the count and percent for that player on that 
        stat to make it easier to figure out at what level a player is consistent
- Get rid of/shrink big gray header--scrolling down every time is tedious
- Add a little space between players
- Certain teams get stuck on "loading...". Nets, Jazz, Pistons, Timberwolves
- Sometimes shows teams as all "dnp". Seems to be appear randomly but pretty consistently after switching between a few teams. 
    Once it occurs, if you keep arrowing between the teams (i.e. focus the select pulldown and then nav with arrows to change teams), 
    it seems to shift the bug to different teams and eventually it makes its way to the Bucks, the first team in the list.
    At that point, the Bucks will all show as all "dnp" until you refresh the page. 


LATER FOR SOMEONE (roughly in order of priority):
- 'Mark Last Used' button to 'record' a bet (i.e. config of the column thresholds for shown players). Different denotation than default in pulldown. Maybe buttons to set all players to default/last?
- Add support for multi-year stats 
    - Control over years/date range used in calculating percentages and counts
    - Also: 'last X games' (start with 5 or 10, ideally customizable)
    - Ideally show each in section, with bookmark links and summaries at top
    - Need to handle players changing teams better. Maybe some way to limit start date for a player as a hack fix?
- Make player names be links to their NBA advanced box scores page
- Show column for opponent next to game date (can probably grab it when we pull the date ID?)
- Clean up game date string
- Automation of data pull based on CTG IDs or other data source (use to build appropriate URL and download the CSV and import)
- More stats: blocks, steals
- Indicate  home vs away (+ summary stats), playoffs (+ summary stats), back-to-backs, day games,
- Calculate and show desired odds for +EV based on success rate of current display

*/

import { TRACKED_STATS, FORMAT_THRESHOLDS, STAT_THRESHOLDS } from "./constants";

const PlayerDataMap = {
    Bucks: {
        // missing middleton, connaughton
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
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Jrue Holiday": {
            ctgid: 1647,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Brook Lopez": {
            ctgid: 2222,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Grayson Allen": {
            ctgid: 4451,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Bobby Portis": {
            ctgid: 2953,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },

    Bulls: {
        // missing lonzo
        "DeMar DeRozan": {
            ctgid: 867,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][15],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Zach LaVine": {
            ctgid: 2099,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][15],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Nikola Vucevic": {
            ctgid: 3799,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][6],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Ayo Dosunmu": {
            ctgid: 4901,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Patrick Williams": {
            ctgid: 4748,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999], // 4?
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },

    Cavaliers: {
        // missing levert, klove
        "Darius Garland": {
            ctgid: 4576,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][4],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Donovan Mitchell": {
            ctgid: 4362,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][15],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Evan Mobley": {
            ctgid: 4866,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Jarrett Allen": {
            ctgid: 4337,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },

        /*
            Caris LeVert
            Kevin Love
        */
    },

    Celtics: {
        // missing robwill
        "Jaylen Brown": {
            ctgid: 454,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][15],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999], // 2
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999], // 4
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
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999], // 2
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999], // 1
                // maybe blocks?
            },
        },
        "Marcus Smart": {
            ctgid: 3401,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2], // 4?
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
                // maybe steals?
            },
        },
        "Grant Williams": {
            ctgid: 4593,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Malcolm Brogdon": {
            ctgid: 429,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Derrick White": {
            ctgid: 4304,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999], // 1
            },
        },
        /* INJURED
        "Robert Williams III": {
            ctgid: 4425,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
                // maybe blocks?
            },
        },
        */
    },

    Clippers: {
        // missing jackson, wall, zubac, morris, coffey, mann
        "Kawhi Leonard": {
            ctgid: 2173,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Paul George": {
            ctgid: 1271,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },

        /*
        Reggie Jackson
        John Wall
        Marcus Morris
        Ivica Zubac
        Terance Mann
        Amir Coffey
        */
    },

    Grizzlies: {
        // missing brandon clarke, danny green
        "Ja Morant": {
            ctgid: 4573,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][15],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1], // 999
            },
        },
        "Desmond Bane": {
            ctgid: 4774,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Steven Adams": {
            ctgid: 21,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][6],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Dillon Brooks": {
            ctgid: 4258,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Jaren Jackson Jr": {
            ctgid: 4439,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
                // maybe blocks?
            },
        },
        "Tyus Jones": {
            ctgid: 1928,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },

        /*
        Brandon Clarke
        Danny Green
        */
    },

    Hawks: {
        // missing bodganovic, capela hurt
        "Trae Young": {
            ctgid: 4423,
            rapidid: 1046,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][15],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][4],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Dejounte Murray": {
            ctgid: 2630,
            rapidid: 382,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10], // 15
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2], // 4
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999], // 4
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        /*
        "Clint Capela": {
            ctgid: 561,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][6],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        */
        "John Collins": {
            ctgid: 4253,
            rapidid: 761,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999], // 4?
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "DeAndre Hunter": {
            ctgid: 4575,
            rapidid: 1868,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999], // 4?
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1], // 999
            },
        },

        /*
        Bogdan Bogdanovic
        */
    },

    Heat: {
        // missing strus
        "Jimmy Butler": {
            ctgid: 526,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999], // 4?
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Bam Adebayo": {
            ctgid: 4249,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999], // 2?
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][6],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Kyle Lowry": {
            ctgid: 2236,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10], // 999
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2], // 4?
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Tyler Herro": {
            ctgid: 4584,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Caleb Martin": {
            ctgid: 4662,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999], // 4?
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },

        /*
        Max Strus
        */
    },

    Hornets: {
        // missing kelly oubre jr
        /* INJURED
        "Gordon Hayward": {
            ctgid: 1555,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        /*
        /* INJURED
        "LaMelo Ball": {
            ctgid: 4747,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        */
        "Terry Rozier": {
            ctgid: 3190,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][14], // 10
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][2],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "PJ Washington": {
            ctgid: 4583,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10], // 999
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][2],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Mason Plumlee": {
            ctgid: 2932,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4], // 999
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },

        /*
        Kelly Oubre Jr
        */
    },

    Jazz: {
        // missing malik beasley
        "Lauri Markannen": {
            ctgid: 4314,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10], // 15
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Collin Sexton": {
            ctgid: 4431,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Mike Conley": {
            ctgid: 695,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2], // 4
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Jordan Clarkson": {
            ctgid: 653,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10], // 15
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Jarred Vanderbilt": {
            ctgid: 4475,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Kelly Olynyk": {
            ctgid: 2784,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },

        /*
        Malik Beasley - pts? 3pm
        */
    },

    Kings: {
        // missing huerter, monk, murray
        "De'Aaron Fox": {
            ctgid: 4296,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][15],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][2],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Domantas Sabonis": {
            ctgid: 3216,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][3], // 2
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][6],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Harrison Barnes": {
            ctgid: 183,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][8],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][2],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },

        /*
        Kevin Heurter
        Malik Monk
        Keegan Murray
        */
    },

    Knicks: {
        // none missing
        "Jalen Brunson": {
            ctgid: 4466,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][15], // 10
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][4], // 2
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1], // 999
            },
        },
        "Julius Randle": {
            ctgid: 3014,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "RJ Barrett": {
            ctgid: 4574,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Mitchell Robinson": {
            ctgid: 4479,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999], // 4
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Evan Fournier": {
            ctgid: 1176,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },

    Lakers: {
        // missing westbrook, lonnie walker
        "LeBron James": {
            ctgid: 1785,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][20],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1], // rarely only hits 1 two games in a row: if hit 1 last game, maybe push to 2
            },
        },
        "Anthony Davis": {
            ctgid: 816,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][15],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2], // major iffy 2
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][6],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },

        /*
        Russell Westbrook
        Lonnie Walker
        */
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
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Cole Anthony": {
            ctgid: 4759,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Wendell Carter Jr": {
            ctgid: 4429,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Mo Bamba": {
            ctgid: 4443,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },

    Mavericks: {
        // none missing
        "Luka Doncic": {
            ctgid: 4432,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][24],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][4],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Christian Wood": {
            ctgid: 4077,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999], // 10
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Dorian Finney-Smith": {
            ctgid: 1134,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][2],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Reggie Bullock": {
            ctgid: 495,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][1],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Spencer Dinwiddie": {
            ctgid: 916,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999], // 10
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][1],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Tim Hardaway Jr": {
            ctgid: 1486,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
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
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Kyrie Irving": {
            ctgid: 1745,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
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
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Nic Claxton": {
            ctgid: 4602,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Joe Harris": {
            ctgid: 1515,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
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
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
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
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Kentavious Caldwell-Pope": {
            ctgid: 547,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
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
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
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
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Myles Turner": {
            ctgid: 3729,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Jalen Smith": {
            ctgid: 4754,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Chris Duarte": {
            ctgid: 4876,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "TJ McConnell": {
            ctgid: 2393,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
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
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "CJ McCollum": {
            ctgid: 2390,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Herb Jones": {
            ctgid: 4898,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Jonas Valanciunas": {
            ctgid: 3749,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
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
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Saddiq Bey": {
            ctgid: 4763,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
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
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Isaiah Stewart": {
            ctgid: 4760,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },

    Raptors: {
        "Fred VanVleet": {
            ctgid: 3761,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][15],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][4],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Pascal Siakam": {
            ctgid: 3348,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Scottie Barnes": {
            ctgid: 4867,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][4],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "OG Anunoby": {
            ctgid: 4239,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999], // 2
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999], // 4
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
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
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Kevin Porter Jr": {
            ctgid: 4601,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Alperen Sengun": {
            ctgid: 4879,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
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
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "James Harden": {
            ctgid: 1487,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][6],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999], // maybe 4 (effort)
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Tyrese Maxey": {
            ctgid: 4765,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999], // maybe 2
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999], // maybe 1
            },
        },
        "Tobias Harris": {
            ctgid: 1521,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999], // maybe 2
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
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
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Devin Vassell": {
            ctgid: 4755,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Tre Jones": {
            ctgid: 4785,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Jakob Poeltl": {
            ctgid: 2936,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
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
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Devin Booker": {
            ctgid: 344,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "DeAndre Ayton": {
            ctgid: 4446,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Mikal Bridges": {
            ctgid: 4447,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Cameron Johnson": {
            ctgid: 4582,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },

    Timberwolves: {
        "Anthony Edwards": {
            ctgid: 4745,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][15], // 999
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][1],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][2],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Karl-Anthony Towns": {
            ctgid: 3696,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][15], // 10
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Rudy Gobert": {
            ctgid: 1310,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][8], // 999
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][6],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "D'Angelo Russell": {
            ctgid: 3211,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][4],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][1],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
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
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Shai Gilgeous-Alexander": {
            ctgid: 4436,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Lu Dort": {
            ctgid: 4693,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },

    Trailblazers: {
        // missing justise winslow
        "Damian Lillard": {
            ctgid: 2197,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Anfernee Simons": {
            ctgid: 4448,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][15],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][1],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][2],
            },
        },
        "Jusuf Nurkic": {
            ctgid: 2732,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][6],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Jerami Grant": {
            ctgid: 1352,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][14],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][1],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][2],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Josh Hart": {
            ctgid: 4234,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },

        /*
        Justise Winslow
        */
    },

    Warriors: {
        // none missing
        "Stephen Curry": {
            ctgid: 787,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][19], // iffy 15 // 19
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][3],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][3],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][2],
            },
        },
        "Jordan Poole": {
            ctgid: 4599,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999], // minor iffy 10
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][1], // iffy 2
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999], // minor iffy 1
            },
        },
        "Andrew Wiggins": {
            ctgid: 3949,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][2], // iffy 4
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1], // iffy 1
            },
        },
        "Klay Thompson": {
            ctgid: 3653,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][1],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][2],
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
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][4],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][4],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][3], // minor iffy 4
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
                // maybe steals
            },
        },
        "Kevon Looney": {
            ctgid: 2221,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999], // iffy 2
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999], // iffy 4
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Jonathan Kuminga": {
            ctgid: 4870,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
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
        // missing avdija
        "Bradley Beal": {
            ctgid: 231,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][15],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][3],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][2], // 999
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1], // 999
            },
        },
        "Kristaps Porzingis": {
            ctgid: 2955,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][14],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Kyle Kuzma": {
            ctgid: 4230,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][15],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][1],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Will Barton": {
            ctgid: 206,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Monte Morris": {
            ctgid: 4228,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Rui Hachimura": {
            ctgid: 4580,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]:
                    STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },
};

export default PlayerDataMap;
