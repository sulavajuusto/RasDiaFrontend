import React, { Component } from "react";
import PropTypes from "prop-types";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

export class AddMittaus extends Component {
  state = {
    userId: "",
    date: "",
    mittaus1: "",
    comment: ""
  };

  onSubmit = e => {
    e.preventDefault();
    console.log(this.state.date);
    this.props.addMittaus(
      this.state.userId,
      this.state.date,
      this.state.mittaus1,
      this.state.comment
    );
    this.setState({
      userId: "",
      date: "",
      mittaus1: "",
      comment: ""
    });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  // handleChange(date1) {
  //   this.setState({
  //     date: date1
  //   });
  // }    EI TOIMI JA KAATAA SIVUSTON VALITESSA.

  _onFocus = e => (e.currentTarget.type = "date");

  _onBlur = e => {
    e.currentTarget.type = "text";
    e.currentTarget.placeholder = "Päivämäärä";
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} style={{ display: "flex" }}>
        <input
          type="text"
          name="userId"
          style={{ flex: "10", padding: "10px" }}
          placeholder="Käyttäjänimi"
          value={this.state.userId}
          onChange={this.onChange}
        />
        <input
          type="text"
          name="date"
          style={{ flex: "10", padding: "10px" }}
          placeholder="Päivämäärä"
          onFocus={this._onFocus}
          onBlur={this._onBlur}
          value={this.state.date}
          onChange={this.onChange}
        />
        {/* <DatePicker
          selected={this.state.date1}
          onChange={this.handleChange}
          onBlur={this._onBlur}
          onFocus={this._onFocus}
        /> */}
        <input
          type="text"
          name="mittaus1"
          style={{ flex: "10", padding: "10px" }}
          placeholder="mittaustulos"
          value={this.state.mittaus1}
          onChange={this.onChange}
        />
        <input
          type="text"
          name="comment"
          style={{ flex: "10", padding: "10px" }}
          placeholder="Lisäkommentti"
          value={this.state.comment}
          onChange={this.onChange}
        />
        <input
          type="submit"
          value="Submit"
          className="btn"
          style={{ flex: "1" }}
        />
      </form>
    );
  }
}

// Proptypes
AddMittaus.propTypes = {
  addMittaus: PropTypes.func.isRequired
};

export default AddMittaus;
