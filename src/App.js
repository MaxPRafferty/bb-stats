import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import ColumnComparison from "./ColumnComparison";
import PlayerDataMap from "./playerMap";
import {
    getAllNBATeams,
    getGamesPerTeamPerSeason,
    getPlayerStatsByGamesPerTeamPerSeason,
} from "./client";

function App(props) {
    const [selectedTeam, setSelectedTeam] = useState("1");
    const [selectedSeason, setSelectedSeason] = useState("2022");
    const [games, setGames] = useState([]);
    const [players, setPlayers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [teamsLoading, setTeamsLoading] = useState(false);
    const [gamesLoading, setGamesLoading] = useState(false);
    const [playersLoading, setPlayersLoading] = useState(false);
    const handleTeamChange = (event) => {
        setSelectedTeam(event.target.value);
    };
    const handleSeasonChange = (event) => {
        setSelectedSeason(event.target.value);
    };
    useEffect(() => {
        if (selectedSeason && selectedTeam) {
            setGamesLoading(true);
            getGamesPerTeamPerSeason(selectedTeam, selectedSeason).then(
                (games) => {
                    setGames(games);
                    setGamesLoading(false);
                }
            );
            setPlayersLoading(true);
            getPlayerStatsByGamesPerTeamPerSeason(
                selectedTeam,
                selectedSeason
            ).then((stats) => {
                setPlayers(stats);
                setPlayersLoading(false);
            });
        }
    }, [selectedSeason, selectedTeam]);
    useEffect(() => {
        if (!teamsLoading && teams.length < 1) {
            setTeamsLoading(true);
            getAllNBATeams().then((teams) => {
                setTeams(teams);
                setTeamsLoading(false);
            });
        }
    }, []);
    console.log(
        `(app) rendering with ${games.length} games and ${players.length} players`
    );
    return (
        <div className="App">
            <article>
                <select value={selectedTeam} onChange={handleTeamChange}>
                    {Object.keys(PlayerDataMap).map((team) => {
                        return <option value={team}>{team}</option>;
                    })}
                </select>
                <select value={selectedSeason} onChange={handleSeasonChange}>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                </select>
                <ColumnComparison
                    teams={teams}
                    players={players}
                    games={games}
                    loading={gamesLoading && playersLoading}
                    team={selectedTeam}
                    season={selectedSeason}
                ></ColumnComparison>
            </article>
        </div>
    );
}

export default App;
