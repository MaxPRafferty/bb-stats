const TRACKED_STATS = {
    points: "PTS",
    assists: "AST",
    rebounds: "REB",
    "three-point-makes": "3PM/A",
}

const numTrackedStats = Object.keys(TRACKED_STATS).length;

let players = [];
let gameParticipation = {};

const getPlayerList = (data) => {
    return Object.keys(data);
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
    if(game == null || game[TRACKED_STATS.points] == null) {
        debugger;
    }
    return <>
        <td>{game[TRACKED_STATS.points]}</td>
        <td>{game[TRACKED_STATS.assists]}</td>
        <td>{game[TRACKED_STATS.rebounds]}</td>
        <td>{game[TRACKED_STATS["three-point-makes"]].split('/')[0]}</td>
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
    players = getPlayerList(data);
    if(Object.keys(gameParticipation).length === 0) {
        getGameDates(data);
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