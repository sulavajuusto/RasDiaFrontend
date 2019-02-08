import React, { Component } from "react";
import AddMittaus from "./AddMittaus";
import Calendar from "./calendar";
import PaivanMittaukset from "./PaivanMittaukset";

import axios from "axios";
import dateFns from "date-fns";

class Rasdia extends Component {
  state = {
    mittaukset: [],
    selectedDate: new Date(),
    isLoaded: false,
    toggleMittaus: false,
    cUserId: localStorage.getItem("currentUserid")
  };

  componentDidMount() {
    axios
      .get(
        `https://rasdiaweb.azurewebsites.net/api/MittausApi/u/${
          this.state.cUserId
        }`
      )
      .then(res => {
        console.log("data from api");
        const mittaukset = res.data;
        this.setState({ mittaukset });
      });
    this.setState({ isLoaded: true });
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

  // onClick päivämäärä:

  onDateClick = day => {
    console.log(day);
    this.setState({
      selectedDate: day
    });
  };

  onToggleMittaus = () => {
    this.setState({
      toggleMittaus: !this.state.toggleMittaus
    });
  };

  render() {
    return (
      <div>
        <React.Fragment>
          <div className="App">
            {!this.state.isLoaded ? (
              <div className="Lataus"> {"Ladataan tietoja..."}</div>
            ) : null}
            {this.state.mittaukset.find(x =>
              dateFns.isSameDay(x.date, this.state.selectedDate)
            ) ? (
              <div className="mittaukset">
                <PaivanMittaukset
                  mittaukset={this.state.mittaukset}
                  selectedDate={this.state.selectedDate}
                  delMittaus={this.delMittaus}
                />
              </div>
            ) : null}
            <main>
              {this.state.toggleMittaus ? (
                <AddMittaus
                  addMittaus={this.addMittaus}
                  onToggleMittaus={this.onToggleMittaus}
                  selectedDate={this.state.selectedDate}
                />
              ) : (
                <div className="toggleAdd" onClick={this.onToggleMittaus}>
                  <span className="icon">add_circle</span>
                  {" Lisää mittaus"}
                </div>
              )}{" "}
              <Calendar
                mittaukset={this.state.mittaukset}
                onDateClick={this.onDateClick}
                selectedDate={this.state.selectedDate}
              />
            </main>
          </div>
        </React.Fragment>
      </div>
    );
  }
}

export default Rasdia;
