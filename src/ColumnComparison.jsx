import { useState } from "react";
import { TRACKED_STATS, FORMAT_THRESHOLDS } from "./constants";
import PlayerDataMap from "./playerMap";


const numTrackedStats = Object.keys(TRACKED_STATS).length;

let gameParticipation = {};

const getPlayerList = (team) => {
    return Object.keys(PlayerDataMap[team]);
}

const getStatThresholdColor = (value, stat, playerConfig) => {
    if (stat == TRACKED_STATS["       "]) {
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
            if (game == null || game[stat] == null)
            {
                debugger;
            }
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

const ColumnComparison = ({ data, team }) => {
    const [numPlayers, setNumPlayers] = useState(0);
    const allPlayers = getPlayerList(team);

    let playersLoaded = allPlayers.reduce((a, v) => {
        return a && !!data[v];
    }, true)

    if(!playersLoaded) {
        return <div>loading...</div>
    }

    if (allPlayers.length !== numPlayers || allPlayers[0] !== Object.keys(PlayerDataMap[team])[0]) {
        gameParticipation = {};
        getGameDates(data, allPlayers);
        setNumPlayers(allPlayers.length)
    }
    let numSuccess = getNumSuccessfulGames(data, team, allPlayers);
    let numTotal = getNumTotalGames();

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
                            {allPlayers.map(player => <td colSpan={numTrackedStats}>{player}</td>)}
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            {allPlayers.map(() => Object.keys(TRACKED_STATS).map(stat => <td>{stat}</td>))}
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(gameParticipation).sort().reverse().map(gameConfig => <tr>{getTableRowFromGame(data, gameConfig, team, allPlayers)}</tr>)}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ColumnComparison;