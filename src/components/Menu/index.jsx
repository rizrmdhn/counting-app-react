import React from "react";
import { Link } from "react-router-dom";
import "./styles/styles.css";

function Menu(props) {
  return (
    <div className="menu-container">
      <div className="menu">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/acara">
              Data
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Menu;
