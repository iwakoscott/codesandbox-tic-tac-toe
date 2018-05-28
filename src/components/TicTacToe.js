import React from "react";
import Board from "./Board";
import PropTypes from "prop-types";
import Modal from "react-modal";

Modal.setAppElement("#root");

const initialState = {
  squares: [],
  gamePiece: "x",
  winner: null,
  moves: [],
  openMenu: false
};

class TicTacToe extends React.Component {
  static propTypes = {
    computer: PropTypes.bool,
    players: PropTypes.object.isRequired
  };

  static defaultProps = {
    computer: false
  };

  static Header = ({ players, gamePiece, winner, movesLeft }) => (
    <div>
      <h2>
        {winner || movesLeft === 0
          ? "Game over!"
          : `${players[gamePiece]}'s turn!`}
      </h2>
    </div>
  );
  static Board = ({ squares, handleClick, computersTurn, winner, moves }) => (
    <Board
      squares={squares}
      handleClick={handleClick}
      winner={winner}
      moves={moves}
      rows={3}
      cols={3}
      computersTurn={computersTurn}
    />
  );

  static Footer = ({ players }) => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        width: "300px",
        padding: "25px"
      }}
    >
      <div>{`${players["x"]}: X`}</div>
      <div>{`${players["o"]}: O`}</div>
    </div>
  );

  static Modal = ({
    openMenu,
    players,
    winner,
    movesLeft,
    resetGame,
    history
  }) => (
    <Modal
      style={{
        content: {
          opacity: 0.85,
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)"
        }
      }}
      isOpen={openMenu}
    >
      <h1 style={{ textAlign: "center" }}>
        {winner !== null ? `${players[winner]} wins!` : "A Tie!"}
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center"
        }}
      >
        <button onClick={resetGame}>Play again!</button>
        <button onClick={() => history.push("/")}>Back to Menu</button>
      </div>
    </Modal>
  );

  state = initialState;

  resetGame = () => this.setState(initialState, () => this.renderBoard());

  checkForWinner(squares, callback) {
    let winner = null;
    // all possible winning paths
    const winPaths = {
      A: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }],
      B: [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }],
      C: [{ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }],
      D: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }],
      E: [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
      F: [{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }],
      G: [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }],
      H: [{ x: 2, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 2 }]
    };

    const winningMoves = Object.entries(winPaths).find(([path, moves]) => {
      // for each possible winning path check the board to see if 'x' or 'o' won
      const scopedSquares = moves.map(coord =>
        squares.find(square => square.x === coord.x && square.y === coord.y)
      );

      const xWon = scopedSquares.every(square => square.value === "x");
      const oWon = scopedSquares.every(square => square.value === "o");

      winner = xWon || oWon ? (xWon ? "x" : "o") : null;
      return xWon || oWon;
    });
    if (winner !== null) {
      this.setState({
        winner,
        moves: winningMoves,
        openMenu: true
      });
    } else if (winner === null && this.getMovesLeft() === 0) {
      this.setState({
        openMenu: true
      });
    } else {
      callback();
    }
  }

  updateBoard = (squares, callback) => {
    this.setState(
      ({ gamePiece }) => ({
        gamePiece: gamePiece === "x" ? "o" : "x",
        squares
      }),
      callback
    );
  };

  renderBoard = () => {
    // Build squares for board
    const rows = 3;
    const cols = 3;

    // gets dimension of the board
    const n = rows * cols;

    // imperatively build the board using objects with properties
    // x, y, and value
    let y = -1;
    const squares = Array.from(Array(n)).map((base, index) => {
      y = index % rows === 0 ? y + 1 : y;
      return {
        x: index % rows,
        y,
        value: "",
        color: null
      };
    });

    this.setState({ squares }, () => {
      if (
        this.props.computer &&
        this.props.players["x"].toLowerCase() === "computer"
      ) {
        this.handleComputersMove();
      }
    });
  };

  componentDidMount() {
    this.renderBoard();
  } // componentDidMount

  handleComputersMove = () => {
    if (this.props.computer) {
      // get all empty squares
      const emptySquares = this.state.squares.filter(
        square => square.value === ""
      );
      if (emptySquares.length === 0) return;
      // choose one of those at random
      const randomEmptySquare =
        emptySquares[Math.floor(Math.random() * emptySquares.length)];
      // map over remaining squares, find the randomly selected one, and update its value
      const squares = this.state.squares.map(
        square =>
          square.x === randomEmptySquare.x && square.y === randomEmptySquare.y
            ? {
                ...square,
                value: this.state.gamePiece
              }
            : square
      );
      setTimeout(
        () =>
          this.updateBoard(squares, () =>
            this.checkForWinner(this.state.squares, () => {})
          ),
        800
      );
    }
  };

  handleClick = ({ x, y }) => {
    const squares = this.state.squares.map(
      square =>
        square.x === x && square.y === y
          ? {
              ...square,
              value: this.state.gamePiece
            }
          : square
    );
    this.updateBoard(squares, () => {
      this.checkForWinner(this.state.squares, () => this.handleComputersMove());
    });
  };

  getMovesLeft() {
    return this.state.squares.filter(square => square.value === "").length;
  } // getMovesLeft

  getStateAndHelpers() {
    return this.props.computer
      ? {
          handleClick: this.handleClick,
          handleComputersMove: this.handleComputersMove,
          rows: this.props.rows,
          cols: this.props.cols,
          squares: this.state.squares,
          gamePiece: this.state.gamePiece,
          players: this.props.players,
          winner: this.state.winner,
          moves: this.state.moves,
          openMenu: this.state.openMenu,
          movesLeft: this.getMovesLeft(),
          resetGame: this.resetGame
        }
      : {
          handleClick: this.handleClick,
          rows: this.props.rows,
          cols: this.props.cols,
          squares: this.state.squares,
          gamePiece: this.state.gamePiece,
          players: this.props.players,
          winner: this.state.winner,
          moves: this.state.moves,
          openMenu: this.state.openMenu,
          movesLeft: this.getMovesLeft(),
          resetGame: this.resetGame
        };
  } // getStateAndHelpers

  render() {
    return this.props.children(this.getStateAndHelpers());
  } // render
} // TicTacToe

export default TicTacToe;
