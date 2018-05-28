import React from "react";
import { Link } from "react-router-dom";

const Home = props => (
  <div
    style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    <h1>Tic Tac Toe!</h1>
    <Link
      to={{
        pathname: "/names",
        state: { players: 1 }
      }}
    >
      One Player
    </Link>
    <Link
      to={{
        pathname: "/names",
        state: { players: 2 }
      }}
    >
      Two Player
    </Link>
  </div>
);

export default Home;
