import React, { Component } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

class calendario extends Component {
  state = {
    date: new Date(),
  }
  render() {
    return (
      <div className="rounded shadow-sm">
        <Calendar
          value={this.state.date}
        />
      </div>
    );
  }
}

export default calendario
