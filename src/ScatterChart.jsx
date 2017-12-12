import React from 'react';
import ReactDOM from 'react-dom';
import {FlexibleWidthXYPlot, XAxis, YAxis, HorizontalGridLines, MarkSeries, DiscreteColorLegend } from 'react-vis';
import moment from 'moment';
import update from 'immutability-helper';
import axios from 'axios';
import Colors from './scripts/colors';
import DatePicker from './DatePicker.jsx';

class ScatterChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plotPoints: [],
      days: 20,
      pointTotal: 20,
      maxDuration: 300,
      showDatePicker: false
    }
    this.toggleDate = this.toggleDate.bind(this);
    this.modifyRange = this.modifyRange.bind(this);
    this.renderDateToggle = this.renderDateToggle.bind(this);
    this.toggleHighlight = this.toggleHighlight.bind(this);
  }

  componentDidMount() {
    this.getPoints(this.state.pointTotal, this.state.days, this.state.maxDuration);    
  }

  formatPoint(point) {
    let point = Object.assign({}, point);
    point.x = new Date(point.start_time);
    point.y = point.duration;
    point.highlight = false;
    point.hide = false;
    switch(point.status) {
      case 'pass':
        point.originalColor = Colors.pass;
        point.color = Colors.pass;
        break;
      case 'error':
        point.originalColor = Colors.error;
        point.color = Colors.error;
        break
      case 'fail':
        point.originalColor = Colors.fail;
        point.color = Colors.fail;
        break;
      default:
        point.color = 'black'
    }
    return point;
  }

  getPoints(points, days, duration) {
    axios.get('/api/plotpoints', {
      params: {
        points,
        days,
        duration
      }
    })
    .then( results => {
      let plotPoints = results.data;
      let formattedPoints = [];
      plotPoints.forEach(point => {
        formattedPoints.push(this.formatPoint(point));
      })
      this.setState({plotPoints: formattedPoints}, ()=> {
        console.log(formattedPoints);
      });
    })
    .catch(err => {
      console.log(err);
    })
  }

  lightenColor(status) {
    switch(status) {
      case 'pass':
      return '#a5d6a7';
    case 'error':
      return '#ffe082';
    case 'fail':
      return '#ef9a9a';
    }
  }

  toggleHighlight(datapoint, index) {
    let plotPointsCopy = Object.assign([], this.state.plotPoints);

    let datapointCopy = Object.assign({}, datapoint);
    datapointCopy.highlight = !datapointCopy.highlight;
    
    if(datapointCopy.highlight === true) {
      datapointCopy.color = this.lightenColor(datapointCopy.status);
      datapointCopy.class = 'selected';
    } else {
      datapointCopy.color = datapointCopy.originalColor;
      datapointCopy.class = 'unselected';
    }

    plotPointsCopy[index] = datapointCopy;
    this.setState({plotPoints: plotPointsCopy});
  }

  renderMarkerSeries(point, index) {
    return (
      <MarkSeries
        colorType="literal"
        className={`point-${point.status} ${point.class}`}
        key={index}
        onValueClick={(datapoint, event)=>{
          this.toggleHighlight(datapoint, index);
        }}
        data={[point]} />)
  }

  renderLegend() {
    return (
      < DiscreteColorLegend 
        items={[{title:'pass', color:Colors.pass},{title:'fail',color:Colors.fail},{title:'error',color:Colors.error}]}
        orientation='horizontal'
      />
    )
  }

  toggleDate(e) {
    e.preventDefault();
    this.setState({showDatePicker: !this.state.showDatePicker})
  }

  renderDateToggle(allPoints) {
    if(allPoints.length > 0) {
      let datePicker;
      if(this.state.showDatePicker) {
        datePicker = < DatePicker 
          min={moment(allPoints[0].start_time)}
          max={moment(allPoints[this.state.pointTotal - 1].start_time)}
          modifyRange={this.modifyRange}
        />
      }
      return(
        <div className="date-picker">
          <a href="#" onClick={this.toggleDate}>Select a Date Range</a>
          {datePicker}
        </div>
      );
    } else {
      return null;
    }
  }

  modifyRange(range) {
    console.log(range);

    let modifiedRange = this.state.plotPoints.map((point)=> {
      let date = new Date(point.start_time)
      let pointCopy = Object.assign({}, point)
      if(date <= range.startDate.toDate() || date >= range.endDate.toDate()) {
        pointCopy.hide = true;
      } else {
        pointCopy.hide = false;
      }
      return pointCopy;
    })
    let totalShown = modifiedRange.filter((point)=> {
      if(!point.hide) {
        return point;
      }
    })
    if(totalShown.length > 0) {
      this.setState({plotPoints: modifiedRange});
    }
  }

  render() {
    return (
      <div className="chart-container">
        {this.renderLegend()}
        <FlexibleWidthXYPlot
          animation={true}
          size={7}
          xType="time"
          margin={{left: 100, top:80}}
          colorType="literal"
          strokeType="literal"
          height={330}>
          <HorizontalGridLines 
            style={{
            stroke: '#efefef',
            strokeDasharray: '8,8',
            strokeWidth: 2
            }}
          />
          {this.state.plotPoints.map((plotpoint, index) => {
            if(!plotpoint.hide) {
              return this.renderMarkerSeries(plotpoint, index);
            }
          })}
          <XAxis 
            tickFormat={v => `${moment(v).format('MMM Do')}`} 
            tickTotal={6}
            tickSizeInner={0}
            style={{
              ticks: {stroke: '#afafaf', strokeWidth: 1.5},
              text: {stroke: 'none', fill: '#afafaf', fontWeight: 300, fontFamily: 'Helvetica', transform: 'translateY(20px)'}
            }}
          />
          <YAxis
            hideLine
            tickTotal={3}
            tickValues={[100,200,300]}
            tickFormat={v => `${v/100} min`}
            tickSize={0}
            left={-10}
            style={{
              text: {stroke: 'none', fill: '#afafaf', fontWeight: 300, fontFamily: 'Helvetica'}        
            }}
          />
        </FlexibleWidthXYPlot>
        {this.renderDateToggle(this.state.plotPoints)}
      </div>)
  }
}

module.exports = ScatterChart;