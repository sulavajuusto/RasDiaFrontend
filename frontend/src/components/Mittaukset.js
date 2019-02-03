import React, { Component } from 'react';
import MittausItem from "./MittausItem";
import PropTypes from "prop-types";

class Mittaukset extends Component {

  render() {
    return this.props.mittaukset.map((mittaus) => (
      <MittausItem key={mittaus.mittausId} mittaus={mittaus}  delMittaus={this.props.delMittaus}/>

    ));
  }
}
// Proptypes
Mittaukset.propTypes = {
  mittaukset: PropTypes.array.isRequired,
  delMittaus: PropTypes.func.isRequired
}

export default Mittaukset;
