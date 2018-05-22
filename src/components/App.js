import React from "react";
import TicTacToe from "./TicTacToe";
import { BrowserRouter as Router, Route } from "react-router-dom";

export default function App() {
  const gameSchema = {
    computer: true,
    players: {
      x: "Computer",
      o: "Scott"
    }
  };

  return (
    <Router>
      <div>
        <Route
          path="/"
          render={props => <TicTacToe {...props} gameSchema={gameSchema} />}
        />
      </div>
    </Router>
  );
} // App
