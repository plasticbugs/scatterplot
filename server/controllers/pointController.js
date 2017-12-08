import generatePoints from '../models/Point.js';

module.exports.generatePoints = (req, res) => {
  let days = parseInt(req.query.days);
  let points = parseInt(req.query.points);
  let duration = parseInt(req.query.duration);
  // const point = new Point(req.query.points, req.query.days);
  generatePoints(points, days, duration, (err, results)=> {
    if(err) {
      console.log('There was a database error: ', err);
      res.status(500).send({ error: 'Something went wrong.' });
    } else {
      res.send(results);
    }
  });
}
