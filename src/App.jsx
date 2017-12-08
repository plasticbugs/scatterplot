import React from 'react';
import ScatterChart from './ScatterChart.jsx';
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app">
       < ScatterChart />
      </div>
    );
  }
}

module.exports = App;