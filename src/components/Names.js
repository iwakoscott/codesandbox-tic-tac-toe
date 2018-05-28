import React from "react";
import { Redirect, Link } from "react-router-dom";
import serializeForm from "form-serialize";
import { stringify } from "query-string";

function disableButton({ nPlayers, ...players }) {
  const playerOneCheck =
    players["playerOneName"].length > 0 &&
    players["playerOneName"].toLowerCase() !== "computer";
  if (nPlayers === 1) {
    return !playerOneCheck;
  } else {
    const playerTwoCheck =
      players["playerTwoName"].length > 0 &&
      players["playerTwoName"].toLowerCase() !== "computer";
    return !playerOneCheck || !playerTwoCheck;
  }
}

export default class Names extends React.Component {
  state = {
    playerOneName: "",
    playerTwoName: "",
    x: "",
    o: "",
    swapped: false
  }; // state

  handleSubmit = e => {
    e.preventDefault();
    const { playerOneName, playerTwoName } = serializeForm(e.target, {
      hash: true
    });
    const searchParam = {
      x: this.state.x === playerOneName ? playerOneName : playerTwoName,
      o: this.state.o === playerOneName ? playerOneName : playerTwoName
    };

    this.props.history.push(`/tic-tac-toe?${stringify(searchParam)}`, {
      computer: this.props.location.state.players === 1
    });
  };

  handleSwap = () =>
    this.setState(({ x, o, swapped }) => ({
      x: o,
      o: x,
      swapped: !swapped
    }));

  handleOnChange = (e, gamePiece) => {
    let { value } = e.target;
    // if there is a space save the index of space
    const space = value.indexOf(" ");
    if (space > -1) {
      // remove the space
      value = value.slice(0, space);
    }
    this.setState({
      [e.target.name]: value,
      [gamePiece]: value
    });
  };

  componentDidMount() {
    const playerTwoName = this.props.location.state
      ? this.props.location.state.players === 1 ? "Computer" : ""
      : "";
    this.setState({
      playerTwoName,
      o: playerTwoName
    });
  }

  render() {
    if (!this.props.location.state) {
      return <Redirect to="/" />;
    }

    const { players } = this.props.location.state;

    return (
      <div>
        <Link to="/">
          <i className="fas fa-hand-point-left fa-2x" />
        </Link>
        <div
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <h1>'X' {this.state.x}</h1>
          <form onSubmit={this.handleSubmit} name="names">
            <input
              placeholder={players === 1 ? "Your name" : "Player One"}
              name="playerOneName"
              type="text"
              onChange={e =>
                this.handleOnChange(e, this.state.swapped ? "o" : "x")
              }
              value={this.state.playerOneName}
            />
            <input
              readOnly={players === 1}
              placeholder="Player Two"
              name="playerTwoName"
              type="text"
              onChange={e =>
                this.handleOnChange(e, this.state.swapped ? "x" : "o")
              }
              value={this.state.playerTwoName}
            />
            <button
              disabled={disableButton({
                nPlayers: players,
                playerOneName: this.state.playerOneName,
                playerTwoName: this.state.playerTwoName
              })}
              type="submit"
            >
              <i className="fas fa-hand-point-right" />
            </button>
          </form>
          <button style={{ margin: "25px" }} onClick={this.handleSwap}>
            <i className="fas fa-sync-alt fa-3x" />
          </button>
          {<h1>'O' {this.state.o}</h1>}
        </div>
      </div>
    );
  } // render
} // Names
