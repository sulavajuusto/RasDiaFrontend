import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Mittaukset from "./components/Mittaukset";
import AddMittaus from "./components/AddMittaus";
import Calendar from "./components/calendar";
import About from "./components/pages/About";
import axios from "axios";

import "./App.css";
class App extends Component {
  state = {
    mittaukset: []
  };

  componentDidMount() {
    axios
      .get("https://rasdiaweb.azurewebsites.net/api/MittausApi")
      .then(res => {
        console.log("data from api");
        const mittaukset = res.data;
        this.setState({ mittaukset });
      });
  }

  // Delete mittaus

  delMittaus = id => {
    axios
      .delete(`https://rasdiaweb.azurewebsites.net/api/MittausApi/${id}`)
      .then(res =>
        this.setState({
          mittaukset: [
            ...this.state.mittaukset.filter(mittaus => mittaus.mittausId !== id)
          ]
        })
      );
  };

  // Add mittaus

  addMittaus = (userId, date, mittaus1, comment) => {
    console.log("toimiiko");
    axios
      .post("https://rasdiaweb.azurewebsites.net/api/MittausApi", {
        userId: userId,
        date: date,
        mittaus1: mittaus1,
        comment: comment
      })
      .then(res =>
        this.setState({ mittaukset: [...this.state.mittaukset, res.data] })
      );
  };
  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route
              exact
              path="/"
              render={props => (
                <React.Fragment>
                  <AddMittaus addMittaus={this.addMittaus} />
                  <Mittaukset
                    mittaukset={this.state.mittaukset}
                    delMittaus={this.delMittaus}
                  />
                </React.Fragment>
              )}
            />
            <Route path="/about" component={About} />
          </div>
          <Route
            path="/calendar"
            render={props => (
              <React.Fragment>
                <div className="App">
                  <header>
                    <AddMittaus addMittaus={this.addMittaus} />{" "}
                  </header>
                  <main>
                    <Calendar mittaukset={this.state.mittaukset} />
                  </main>
                </div>
              </React.Fragment>
            )}
          />
        </div>
      </Router>
    );
  }
}

export default App;
