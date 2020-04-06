import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";

import Game from "./Game/index.js";
import Home from "./Home/index.js";

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/game">game</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/game">
            <Game />
          </Route>
          <Route path="/home">
          <Home />
        </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
