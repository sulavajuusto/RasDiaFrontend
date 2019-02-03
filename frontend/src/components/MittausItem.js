import React, { Component } from "react";
import PropTypes from "prop-types";
import dateFns from "date-fns";
import fi from "date-fns/locale/fi";

export class MittausItem extends Component {
  getStyle = () => {
    return {
      background: this.props.mittaus.mittaus1 > 5 ? "#FF4500" : "#f4f4f4",
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: "none"
    };
  };

  render() {
    const { mittausId, date, mittaus1, comment } = this.props.mittaus;
    return (
      <div style={this.getStyle()}>
        <div>
          <span style={spanStyle}>
            {dateFns.format(date, "Do MMMM YY", { locale: fi })}
          </span>
          <span style={spanStyle}>{mittaus1}</span>
          <span style={spanStyle}>{comment}</span>
          <button
            onClick={this.props.delMittaus.bind(this, mittausId)}
            style={btnStyle}
          >
            x
          </button>
        </div>
      </div>
    );
  }
}

// Proptypes
MittausItem.propTypes = {
  mittaus: PropTypes.object.isRequired,
  delMittaus: PropTypes.func.isRequired
};

const btnStyle = {
  background: "#ff0000",
  color: "#fff",
  border: "none",
  padding: "5px 9px",
  borderRadius: "50%",
  cursor: "pointer",
  float: "right"
};

const spanStyle = {
  flex: "10",
  padding: "0px 50px"
};
export default MittausItem;
