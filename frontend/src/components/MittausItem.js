import React, { Component } from "react";
import PropTypes from "prop-types";
import dateFns from "date-fns";
import fi from "date-fns/locale/fi";

export class MittausItem extends Component {
  getStyle = () => {
    return {
      border: ` 2px ${
        this.props.mittaus.mittaus1 > 7 ? "#FF4500" : "#f4f4f4"
      } solid`,
      padding: "10px",
      margin: "10px",
      textDecoration: "none",
      background: "#fff",
      boxShadow: "0 10px 6px -6px #777"
    };
  };

  render() {
    const { mittausId, date, mittaus1, comment } = this.props.mittaus;
    return (
      <div style={this.getStyle()}>
        <div>
          <div style={mittausStyle}>
            <span className="icon mittausitemicon">date_range</span>
            {dateFns.format(date, "Do MMMM YYYY", { locale: fi })}
          </div>
          <button
            onClick={this.props.delMittaus.bind(this, mittausId)}
            className="delbutton"
          >
            x
          </button>
          <div style={mittausStyle}>
            <span className="icon mittausitemicon">access_time</span>
            {dateFns.format(date, "H:m", { locale: fi })}
          </div>

          <div style={mittausStyle}>
            <span className="icon mittausitemicon">colorize</span> {mittaus1}{" "}
            {" mmol/l"}
          </div>
          <div style={mittausStyle}>
            <span className="icon mittausitemicon">comment</span>
            {comment}
          </div>
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

const mittausStyle = {
  flex: "10",
  padding: "0px 10px",
  flexWrap: "wrap"
};
export default MittausItem;
