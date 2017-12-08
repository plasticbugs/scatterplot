import React, { Component } from 'react';
import { DateRange } from 'react-date-range';

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }
	handleSelect(range){
    this.props.modifyRange(range);
	}

	render(){
		return (
			<div>
				<DateRange
          onChange={this.handleSelect}
          minDate={this.props.min}
          maxDate={this.props.max}
				/>
			</div>
		)
	}
}

module.exports = DatePicker;