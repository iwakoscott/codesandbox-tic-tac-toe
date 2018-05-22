import React from "react";
import Board from "./Board";
import PropTypes from "prop-types";

class TicTacToe extends React.Component {
  static propTypes = {
    gameSchema: PropTypes.object.isRequired
  };

  static Header = ({ gamePiece, gameSchema }) => {
    const { players } = gameSchema;
    return (
      <div>
        <h2>{`${players[gamePiece]}'s`} turn!</h2>
      </div>
    );
  };

  static Footer = ({ gameSchema }) => {
    const { players } = gameSchema;
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "300px"
        }}
      >
        <h3>
          {players["x"]}: {`'X'`}
        </h3>
        <h3>
          {players["o"]}: {`'O'`}
        </h3>
      </div>
    );
  };

  state = {
    gamePiece: "x"
  };

  updateTurn = () =>
    this.setState(({ gamePiece }) => ({
      gamePiece: gamePiece === "x" ? "o" : "x"
    }));

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <TicTacToe.Header
          gamePiece={this.state.gamePiece}
          gameSchema={this.props.gameSchema}
        />
        <Board
          rows={3}
          cols={3}
          gamePiece={this.state.gamePiece}
          updateTurn={this.updateTurn}
        >
          {({ squares, handleClick, rows, cols }) => (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${cols}, 100px)`,
                gridTemplateRows: `repeat(${rows}, 100px)`
              }}
            >
              {squares.map((square, index) => (
                <button
                  disabled={square.value !== ""}
                  key={index}
                  onClick={() => handleClick(square)}
                >
                  <h1>{square.value.toUpperCase()}</h1>
                </button>
              ))}
            </div>
          )}
        </Board>
        <TicTacToe.Footer gameSchema={this.props.gameSchema} />
      </div>
    );
  } // render
} // TicTacToe

export default TicTacToe;
