import React from 'react';
import {generatePlotPoints} from './scripts/plotPionts';
// import Header from './Header.jsx';

// import Portfolio from './Portfolio.jsx';
// import Skills from './Skills.jsx';
// import Footer from './Footer.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  getPoints() {
    let points = generatePlotPoints(20, 7, 300)
    console.log(points)
  }

  render() {
    this.getPoints();
    return (
      <div>
       {'Hello World'}
      </div>
    );
  }
}

module.exports = App;