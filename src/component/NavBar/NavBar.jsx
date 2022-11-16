import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <div id="nav">
      {/* <Link to="/">Home </Link>
      <Link to="/favorites">Favorites</Link> */}

      <Link to={"/"}>
        <button>Home</button>
      </Link>
      <Link to={"/favorites"}>
        <button>Favorites</button>
      </Link>
    </div>
  );
}
