import { useState } from "react";
import { TRACKED_STATS, FORMAT_THRESHOLDS } from "./constants";
import PlayerDataMap from "./playerMap";


const numTrackedStats = Object.keys(TRACKED_STATS).length;

let players = [];
let gameParticipation = {};

const getPlayerList = (data) => {
    return Object.keys(data);
}

const getStatThreshold = (value, stat, playerConfig) => {
    let limit = FORMAT_THRESHOLDS[stat][0];
    if(playerConfig != null && playerConfig.validTrackedStats != null) {
        if(playerConfig.validTrackedStats[stat] === undefined) {
            return 'black'
        }
        if(playerConfig.validTrackedStats[stat] !== null) {
            limit = playerConfig.validTrackedStats[stat];
        }
    }
    const colors = ['green', 'yellow', 'orange', 'red']
    if(value >= limit) {
        return colors[0];
    }
    return colors[colors.length - 1];
}

const getGameDates = (data) => {
    players.forEach((player => {
        data[player].order.forEach((gameId => {
            const game = data[player].data[gameId];
            const gameDateRaw = new Date(game.Date);
            const gameDate = (gameDateRaw).toISOString();
            if(gameParticipation[gameDate] == null) {
                gameParticipation[gameDate] = {players: [], gameIds: {}}
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
            if(stat === TRACKED_STATS["three-point-makes"]) {
                value = value.split("/")[0];
            }
            return <td style={{backgroundColor: getStatThreshold(value, stat, playerConfig)}}>{value}</td>
        })}
    </>
}

const getTableRowFromGame = (data, gameConfigKey) => {
    const gameConfig = gameParticipation[gameConfigKey];
    return <>
    <td>{gameConfigKey}</td>
    {players.map(player => {
        const didPlay = gameConfig.players.includes(player);
        if(didPlay) {
            return getCellsForPlayer(data, player, gameConfig.gameIds[player]);
        }
        return <td colSpan={numTrackedStats}>dnp</td>
    })}
</>
}

const ColumnComparison = ({data}) => {
    const [numPlayers, setNumPlayers] = useState(0);
    players = getPlayerList(data);
    if(players.length !== numPlayers) {
        getGameDates(data);
        setNumPlayers(players.length)
    }

    return (
        <>
            <div>Comparison Chart</div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <td></td>
                            {players.map(player => <td colSpan={numTrackedStats}>{player}</td>)}
                        </tr>
                        <tr>
                            <td></td>
                            {players.map(() => Object.keys(TRACKED_STATS).map(stat => <td>{stat}</td>))}
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