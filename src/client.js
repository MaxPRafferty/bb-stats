import { apiHost, apiKey } from "./constants";
import PlayerDataMap from "./playerMap";
import { getItem, setItem } from "./util.lzStore";

const stripNonRegularSeasonGames = (games) => {
    return games.filter((game) => game.stage === 2);
};

const stripFutureGames = (games) => {
    return games.filter((game) => game.date.start < new Date().toISOString());
};

const transformGamesForDisplay = (team, games) => {
    return games.map((game) => {
        /**
         Game Object Structure:
        { "id": 8899,
        "league": "standard",
        "season": 2021,
        "date": { "start": "2021-11-03T23:30:00.000Z", "end": "2021-11-04T01:51:00.000Z", "duration": "2:05" },
        "stage": 2,
        "status": { "clock": null, "halftime": false, "short": 3, "long": "Finished" },
        "periods": { "current": 4, "total": 4, "endOfPeriod": false },
        "arena": { "name": "Barclays Center", "city": "Brooklyn", "state": "NY", "country": "USA" },
        "teams": {
          "visitors": { "id": 1, "name": "Atlanta Hawks", "nickname": "Hawks", "code": "ATL", "logo": "https://upload.wikimedia.org/wikipedia/fr/e/ee/Hawks_2016.png" },
          "home": { "id": 4, "name": "Brooklyn Nets", "nickname": "Nets", "code": "BKN", "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Brooklyn_Nets_newlogo.svg/130px-Brooklyn_Nets_newlogo.svg.png" }
        },
        "scores": {
          "visitors": { "win": 4, "loss": 4, "series": { "win": 0, "loss": 1 }, "linescore": [ "28", "31", "20", "29" ], "points": 108 },
          "home": { "win": 5, "loss": 3, "series": { "win": 1, "loss": 0 }, "linescore": [ "35", "26", "34", "22" ], "points": 117 }
        },
        "officials": [ "Matt Boland", "Brent Barnaky", "Josh Tiven" ],
        "timesTied": 8,
        "leadChanges": 18,
        "nugget": null },
         */

        let myDate = new Date(game.date.start);
        let startTime = myDate.getHours();

        return {
            id: game.id,
            location: `${game.teams.home.id}` === `${team}` ? "home" : "away",
            opponent:
                `${game.teams.home.id}` === `${team}`
                    ? game.teams.visitors.nickname
                    : game.teams.home.nickname,
            opponentLogo:
                `${game.teams.home.id}` === `${team}`
                    ? game.teams.visitors.logo
                    : game.teams.home.logo,
            tod: startTime < 18 ? "day" : "night",
            date: myDate.toDateString().substring(4),
            dateId: game.date.start,
            winLose:
                `${game.teams.home.id}` === `${team}`
                    ? game.scores.home.points > game.scores.visitors.points
                        ? "W"
                        : "L"
                    : game.scores.visitors.points > game.scores.home.points
                    ? "W"
                    : "L",
            score:
                `${game.teams.home.id}` === `${team}`
                    ? game.scores.home.points
                    : game.scores.visitors.points,
            opponentScore:
                `${game.teams.home.id}` === `${team}`
                    ? game.scores.visitors.points
                    : game.scores.home.points,
            rawData: game,
        };
    });
};

/***
 * team: string, valued from "1" to "30", representing all teams in the league alphabetically. Defaults to the hawks
 * season: string, four digit year value. Defaults to 2022
 */
export const getGamesPerTeamPerSeason = async (
    team = "1",
    season = "2022",
    forceRefresh = false
) => {
    const storageKey = `games_team-${team}_season-${season}`;
    const storedGames = getItem(storageKey);
    let gameResponse;
    try {
        gameResponse = Promise.resolve(JSON.parse(storedGames));
    } catch (e) {
        console.log(e);
    }

    if (
        forceRefresh ||
        !storedGames ||
        storedGames === "undefined" ||
        storedGames === "null"
    ) {
        const options = {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": apiKey,
                "X-RapidAPI-Host": apiHost,
            },
        };

        gameResponse = fetch(
            `https://${apiHost}/games?season=${season}&team=${team}`,
            options
        )
            .then((response) => response.json()) // format to JSON
            .then((response) => response.response); // strip useless metadata
    }
    return await gameResponse
        .then((response) => {
            setItem(storageKey, JSON.stringify(response));
            return response;
        })
        .then((response) => stripNonRegularSeasonGames(response))
        .then((response) => stripFutureGames(response))
        .then((response) => transformGamesForDisplay(team, response))
        .catch((err) => console.error(err));
};

const filterNonNBA = (teams) => {
    return teams.filter((team) => team.nbaFranchise && !team.allStar);
};

export const getAllNBATeams = async () => {
    const storageKey = "all_teams";
    const storedTeams = getItem(storageKey);
    let teamsResponse;
    try {
        teamsResponse = Promise.resolve(JSON.parse(storedTeams));
    } catch (e) {
        console.log(e);
    }

    if (!storedTeams || storedTeams === "undefined" || storedTeams === "null") {
        const options = {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": apiKey,
                "X-RapidAPI-Host": apiHost,
            },
        };

        teamsResponse = fetch(`https://${apiHost}/teams`, options)
            .then((response) => response.json()) // format to JSON
            .then((response) => response.response); // strip useless metadata
    }
    return await teamsResponse
        .then((response) => {
            setItem(storageKey, JSON.stringify(response));
            return response;
        })
        .then((response) => filterNonNBA(response))
        .catch((err) => console.error(err));
};

export const getPlayersPerTeamPerSeason = async (
    team,
    season,
    forceRefresh = false
) => {
    const storageKey = `team_team-${team}_season-${season}`;
    const storedTeam = getItem(storageKey);
    let teamResponse;
    try {
        teamResponse = Promise.resolve(JSON.parse(storedTeam));
    } catch (e) {
        console.log(e);
    }

    if (
        forceRefresh ||
        !storedTeam ||
        storedTeam === "undefined" ||
        storedTeam === "null"
    ) {
        const options = {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": apiKey,
                "X-RapidAPI-Host": apiHost,
            },
        };

        teamResponse = fetch(
            `https://${apiHost}/players?season=${season}&team=${team}`,
            options
        )
            .then((response) => response.json()) // format to JSON
            .then((response) => response.response) // strip useless metadata
            .catch((err) => console.error(err));
    }
    return await teamResponse.then((response) => {
        setItem(storageKey, JSON.stringify(response));
        return response;
    });
};

export const getStatsByPlayerPerSeason = async (
    id,
    season,
    forceRefresh = false
) => {
    const storageKey = `stats_player-${id}_season-${season}`;
    const storedStats = getItem(storageKey);
    let statResponse;
    try {
        statResponse = Promise.resolve(JSON.parse(storedStats));
    } catch (e) {
        console.log(e);
    }

    if (
        forceRefresh ||
        !storedStats ||
        storedStats === "undefined" ||
        storedStats === "null"
    ) {
        const options = {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": apiKey,
                "X-RapidAPI-Host": apiHost,
            },
        };
        /*
stat data shape
      {
        "player": { "id": 236, "firstname": "Buddy", "lastname": "Hield"
        },
        "team": { "id": 30, "name": "Sacramento Kings", "nickname": "Kings", "code": "SAC", "logo": "https://upload.wikimedia.org/wikipedia/fr/thumb/9/95/Kings_de_Sacramento_logo.svg/1200px-Kings_de_Sacramento_logo.svg.png"
        },
        "game": { "id": 8137 },
        "points": 23,
        "pos": "SG",
        "min": "23:01",
        "fgm": 8,
        "fga": 17,
        "fgp": "47.1",
        "ftm": 2,
        "fta": 2,
        "ftp": "100",
        "tpm": 5,
        "tpa": 11,
        "tpp": "45.5",
        "offReb": 0,
        "defReb": 0,
        "totReb": 0,
        "assists": 1,
        "pFouls": 1,
        "steals": 1,
        "turnovers": 0,
        "blocks": 0,
        "plusMinus": "-14",
        "comment": null
      },
      */

        statResponse = fetch(
            `https://${apiHost}/players/statistics?season=${season}&id=${id}`,
            options
        )
            .then((response) => response.json()) // format to JSON
            .then((response) => response.response); // strip useless metadata
    }

    return await statResponse
        .then((response) => {
            setItem(storageKey, JSON.stringify(response));
            return response;
        })
        .catch((err) => console.error(err));
};

const getMappedPlayers = (teamName, players) => {
    const mappedPlayers = PlayerDataMap[teamName];

    const trackedPlayers = Object.keys(mappedPlayers).reduce(
        (a, playerName) => {
            /**
        * Original Team Player Data Shape (per game record)
        {
        "id": 3072,
        "firstname": "Justin",
        "lastname": "Jaworski",
        "birth": { "date": "1999-06-21", "country": null },
        "nba": { "start": 0, "pro": 0 },
        "height": { "feets": "6", "inches": "3", "meters": "1.9" },
        "weight": { "pounds": "196", "kilograms": "88.9" },
        "college": "Lafayette",
        "affiliation": null,
        "leagues": { "vegas": { "jersey": 33, "active": true, "pos": "G" }
        }
      }
        *  */
            const playerId = mappedPlayers[playerName].rapidid;

            const statPlayer = players.find((p) => p.id === playerId);

            if (statPlayer) {
                return [...a, statPlayer];
            }
            return a;
        },
        []
    );

    return trackedPlayers;
};

const getTeamNickFromGameList = (team, games) => {
    const firstGame = games[0];
    return "" + firstGame.rawData.teams.visitors.id === "" + team
        ? firstGame.rawData.teams.visitors.nickname
        : firstGame.rawData.teams.home.nickname;
};

export const getPlayerStatsByGamesPerTeamPerSeason = async (
    team,
    season,
    forceRefresh = false
) => {
    const games = await getGamesPerTeamPerSeason(team, season, forceRefresh);
    const players = await getPlayersPerTeamPerSeason(
        team,
        season,
        forceRefresh
    );
    const teamName = getTeamNickFromGameList(team, games);
    const trackedPlayers = getMappedPlayers(teamName, players);
    const playerStatsByGame = await Promise.all(
        trackedPlayers.map((player) => {
            return getStatsByPlayerPerSeason(player.id, season, forceRefresh);
        })
    );

    return playerStatsByGame;
};
