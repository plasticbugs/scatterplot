import React, { Component } from 'react';
import { DateRange } from 'react-date-range';
import PropTypes from 'prop-types';

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

DatePicker.propTypes = {
	onChange: PropTypes.func,
	minDate: PropTypes.object,
	maxDate: PropTypes.object
}