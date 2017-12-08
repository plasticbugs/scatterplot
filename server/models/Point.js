const randDate = (days) => {
  const ONE_DAY = 86400000;
  let now = new Date();
  let randomDate = new Date(now.getTime() - (Math.random() * days * ONE_DAY));
  return randomDate.toISOString();
}

const randStatus = () => {
  let statuses = ['pass', 'error', 'fail'];
  let rand = Math.floor(Math.random() * 3);
  return statuses[rand];
}

const randDuration = (max) => {
  return Math.floor(Math.random() * max) + 1;
}

const generatePlotPoints = (num, days, maxDuration, callback) => {
  let plotPoints = [];
  for(let i = 0; i < num; i++) {
    let point = {
      start_time: randDate(days),
      status: randStatus(),
      duration: randDuration(maxDuration)
    }
    plotPoints.push(point);
  }
  if(plotPoints.length === 0) {
    callback('Error: No points generated')
  } else {
    plotPoints.sort((a,b) => {
      return new Date(a.start_time) - new Date(b.start_time);
    })
    callback(null, plotPoints);
  }
}

module.exports = generatePlotPoints;
