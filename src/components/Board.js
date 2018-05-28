import React from "react";
import PropTypes from "prop-types";

export default function Board({
  squares,
  handleClick,
  moves,
  winner,
  rows,
  cols,
  computersTurn
}) {
  const [path, winningMoves ] = moves;
  const updatedSquares = winner
    ? squares.map(
        square =>
          winningMoves.find(({ x, y }) => square.x === x && square.y === y)
            ? {
                ...square,
                color: "#ffa801"
              }
            : square
      )
    : squares;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 100px)`,
        gridTemplateRows: `repeat(${rows}, 100px)`
      }}
    >
      {updatedSquares.map((square, index) => (
        // using index as key is fine here since it is unique
        <button
          style={{ backgroundColor: square.color }}
          key={index}
          disabled={square.value !== "" || computersTurn || winner !== null}
          onClick={() => handleClick(square)}
        >
          <h1 style={{ color: square.color !== null ? "white" : null }}>
            {square.value.toUpperCase()}
          </h1>
        </button>
      ))}
    </div>
  );
}

Board.propTypes = {
  squares: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
  rows: PropTypes.number.isRequired,
  cols: PropTypes.number.isRequired,
  computersMove: PropTypes.bool,
  // winner can be null or a character
  winner: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  moves: PropTypes.array.isRequired
};
