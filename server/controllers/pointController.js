import generatePlotPoints from '../models/Point.js';

module.exports.generatePoints = (req, res) => {
  let days = parseInt(req.query.days);
  let points = parseInt(req.query.points);
  let duration = parseInt(req.query.duration);

  generatePlotPoints(points, days, duration, (err, results)=> {
    if(err) {
      console.log('There was an error: ', err);
      res.status(500).send({ error: 'Something went wrong.' });
    } else {
      res.send(results);
    }
  });
}
