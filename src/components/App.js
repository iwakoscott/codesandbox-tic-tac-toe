import React from "react";
import TicTacToe from "./TicTacToe";
import { BrowserRouter as Router, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <Route path="/" component={TicTacToe}/>
      </div>
    </Router>
  );
}
