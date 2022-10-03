import { useState } from "react";
import { TRACKED_STATS, FORMAT_THRESHOLDS } from "./constants";
import PlayerDataMap from "./playerMap";


const numTrackedStats = Object.keys(TRACKED_STATS).length;

let allPlayers = [];
let gameParticipation = {};

const getPlayerList = (data) => {
    return Object.keys(data);
}

const getStatThreshold = (value, stat, playerConfig) => {
    let limit = FORMAT_THRESHOLDS[stat][0];
    if (playerConfig != null && playerConfig.defaultStats != null) {
        if (playerConfig.defaultStats[stat] === undefined) {
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

const getNumSuccessfulGames = (data) => {
    let numSucc = 0;
    let successes = Object.keys(gameParticipation).map((gameDateID) => {
       return checkRowSuccess(data, gameDateID);
    })
    return successes.filter((didSucceed) => didSucceed).length
}

const getGameDates = (data) => {
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

const getCellsForPlayer = (data, player, gameId) => {
    const game = data[player].data[gameId];
    const playerConfig = PlayerDataMap[player];
    return <>
        {Object.keys(TRACKED_STATS).map(statKey => {
            const stat = TRACKED_STATS[statKey];
            let value = game[stat];
            if (stat === TRACKED_STATS["3PM"]) {
                value = value.split("/")[0];
            }
            return <td style={{ backgroundColor: getStatThreshold(value, stat, playerConfig) }}>{value}</td>
        })}
    </>
}

const checkRowSuccess = (data, gameDateID) => {
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
            return getStatThreshold(value, stat, PlayerDataMap[player]);
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

const getTableRowFromGame = (data, gameDateID) => {
    const gamesPlayed = gameParticipation[gameDateID];

    return <>
        <td>{gameDateID}</td>
        {allPlayers.map(player => {
            const didPlay = gamesPlayed.players.includes(player);
            if (didPlay) {
                return getCellsForPlayer(data, player, gamesPlayed.gameIds[player]);
            }
            return <td colSpan={numTrackedStats}>dnp</td>
        })}
        <td style={{ backgroundColor: getSummaryColor(checkRowSuccess(data, gameDateID)) }}>Success</td>
    </>
}

const ColumnComparison = ({ data }) => {
    const [numPlayers, setNumPlayers] = useState(0);
    allPlayers = getPlayerList(data);
    if (allPlayers.length !== numPlayers) {
        getGameDates(data);
        setNumPlayers(allPlayers.length)
    }
    let numSuccess = getNumSuccessfulGames(data);
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
                        {Object.keys(gameParticipation).map(gameConfig => <tr>{getTableRowFromGame(data, gameConfig)}</tr>)}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ColumnComparison;