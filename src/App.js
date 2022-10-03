import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import ColumnComparison from "./ColumnComparison";
import PlayerDataMap from "./playerMap";

function App(props) {
    const [selectedTeam, setSelectedTeam] = useState("Boston");
    const handleTeamChange = (event) => {
        setSelectedTeam(event.target.value);
    };
    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
            </header>
            <article>
                <select value={selectedTeam} onChange={handleTeamChange}>
                    {Object.keys(PlayerDataMap).map((team) => {
                        return <option value={team}>{team}</option>;
                    })}
                </select>
                <ColumnComparison
                    data={props.data}
                    team={selectedTeam}
                ></ColumnComparison>
            </article>
        </div>
    );
}

export default App;
