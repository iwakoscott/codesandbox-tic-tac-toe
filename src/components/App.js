import React from "react";
import TicTacToe from "./TicTacToe";
import Home from "./Home";
import Names from "./Names";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";
import { parse } from "query-string";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/names" component={Names} />
        <Route
          path="/tic-tac-toe:config?"
          render={props => {
            if (!props.location.state) return <Redirect to="/" />;
            return (
              <div>
                <Link to="/">
                  <i className="fas fa-hand-point-left fa-2x" />
                </Link>
                <TicTacToe
                  {...props}
                  computer={props.location.state.computer}
                  players={parse(props.location.search)}
                >
                  {({
                    squares,
                    handleClick,
                    handleComputersMove,
                    players,
                    gamePiece,
                    winner,
                    moves,
                    openMenu,
                    movesLeft,
                    resetGame
                  }) => {
                    return (
                      <div
                        style={{
                          height: "100vh",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        <TicTacToe.Header
                          gamePiece={gamePiece}
                          players={players}
                          winner={winner}
                          movesLeft={movesLeft}
                        />
                        <TicTacToe.Board
                          winner={winner}
                          moves={moves}
                          squares={squares}
                          handleClick={handleClick}
                          computersTurn={
                            players[gamePiece].toLowerCase() === "computer"
                          }
                        />
                        <TicTacToe.Footer players={players} />
                        <TicTacToe.Modal
                          openMenu={openMenu}
                          players={players}
                          winner={winner}
                          movesLeft={movesLeft}
                          resetGame={resetGame}
                          history={props.history}
                        />
                      </div>
                    );
                  }}
                </TicTacToe>
              </div>
            );
          }}
        />
      </Switch>
    </Router>
  );
} // App
