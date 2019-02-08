import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <header>
        <div id="logo">
          <span className="icon">date_range</span>
          <span>
            <b>raskaus</b>diabetes
          </span>
          <div>
            <Link style={linkStyle} to="/">
              Home
            </Link>{" "}
            |{" "}
            <Link style={linkStyle} to="/about">
              About
            </Link>{" "}
            |{" "}
            <Link style={linkStyle} to="/mittaukset">
              Mittaukset
            </Link>{" "}
            <div className="logout" onClick={this.props.uLogout}>
              logout
            </div>
          </div>
        </div>
      </header>
    );
  }
}

const linkStyle = {
  fontSize: "70%",
  textDecoration: "none"
};

export default Header;
