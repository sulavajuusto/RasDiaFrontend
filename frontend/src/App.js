import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Rasdia from "./components/Rasdia";
import Login from "./components/Login";
import history from "./components/services/history";
import currentUser from "./components/services/currentUser";
import logout from "./components/services/logout";
import PrivateRoute from "./components/PrivateRoute";
import Mittaukset from "./components/Mittaukset";
import RegisterPage from "./components/RegisterPage";

import About from "./components/pages/About";

import "./App.css";

class App extends Component {
  state = {
    currentUser: null
  };

  componentDidMount() {
    currentUser.subscribe(x =>
      this.setState({
        currentUser: x
      })
    );
  }

  uLogout() {
    logout();
    history.push("/login");
  }

  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Header uLogout={this.uLogout} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={RegisterPage} />
          />
          <PrivateRoute path="/mittaukset" component={Mittaukset} />
          <PrivateRoute path="/about" component={About} />
          <PrivateRoute exact path="/" component={Rasdia} />
        </div>
      </Router>
    );
  }
}

export default App;
