import React, { Component } from "react";
import axios from "axios";
import AddMittaus from "./AddMittaus";
import Mittauksetapu from "./Mittauksetapu";

class Mittaukset extends Component {
  state = {
    mittaukset: [],
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

  render() {
    return (
      <div className="Mittauscontainer">
        <div className="Addmittaus2">
          <AddMittaus addMittaus={this.addMittaus} />
        </div>
        <div className="mittaukset2">
          <Mittauksetapu
            mittaukset={this.state.mittaukset}
            delMittaus={this.delMittaus}
          />
        </div>
      </div>
    );
  }
}

export default Mittaukset;
