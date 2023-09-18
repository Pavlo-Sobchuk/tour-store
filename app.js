//REQUIRES
const express = require('express');
const tourRout = require('./routes/tourRoute');
const userRout = require('./routes/userRoute');
const morgan = require('morgan');

const app = express();
// MIDLEWARE
app.use(express.json());
app.use(morgan('dev'));

// --------------- ROUTING ---------------

app.use('/api/v1/tours', tourRout);
app.use('/api/v1/users', userRout);

module.exports = app;
