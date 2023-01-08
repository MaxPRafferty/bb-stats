import { useState, useEffect } from "react";
import { TRACKED_STATS, FORMAT_THRESHOLDS } from "./constants";
import PlayerDataMap from "./playerMap";


const numTrackedStats = Object.keys(TRACKED_STATS).length;

let gameParticipation = {};

const getPlayerList = (team, teams) => {
    //return Object.keys(PlayerDataMap[team]);
    if(!team || !teams || teams.length === 0) {
        return [];
    }
    const teamData = teams.find(t => `${t.id}` === `${team}`);
    return PlayerDataMap[teamData.nickname];
}

const getStatThresholdColor = (value, stat, playerConfig) => {
    if (stat == TRACKED_STATS["         "]) {
        return 'white';
    }
    let limit = FORMAT_THRESHOLDS[stat][0];
    if (playerConfig != null && playerConfig.defaultStats != null) {
        if (playerConfig.defaultStats[stat] === undefined || playerConfig.defaultStats[stat] == -1) {
            return 'black'
        }
        if (playerConfig.defaultStats[stat] !== null) {
            limit = playerConfig.defaultStats[stat];
        }
    }
    const colors = ['green', 'yellow', 'orange', 'red']
    if (value >= limit) {
        return colors[0];
    }
    return colors[colors.length - 1];
}

const getSummaryColor = (success) => {
    if (success)
        return 'green';
    return 'red';
}

const getNumTotalGames = () => {
    return Object.keys(gameParticipation).length;
}

const getNumSuccessfulGames = (data, team, allPlayers) => {
    let numSucc = 0;
    let successes = Object.keys(gameParticipation).map((gameDateID) => {
       return checkRowSuccess(data, gameDateID, team, allPlayers);
    })
    return successes.filter((didSucceed) => didSucceed).length
}

const getGameDates = (data, allPlayers) => {
    allPlayers.forEach((player => {
        data[player].order.forEach((gameId => {
            const game = data[player].data[gameId];
            const gameDateRaw = new Date(game.Date);
            const gameDate = (gameDateRaw).toISOString();
            if (gameParticipation[gameDate] == null) {
                gameParticipation[gameDate] = { players: [], gameIds: {} }
            }
            gameParticipation[gameDate].players.push(player);
            gameParticipation[gameDate].gameIds[player] = gameId;
        }))
    }))
}

const getGameDatesFromAPI = (players, games) => {
    players.forEach((playerGames => {
        playerGames.forEach((playerGame) => {
            const playerId = playerGame.player.id;
            const gameId = playerGame.game.id;
            const fullGameData = games.find(game => game.id === gameId);
            if(fullGameData) {
                const gameDate = fullGameData.dateId;
                if (gameParticipation[gameDate] == null) {
                    gameParticipation[gameDate] = { players: [], gameIds: {}, ...fullGameData }
                }
                gameParticipation[gameDate].players.push(playerId);
                gameParticipation[gameDate].gameIds[playerId] = gameId;
            }

        });
    }))

}

const getCellsForPlayer = (data, player, gameId, team) => {
    const game = data[player].data[gameId];
    const playerConfig = PlayerDataMap[team][player];
    return <>
        {Object.keys(TRACKED_STATS).map(statKey => {
            const stat = TRACKED_STATS[statKey];
            let value = game[stat];
            if (stat === TRACKED_STATS["3PM"]) {
                value = value.split("/")[0];
            }
            let bgColor = getStatThresholdColor(value, stat, playerConfig);
            if (bgColor == 'black') {
                return <td style={{ backgroundColor: bgColor, color: 'gray' }}>{value}</td>
            } else {
                return <td style={{ backgroundColor: bgColor, color: 'white' }}>{value}</td>
            }
        })}
    </>
}

const getCellsForPlayerFromAPI = (playerGames, games, playerId, gameId, team) => {
    const gameInfo = games.find(game => game.id === gameId);
    const gameStatDataForPlayer = playerGames.find(game => game.game.id === gameId);
    let teamName
    if(team === "1") {
        teamName = 'Hawks'
    }
    const teamData = PlayerDataMap[teamName];
    const playerName = Object.keys(teamData).find(playerName => teamData[playerName].rapidid === playerId);
    const playerConfig = teamData[playerName];
    /* player data shape
    assists : 13
    blocks : 1
    comment : null
    defReb : 3
    fga : 22
    fgm : 7
    fgp : "31.8"
    fta : 8
    ftm : 8
    ftp : "100.0"
    game : {id: 11054}
    min : "38"
    offReb : 0
    pFouls : 1
    player : {id: 1046, firstname: 'Trae', lastname: 'Young'}
    plusMinus : "+16"
    points : 23
    pos : "PG"
    steals : 1
    team : {id: 1, name: 'Atlanta Hawks', nickname: 'Hawks', code: 'ATL', logo: 'https://upload.wikimedia.org/wikipedia/fr/e/ee/Hawks_2016.png'}
    totReb : 3
    tpa : 9
    tpm : 1
    tpp : "11.1"
    turnovers : 3
    */

    return <>
        {Object.keys(TRACKED_STATS).map(statKey => {
            const stat = TRACKED_STATS[statKey];
            let value = gameStatDataForPlayer[stat];
            let bgColor = getStatThresholdColor(value, stat, playerConfig);
            if (bgColor == 'black') {
                return <td style={{ backgroundColor: bgColor, color: 'gray' }}>{value}</td>
            } else {
                return <td style={{ backgroundColor: bgColor, color: 'white' }}>{value}</td>
            }

        })}
    </>
}

const checkRowSuccess = (data, gameDateID, team, allPlayers) => {
    if(allPlayers == null || allPlayers.length === 0) {
        return false;
    }
    const gamesPlayed = gameParticipation[gameDateID];
    let playersGameColors = allPlayers.map(player => {
        const game = data[player].data[gamesPlayed.gameIds[player]];
        if (!gamesPlayed.players.includes(player))
        {
            return [];
        }
        return Object.keys(TRACKED_STATS).map(statKey => {
            const stat = TRACKED_STATS[statKey];
            let value = game[stat];
            if (stat === TRACKED_STATS["3PM"]) {
                value = value.split("/")[0];
            }
            return getStatThresholdColor(value, stat, PlayerDataMap[team][player]);
        })
    })
    let anyFailed = false;
    playersGameColors.forEach((playerArray) => {
        playerArray.forEach((statColor) => {
            if (statColor == "red")
                anyFailed = true;
        })
    })
    return !anyFailed;
}

const checkRowSuccessFromAPI = (players) => {
    //debugger;
}

const getTableRowFromGame = (data, gameDateID, team, allPlayers) => {
    const gamesPlayed = gameParticipation[gameDateID];

    return <>
        <td>{gameDateID}</td>
        {allPlayers.map(player => {
            const didPlay = gamesPlayed.players.includes(player);
            if (didPlay) {
                return getCellsForPlayer(data, player, gamesPlayed.gameIds[player], team);
            }
            return <td colSpan={numTrackedStats}>dnp</td>
        })}
        <td style={{ color: 'white', backgroundColor: getSummaryColor(checkRowSuccess(data, gameDateID, team, allPlayers)) }}>Success</td>
    </>
}
const getTableRowFromAPIGame = (gameConfigs, gameDateId, team, season, players, games) => {
    const gamesPlayed = gameConfigs[gameDateId];
    console.log(gameDateId);
    const home = gamesPlayed.location === "home"

    return <>
        <td>
            <div style={{display:"inline-block", width:135, textAlign:"left"}}>{gamesPlayed.date}</div>
            <div style={{display:"inline-block", width:25}}>{ gamesPlayed.tod === "day" ? "☀️" : "🌙" }</div>
            <div style={{display:"inline-block", width:25}}>{ home ? 'vs.' : '@'}</div>
            <div style={{display:"inline-block", width:25}}><img src={gamesPlayed.opponentLogo} height="20" width="20" /></div>
        </td>
        {players.map(playerGames => {
            const playerId = playerGames[0].player.id;
            const didPlay = gamesPlayed.players.includes(playerId);
            if (didPlay) {
                // currentSelectionplayer, games, gameId, team
                return getCellsForPlayerFromAPI(playerGames, games, playerId, gamesPlayed.gameIds[playerId], team);
            }
            return <td colSpan={numTrackedStats}>dnp</td>
        })}
        <td style={{ color: 'white', backgroundColor: getSummaryColor(checkRowSuccessFromAPI(gameDateId, team, players)) }}>Success</td>
    </>
}

const ColumnComparison = ({ teams, players, games, loading, team, season }) => {
    const allPlayers = getPlayerList(team, teams);
    const allPlayersNames = Object.keys(allPlayers);
    const [currentSelection, setCurrentSelection] = useState('')
    const [localGameParticipation, setLocalGameParticipation] = useState('')

    useEffect(() => {
        if(`${team}${season}` !== currentSelection && !loading && games.length && players.length) {
            gameParticipation = {};
            getGameDatesFromAPI(players, games);
            setLocalGameParticipation(gameParticipation);
            setCurrentSelection(`${team}${season}`);
        }
    });

    if(loading) {
        return <div>loading...</div>
    }

    /*
    if (allPlayersNames.length !== numPlayers || allPlayersNames[0] !== Object.keys(PlayerDataMap[team])[0]) {
        gameParticipation = {};
        getGameDates(data, allPlayersNames);
        setNumPlayers(allPlayersNames.length)
    }
    let numSuccess = getNumSuccessfulGames(data, team, allPlayersNames);
    let numTotal = getNumTotalGames();
    */
   let numSuccess = 1;
   let numTotal = games.length;

    return (
        <>
            <div>Comparison Chart</div>
                <div>
                    Success Rate: {numSuccess}/{numTotal} ({Math.trunc((numSuccess/numTotal)*100)}%)
                </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <td></td>
                            {allPlayersNames.map(player => <td colSpan={numTrackedStats}> 
                                <a href={ "https://www.nba.com/stats/player/"+allPlayers[player].nbaid+"/boxscores-traditional" } >
                                    { player } 
                                </a>
                                <span title={allPlayers[player].notes}>{ allPlayers[player].notes && allPlayers[player].notes.length > 0 ? " 📝" : "" }</span>
                            </td>)}
                            <td></td>
                        </tr>
                        
                        <tr>
                            <td></td>
                            {allPlayersNames.map(() => Object.keys(TRACKED_STATS).map(stat => <td>
                                    
                                    {stat /* turn this into a pulldown, show % per stat */ }   
                                
                                </td>)
                            )}
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(localGameParticipation).sort().reverse().map(gameConfigKey => <tr>{getTableRowFromAPIGame(localGameParticipation, gameConfigKey, team, season, players, games)}</tr>)}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ColumnComparison;