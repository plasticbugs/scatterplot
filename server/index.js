const app = require('./server-config');
const port = process.env.PORT || 3000;

app.listen(port);

console.log(`Serving up fresh HTML at http://localhost:${port}`);
