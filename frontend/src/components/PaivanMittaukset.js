import React, { Component } from "react";
import MittausItem from "./MittausItem";
import PropTypes from "prop-types";
import dateFns from "date-fns";

class PaivanMittaukset extends Component {
  render() {
    return this.props.mittaukset
      .filter(mittaus =>
        dateFns.isSameDay(mittaus.date, this.props.selectedDate)
      )
      .map(mittaus => (
        <MittausItem
          key={mittaus.mittausId}
          mittaus={mittaus}
          delMittaus={this.props.delMittaus}
        />
      ));
  }
}
// Proptypes
PaivanMittaukset.propTypes = {
  mittaukset: PropTypes.array.isRequired,
  delMittaus: PropTypes.func.isRequired
};

export default PaivanMittaukset;
