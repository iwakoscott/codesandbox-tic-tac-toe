import React from "react";
import PropTypes from "prop-types";

class Board extends React.Component {
  static propTypes = {
    rows: PropTypes.number.isRequired,
    cols: PropTypes.number.isRequired,
    gamePiece: PropTypes.string.isRequired,
    updateTurn: PropTypes.func.isRequired
  };

  state = {
    squares: []
  };

  handleClick = ({ x, y }) => {
    const squares = this.state.squares.map(
      square =>
        square.x === x && square.y === y
          ? { ...square, value: this.props.gamePiece }
          : square
    );

    this.setState({ squares }, () => this.props.updateTurn());
  };

  componentDidMount() {
    // Build squares for board
    const { rows, cols } = this.props;

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
        value: ""
      };
    });

    this.setState({ squares });
  } // componentDidMount

  render() {
    return this.props.children({
      squares: this.state.squares,
      handleClick: this.handleClick,
      rows: this.props.rows,
      cols: this.props.cols
    });
  } // render
} // Board

export default Board;
