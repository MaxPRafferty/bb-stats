import { useState, useEffect } from "react";
import "./App.css";
import ColumnComparison from "./ColumnComparison";
import {
    getAllNBATeams,
    getGamesPerTeamPerSeason,
    getPlayerStatsByGamesPerTeamPerSeason,
} from "./client";

function App(props) {
    const [shouldUpdate, setShouldUpdate] = useState(1);
    const [shouldRefetch, setShouldRefetch] = useState(1);
    const [selectedTeam, setSelectedTeamState] = useState(
        window.localStorage.getItem("selectedTeam") || "1"
    );
    const setSelectedTeam = (team) => {
        window.localStorage.setItem("selectedTeam", team);
        setSelectedTeamState(team);
    };
    const [selectedSeason, setSelectedSeasonState] = useState(
        window.localStorage.getItem("selectedSeason") || "2022"
    );
    const setSelectedSeason = (season) => {
        window.localStorage.setItem("selectedSeason", season);
        setSelectedSeasonState(season);
    };
    const [games, setGames] = useState([]);
    const [players, setPlayers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [teamsLoading, setTeamsLoading] = useState(false);
    const [gamesLoading, setGamesLoading] = useState(false);
    const [playersLoading, setPlayersLoading] = useState(false);
    const handleTeamChange = (event) => {
        setSelectedTeam(event.target.value);
        setShouldUpdate(shouldUpdate + 1);
        setShouldRefetch(shouldRefetch + 1);
        setGames([]);
        setPlayers([]);
    };
    const handleSeasonChange = (event) => {
        setSelectedSeason(event.target.value);
        setShouldUpdate(shouldUpdate + 1);
        setShouldRefetch(shouldRefetch + 1);
        setGames([]);
        setPlayers([]);
    };
    useEffect(() => {
        if (selectedSeason && selectedTeam) {
            setGamesLoading(true);
            getGamesPerTeamPerSeason(selectedTeam, selectedSeason).then(
                (games) => {
                    setGames(games);
                    setGamesLoading(false);
                    setShouldUpdate(shouldUpdate + 1);
                }
            );
            setPlayersLoading(true);

            getPlayerStatsByGamesPerTeamPerSeason(
                selectedTeam,
                selectedSeason
            ).then((stats) => {
                setPlayers(stats);
                setPlayersLoading(false);
                setShouldUpdate(shouldUpdate + 1);
            });
        }
    }, [selectedSeason, selectedTeam, shouldRefetch]);

    useEffect(() => {
        if (!teamsLoading && teams.length < 1) {
            setTeamsLoading(true);
            getAllNBATeams().then((teams) => {
                setTeams(teams);
                setTeamsLoading(false);
                setShouldUpdate(shouldUpdate + 1);
            });
        }
    }, [teamsLoading]);

    return (
        <div className="App">
            <article>
                <select value={selectedTeam} onChange={handleTeamChange}>
                    {teams.map((team) => {
                        return (
                            <option
                                key={team.id + team.nickname}
                                value={team.id}
                            >
                                {team.city + " " + team.nickname}
                            </option>
                        );
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
                    update={shouldUpdate}
                ></ColumnComparison>
            </article>
        </div>
    );
}

export default App;
