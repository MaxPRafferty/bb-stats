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
- Add a little space between players
- Certain teams get stuck on "loading...". Nets, Jazz, Pistons, Timberwolves
- Sometimes shows teams as all "dnp". Seems to be appear randomly but pretty consistently after switching between a few teams. 
    Once it occurs, if you keep arrowing between the teams (i.e. focus the select pulldown and then nav with arrows to change teams), 
    it seems to shift the bug to different teams and eventually it makes its way to the Bucks, the first team in the list.
    At that point, the Bucks will all show as all "dnp" until you refresh the page. 


LATER FOR SOMEONE (roughly in order of priority):
- 'Mark Last Used' button to 'record' a bet (i.e. config of the column thresholds for shown players). Different denotation than default in pulldown. Maybe buttons to set all players to default/last?
    - For 'record bet' button: set pulldown values profile paired with date, and then also have a button to 'load' that profile. show dupe of all the cols with the loaded profile)
    - Bet recording could also be made external and loaded in if making it write data is a pain, i.e. from notion
- Automation of data pull based on CTG IDs or other data source (use to build appropriate URL and download the CSV and import)
- Add support for multi-year stats 
    - Control over years/date range used in calculating percentages and counts
    - Also: 'last X games' (start with 5 or 10, ideally customizable)
    - Ideally show each in section, with bookmark links and summaries at top
    - Need to handle players changing teams better. Maybe some way to limit start date for a player as a hack fix?
- Make player names be links to their NBA advanced box scores page
- Show column for opponent next to game date (can probably grab it when we pull the date ID?)
- Clean up game date string
- Still show numbers on disabled cols
- Add area for notes on player. e.g. avoid jaren jackson for anything but rebs because of foul trouble
- Per player of the same thing, so I can skip a player if they in particular are bad against a team
- More stats: blocks, steals, 3PA, FGA/FGM, game score, if went to OT, win/lose, minutes played
- Indicate home vs away (+ summary stats), playoffs (+ summary stats), back-to-backs, day games, maybe other factors?
- Playoffs as separate 'mode' (stage == 3 in the API data)
- Shades of green for amt above thresh
- Warning labels for player being injured/returning from injury (Underdog NBA (@Underdog__NBA) / Twitter might be helpful - embedding tweets related to players/team?) 
- Calculate and show desired odds for +EV based on success rate of current display
- Success rate for selected player stats vs specific teams in a sidebar: help avoid getting on teams they do poorly against. Also maybe just aggregate how often all players miss against a particular team?
- https://www.oddsshark.com/nba/ats-standings - definitely another less interesting data-edge to be found with things like this. wonder how early these trends develop and if they hold up historically (within reason)

Kelly criterion, Gamblers podcast, Send Frank the bb stats thing once the live site has been updated 
*/

import { TRACKED_STATS, FORMAT_THRESHOLDS, STAT_THRESHOLDS } from "./constants";

const PlayerDataMap = {

    
    Bucks: { // missing middleton, connaughton
        "Khris Middleton": {
            ctgid: 2495,
            nbaid: 1,
            rapidid: 361,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Giannis Antetokuonmpo": {
            ctgid: 96,
            nbaid: 1,
            rapidid: 20,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][20],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][6],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Jrue Holiday": {
            ctgid: 1647,
            nbaid: 1,
            rapidid: 242,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Brook Lopez": {
            ctgid: 2222,
            nbaid: 1,
            rapidid: 323,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Grayson Allen": {
            ctgid: 4451,
            nbaid: 1,
            rapidid: 926,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Bobby Portis": {
            ctgid: 2953,
            nbaid: 1,
            rapidid: 431,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Pat Connaughton": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 115,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Jevon Carter": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 949,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Joe Ingles": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 258,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },

    Bulls: { // missing lonzo
        "DeMar DeRozan": {
            ctgid: 867,
            nbaid: 1,
            rapidid: 136,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][15],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Zach LaVine": {
            ctgid: 2099,
            nbaid: 1,
            rapidid: 308,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][15],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Nikola Vucevic": {
            ctgid: 3799,
            nbaid: 1,
            rapidid: 534,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][6],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Ayo Dosunmu": {
            ctgid: 4901,
            nbaid: 1,
            rapidid: 2802,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Patrick Williams": {
            ctgid: 4748,
            nbaid: 1,
            rapidid: 2664,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999], // 4?
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
      "Alex Caruso": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 631,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999], 
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },

    Cavaliers: { // missing levert, klove
        "Darius Garland": {
            ctgid: 4576,
            nbaid: 1,
            rapidid: 1860,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][4],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Donovan Mitchell": {
            ctgid: 4362,
            nbaid: 1,
            rapidid: 840,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][15], 
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Evan Mobley": {
            ctgid: 4866,
            nbaid: 1,
            rapidid: 2835,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Jarrett Allen": {
            ctgid: 4337,
            nbaid: 1,
            rapidid: 727,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Caris LeVert": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 317,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Kevin Love": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 326,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },

    Celtics: { // missing robwill
        "Jaylen Brown": {
            ctgid: 454,
            nbaid: 1,
            rapidid: 75,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][15],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999], // 2
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999], // 4
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Jayson Tatum": {
            ctgid: 4268,
            nbaid: 1,
            rapidid: 882,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][15],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Al Horford": {
            ctgid: 1675,
            nbaid: 1,
            rapidid: 248,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999], // 2
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999], // 1
                // maybe blocks?
            },
        },
        "Marcus Smart": {
            ctgid: 3401,
            nbaid: 1,
            rapidid: 486,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2], // 4?
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
                // maybe steals?
            },
        },
        "Grant Williams": {
            ctgid: 4593,
            nbaid: 1,
            rapidid: 1901,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Malcolm Brogdon": {
            ctgid: 429,
            nbaid: 1,
            rapidid: 71,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        }, 
        "Derrick White": {
            ctgid: 4304,
            nbaid: 1,
            rapidid: 897,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999], // 1
            },
        },
        "Robert Williams III": {
            ctgid: 4425,
            nbaid: 1,
            rapidid: 1045,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
                // maybe blocks?
            },
        },
    },

    Clippers: { // missing jackson, wall, zubac, morris, coffey, mann
        "Kawhi Leonard": {
            ctgid: 2173,
            nbaid: 1,
            rapidid: 314,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Paul George": {
            ctgid: 1271,
            nbaid: 1,
            rapidid: 189,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Reggie Jackson": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 264,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "John Wall": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 539,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Marcus Morris Sr": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 373,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Ivica Zubac": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 575,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Terance Mann": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 1877,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Norman Powell": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 434,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Luke Kennard": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 814,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Nicolas Batum": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 40,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },

    Grizzlies: { // missing brandon clarke, danny green
        "Ja Morant": {
            ctgid: 4573,
            nbaid: 1,
            rapidid: 1881,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][15],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1], // 999
            },
        },
        "Desmond Bane": {
            ctgid: 4774,
            nbaid: 1,
            rapidid: 2568,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Steven Adams": {
            ctgid: 21,
            nbaid: 1,
            rapidid: 4,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][6],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Dillon Brooks": {
            ctgid: 4258,
            nbaid: 1,
            rapidid: 749,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Jaren Jackson Jr": {
            ctgid: 4439,
            nbaid: 1,
            rapidid: 982,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
                // maybe blocks?
            },
        },
        "Tyus Jones": {
            ctgid: 1928,
            nbaid: 1,
            rapidid: 285,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Brandon Clarke": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 1853,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },
    
    Hawks: { // missing bodganovic, capela hurt
        "Trae Young": {
            ctgid: 4423,
            nbaid: 1,
            rapidid: 1046,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][15],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][4],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Dejounte Murray": {
            ctgid: 2630,
            nbaid: 1,
            rapidid: 382,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10], // 15
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2], // 4
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999], // 4
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        /*
        "Clint Capela": {
            ctgid: 561,
            nbaid: 1,
            rapidid: 92,
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
            nbaid: 1,
            rapidid: 761,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999], // 4?
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "DeAndre Hunter": {
            ctgid: 4575,
            nbaid: 1,
            rapidid: 1868,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999], // 4?
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1], // 999 
            },
        },
         "Bogdan Bogdanovic": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 743,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999], 
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"][999],
            },
        },
        "Onyeka Okongwu": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 2629,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999], 
            },
        },
    },

    Heat: { // missing strus
        "Jimmy Butler": {
            ctgid: 526,
            nbaid: 1,
            rapidid: 86,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999], // 4?
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Bam Adebayo": {
            ctgid: 4249,
            nbaid: 1,
            rapidid: 724,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999], // 2?
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][6],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Kyle Lowry": {
            ctgid: 2236,
            nbaid: 1,
            rapidid: 327,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10], // 999
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2], // 4?
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Tyler Herro": {
            ctgid: 4584,
            nbaid: 1,
            rapidid: 1866,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Caleb Martin": {
            ctgid: 4662,
            nbaid: 1,
            rapidid: 2242,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999], // 4?
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Max Strus": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 2051,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Victor Oladipo": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 403,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },

    Hornets: { // missing kelly oubre jr
        "Gordon Hayward": {
            ctgid: 1555,
            nbaid: 1,
            rapidid: 227,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "LaMelo Ball": {
            ctgid: 4747,
            nbaid: 1,
            rapidid: 2566,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Terry Rozier": {
            ctgid: 3190,
            nbaid: 1,
            rapidid: 458,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][14], // 10
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][2],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "PJ Washington": {
            ctgid: 4583,
            nbaid: 1,
            rapidid: 1897,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10], // 999
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][2],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Mason Plumlee": {
            ctgid: 2932,
            nbaid: 1,
            rapidid: 426,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4], // 999
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Kelly Oubre Jr": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 407,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },

    Jazz: { // missing malik beasley
        "Lauri Markannen": {
            ctgid: 4314,
            nbaid: 1,
            rapidid: 830,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10], // 15
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Collin Sexton": {
            ctgid: 4431,
            nbaid: 1,
            rapidid: 1021,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Mike Conley": {
            ctgid: 695,
            nbaid: 1,
            rapidid: 114,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2], // 4
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Jordan Clarkson": {
            ctgid: 653,
            nbaid: 1,
            rapidid: 109,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10], // 15
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Jarred Vanderbilt": {
            ctgid: 4475,
            nbaid: 1,
            rapidid: 1036,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Kelly Olynyk": {
            ctgid: 2784,
            nbaid: 1,
            rapidid: 404,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Malik Beasley": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 46,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Walker Kessler": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 3457,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },

    Kings: { // missing huerter, monk, murray
        "De'Aaron Fox": {
            ctgid: 4296,
            nbaid: 1,
            rapidid: 776,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][15],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][2],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Domantas Sabonis": {
            ctgid: 3216,
            nbaid: 1,
            rapidid: 463,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][3], // 2
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][6],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Harrison Barnes": {
            ctgid: 183,
            nbaid: 1,
            rapidid: 36,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][8],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][2],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Kevin Heurter": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 980,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Malik Monk": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 842,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Keegan Murray": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 3475,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },

    Knicks: { // none missing
        "Jalen Brunson": {
            ctgid: 4466,
            nbaid: 1,
            rapidid: 946,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][15], // 10
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][4], // 2
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1], // 999
            },
        },
        "Julius Randle": {
            ctgid: 3014,
            nbaid: 1,
            rapidid: 441,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "RJ Barrett": {
            ctgid: 4574,
            nbaid: 1,
            rapidid: 1846,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Mitchell Robinson": { 
            ctgid: 4479,
            nbaid: 1,
            rapidid: 1020,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999], // 4
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Evan Fournier": {
            ctgid: 1176,
            nbaid: 1,
            rapidid: 177,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Quentin Grimes": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 2811,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Immanuel Quickley": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 2636,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },
    
    Lakers: { // missing westbrook, lonnie walker
        "LeBron James": {
            ctgid: 1785,
            nbaid: 1,
            rapidid: 265,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][20],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1], // rarely only hits 1 two games in a row: if hit 1 last game, maybe push to 2
            },
        },
        "Anthony Davis": {
            ctgid: 816,
            nbaid: 1,
            rapidid: 126,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][15],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2], // major iffy 2
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][6],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Russell Westbrook": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 544,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Lonnie Walker": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 1038,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Thomas Bryant": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 753,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Patrick Beverley": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 53,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Dennis Schroder": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 472,
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
            ctgid: 5090,
            nbaid: 1,
            rapidid: 3414,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Franz Wagner": {
            ctgid: 4871,
            nbaid: 1,
            rapidid: 2858,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Jalen Suggs": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 2852,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Cole Anthony": {
            ctgid: 4759,
            nbaid: 1,
            rapidid: 2563,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Wendell Carter Jr": {
            ctgid: 4429,
            nbaid: 1,
            rapidid: 950,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Markelle Fultz": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 779,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Moritz Wagner": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 1037,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Bol Bol": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 1849,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Mo Bamba": {
            ctgid: 4443,
            nbaid: 1,
            rapidid: 932,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },

    Mavericks: { // none missing
        "Luka Doncic": {
            ctgid: 4432,
            nbaid: 1,
            rapidid: 963,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][24],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][4],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Christian Wood": {
            ctgid: 4077,
            nbaid: 1,
            rapidid: 560,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999], // 10
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Dorian Finney-Smith": {
            ctgid: 1134,
            nbaid: 1,
            rapidid: 175,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][2],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Reggie Bullock": {
            ctgid: 495,
            nbaid: 1,
            rapidid: 82,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][1],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Spencer Dinwiddie": {
            ctgid: 916,
            nbaid: 1,
            rapidid: 142,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999], // 10
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][1],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Tim Hardaway Jr": {
            ctgid: 1486,
            nbaid: 1,
            rapidid: 215,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Dwight Powell": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 433,
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
            nbaid: 1,
            rapidid: 153,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Kyrie Irving": {
            ctgid: 1745,
            nbaid: 1,
            rapidid: 261,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Ben Simmons": {
            ctgid: 3361,
            nbaid: 1,
            rapidid: 481,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Royce O'Neale": {
            ctgid: 4364,
            nbaid: 1,
            rapidid: 851,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Nic Claxton": {
            ctgid: 4602,
            nbaid: 1,
            rapidid: 1854,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Joe Harris": {
            ctgid: 1515,
            nbaid: 1,
            rapidid: 221,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "TJ Warren": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 540,
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
            nbaid: 1,
            rapidid: 279,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Jamal Murray": {
            ctgid: 2631,
            nbaid: 1,
            rapidid: 383,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Michael Porter Jr": {
            ctgid: 4433,
            nbaid: 1,
            rapidid: 1014,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Aaron Gordon": {
            ctgid: 1323,
            nbaid: 1,
            rapidid: 195,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Kentavious Caldwell-Pope": {
            ctgid: 547,
            nbaid: 1,
            rapidid: 89,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Bruce Brown": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 944,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Bones Hyland": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 2816,
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
            nbaid: 1,
            rapidid: 2595,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Benedict Mathurin": {
            ctgid: 5095,
            nbaid: 1,
            rapidid: 3466,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Buddy Hield": {
            ctgid: 1608,
            nbaid: 1,
            rapidid: 236,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Myles Turner": {
            ctgid: 3729,
            nbaid: 1,
            rapidid: 522,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Jalen Smith": {
            ctgid: 4754,
            nbaid: 1,
            rapidid: 2644,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Chris Duarte": {
            ctgid: 4876,
            nbaid: 1,
            rapidid: 2803,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "TJ McConnell": {
            ctgid: 2393,
            nbaid: 1,
            rapidid: 348,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Andrew Nembhard": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 3476,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Aaron Nesmith": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 2626,
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
            ctgid: 4572,
            nbaid: 1,
            rapidid: 1902,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Brandon Ingram": {
            ctgid: 1742,
            nbaid: 1,
            rapidid: 260,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "CJ McCollum": {
            ctgid: 2390,
            nbaid: 1,
            rapidid: 347,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Herb Jones": {
            ctgid: 4898,
            nbaid: 1,
            rapidid: 2822,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Jonas Valanciunas": {
            ctgid: 3749,
            nbaid: 1,
            rapidid: 525,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Larry Nance Jr": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 385,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Trey Murphy III": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 2837,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Jose Alvarado": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 2941,
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
            nbaid: 1,
            rapidid: 2801,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Saddiq Bey": {
            ctgid: 4763,
            nbaid: 1,
            rapidid: 2569,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Jaden Ivey": {
            ctgid: 5094,
            nbaid: 1,
            rapidid: 3451,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Bojan Bogdanovic": {
            ctgid: 329,
            nbaid: 1,
            rapidid: 60,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Isaiah Stewart": {
            ctgid: 4760,
            nbaid: 1,
            rapidid: 2648,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Marvin Bagley III": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 931,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Killian Hayes": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 2599,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Jalen Duren": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 3433,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Alec Burks": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 84,
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
            nbaid: 1,
            rapidid: 527,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][15],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][4],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Pascal Siakam": {
            ctgid: 3348,
            nbaid: 1,
            rapidid: 479,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Scottie Barnes": {
            ctgid: 4867,
            nbaid: 1,
            rapidid: 2789,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][4],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "OG Anunoby": {
            ctgid: 4239,
            nbaid: 1,
            rapidid: 732,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999], // 2
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999], // 4
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Gary Trent Jr": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 1058,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Chris Boucher": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 745,
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
            nbaid: 1,
            rapidid: 2810,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Kevin Porter Jr": {
            ctgid: 4601,
            nbaid: 1,
            rapidid: 1888,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Alperen Sengun": {
            ctgid: 4879,
            nbaid: 1,
            rapidid: 2847,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Eric Gordon": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 196,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
         "Jabari Smith Jr": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 3489,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },   
        "Tari Eason": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 3435,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },   
         "Kenyon Martin Jr": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 2617,
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
            nbaid: 1,
            rapidid: 159,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][20],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][8],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "James Harden": {
            ctgid: 1487,
            nbaid: 1,
            rapidid: 216,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][6],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999], // maybe 4 (effort)
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Tyrese Maxey": {
            ctgid: 4765,
            nbaid: 1,
            rapidid: 2619,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999], // maybe 2
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999], // maybe 1
            },
        },
        "Tobias Harris": {
            ctgid: 1521,
            nbaid: 1,
            rapidid: 222,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999], // maybe 2
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "De'Anthony Melton": {
            ctgid: 4480,
            nbaid: 1,
            rapidid: 998,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "PJ Tucker": {
            ctgid: 3715,
            nbaid: 1,
            rapidid: 520,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999], // maybe 4
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Georges Niang": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 391,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999], 
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },

    Spurs: {
        "Keldon Johnson": {
            ctgid: 4600,
            nbaid: 1,
            rapidid: 1872,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Devin Vassell": {
            ctgid: 4755,
            nbaid: 1,
            rapidid: 2661,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Tre Jones": {
            ctgid: 4785,
            nbaid: 1,
            rapidid: 2606,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Jakob Poeltl": {
            ctgid: 2936,
            nbaid: 1,
            rapidid: 428,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Jeremy Sochan": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 3490,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Doug McDermott": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 351,
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
            nbaid: 1,
            rapidid: 415,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Devin Booker": {
            ctgid: 344,
            nbaid: 1,
            rapidid: 64,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "DeAndre Ayton": {
            ctgid: 4446,
            nbaid: 1,
            rapidid: 930,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Mikal Bridges": {
            ctgid: 4447,
            nbaid: 1,
            rapidid: 940,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Cameron Johnson": {
            ctgid: 4582,
            nbaid: 1,
            rapidid: 1871,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Torrey Craig": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 765,
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
            nbaid: 1,
            rapidid: 2584,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][15], // 999
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][1],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][2],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Karl-Anthony Towns": {
            ctgid: 3696,
            nbaid: 1,
            rapidid: 519,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][15], // 10
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Rudy Gobert": {
            ctgid: 1310,
            nbaid: 1,
            rapidid: 192,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][8], // 999
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][6], 
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "D'Angelo Russell": {
            ctgid: 3211,
            nbaid: 1,
            rapidid: 462,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][4],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][1],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },

    Thunder: {
        "Josh Giddey": {
            ctgid: 4869,
            nbaid: 1,
            rapidid: 2808,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Shai Gilgeous-Alexander": {
            ctgid: 4436,
            nbaid: 1,
            rapidid: 972,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Lu Dort": {
            ctgid: 4693,
            nbaid: 1,
            rapidid: 2040,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },

    Trailblazers: { // missing justise winslow
        "Damian Lillard": {
            ctgid: 2197,
            nbaid: 1,
            rapidid: 319,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Anfernee Simons": {
            ctgid: 4448,
            nbaid: 1,
            rapidid: 1023,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][15],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][1],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][2],
            },
        },
        "Jusuf Nurkic": {
            ctgid: 2732,
            nbaid: 1,
            rapidid: 398,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][6],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Jerami Grant": {
            ctgid: 1352,
            nbaid: 1,
            rapidid: 200,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][14],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][1],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][2],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Josh Hart": {
            ctgid: 4234,
            nbaid: 1,
            rapidid: 791,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Justise Winslow": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 558,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },

    Warriors: { // none missing
        "Stephen Curry": {
            ctgid: 787,
            nbaid: 1,
            rapidid: 124,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][19], // iffy 15 // 19
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][3],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][3],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][2],
            },
        },
        "Jordan Poole": {
            ctgid: 4599,
            nbaid: 1,
            rapidid: 1887,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],// minor iffy 10
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][1], // iffy 2
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999], // minor iffy 1
            },
        },
        "Andrew Wiggins": {
            ctgid: 3949,
            nbaid: 1,
            rapidid: 548,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][2], // iffy 4 
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1], // iffy 1
            },
        },
        "Klay Thompson": {
            ctgid: 3653,
            nbaid: 1,
            rapidid: 514,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][10],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][1],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][2],
            },
        },
        "Donte DiVincenzo": {
            ctgid: 4440,
            nbaid: 1,
            rapidid: 962,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Draymond Green": {
            ctgid: 1373,
            nbaid: 1,
            rapidid: 204,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][4],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][4],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][3], // minor iffy 4
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
                // maybe steals
            },
        },
        "Kevon Looney": {
            ctgid: 2221,
            nbaid: 1,
            rapidid: 322,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999], // iffy 2
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999], // iffy 4
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Jonathan Kuminga": {
            ctgid: 4870,
            nbaid: 1,
            rapidid: 2827,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "James Wiseman": {
            ctgid: 4746,
            nbaid: 1,
            rapidid: 2666,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
    },

    Wizards: { // missing avdija
        "Bradley Beal": {
            ctgid: 231,
            nbaid: 1,
            rapidid: 45,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][15],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][3],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][2], // 999 
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1], // 999
            },
        },
        "Kristaps Porzingis": {
            ctgid: 2955,
            nbaid: 1,
            rapidid: 432,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][14],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Kyle Kuzma": {
            ctgid: 4230,
            nbaid: 1,
            rapidid: 820,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][15],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][1],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][4],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][1],
            },
        },
        "Will Barton": {
            ctgid: 206,
            nbaid: 1,
            rapidid: 38,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Monte Morris": {
            ctgid: 4228,
            nbaid: 1,
            rapidid: 845,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][2],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Rui Hachimura": {
            ctgid: 4580,
            nbaid: 1,
            rapidid: 1862,
            defaultStats: {
                [TRACKED_STATS.PTS]: STAT_THRESHOLDS[TRACKED_STATS.PTS][999],
                [TRACKED_STATS.AST]: STAT_THRESHOLDS[TRACKED_STATS.AST][999],
                [TRACKED_STATS.REB]: STAT_THRESHOLDS[TRACKED_STATS.REB][999],
                [TRACKED_STATS["3PM"]]: STAT_THRESHOLDS[TRACKED_STATS["3PM"]][999],
            },
        },
        "Corey Kispert": {
            ctgid: 0,
            nbaid: 0,
            rapidid: 2825,
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
