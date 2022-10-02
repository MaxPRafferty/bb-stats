import logo from "./logo.svg";
import "./App.css";
import ColumnComparison from "./ColumnComparison";

function App(props) {
    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
            </header>
            <article>
                <ColumnComparison data={props.data}></ColumnComparison>
            </article>
        </div>
    );
}

export default App;
