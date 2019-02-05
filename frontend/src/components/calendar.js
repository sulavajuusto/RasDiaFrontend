import React, { Component } from "react";
import dateFns from "date-fns";
import fi from "date-fns/locale/fi";

export class calendar extends Component {
  state = {
    currentMonth: new Date()
  };
  renderHeader() {
    const dateFormat = "MMMM GGGG";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>
            {dateFns.format(this.state.currentMonth, dateFormat, {
              locale: fi
            })}
          </span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = "dddd";
    const days = [];

    let startDate = dateFns.startOfISOWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat, {
            locale: fi
          })}
        </div>
      );
    }
    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const { currentMonth } = this.state;
    const { selectedDate } = this.props;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfISOWeek(monthStart);
    const endDate = dateFns.endOfISOWeek(monthEnd);

    const dateFormat = "D";
    const rows = [];
    const mittauspaiva = day =>
      this.props.mittaukset.find(x => dateFns.isSameDay(x.date, day));

    let days = [];
    let day = startDate;
    let formattedDate = "";
    // Tässä populoidaan päivät kalenteriin ja yhdistetään ne Api-datan funktiolla "mittauspäivä", jos mittaus tulos on yli 7.5 se muuttuu punaiseksi
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : dateFns.isSameDay(day, selectedDate)
                ? "selected"
                : ""
            }`}
            key={day}
            onClick={() => this.props.onDateClick(dateFns.parse(cloneDay))}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
            <span
              className={`mittaus ${
                mittauspaiva(day) === undefined
                  ? ""
                  : mittauspaiva(day).mittaus1 >= 7.5
                  ? "mittaus2"
                  : ""
              }`}
            >
              {mittauspaiva(day) !== undefined
                ? mittauspaiva(day).mittaus1
                : ""}
            </span>
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  // onDateClick = day => {
  //   console.log(day);
  //   this.setState({
  //     selectedDate: day
  //   });
  // };

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };

  render() {
    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </div>
    );
  }
}

export default calendar;
