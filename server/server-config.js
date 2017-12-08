const express = require('express');
const app = express();
const path = require('path');
import pointController from './controllers/pointController';

app.use(express.static('dist'));

app.get('/api/plotpoints', pointController.generatePoints);

module.exports = app;
